import React, { Component } from "react";
import * as ReactDOM from "react-dom";
import { css, cx } from "emotion";

interface MapResultsViewProps<Marker> {
  GoogleAPIMapKey: string;
  MarkerComponent: React.ComponentType<MarkerComponentProps<Marker>>;
  options?: google.maps.MapOptions;
  styles?: React.CSSProperties;
  data: MapProps<Marker>;
}

interface MapProps<Marker> {
  id: string;
  lat: number;
  lng: number;
  markers: MarkerRemote<Marker>[];
}

export type MarkerRemote<Marker> = Marker & {
  lat: number;
  lng: number;
};

export type MarkerComponentProps<Marker> = Marker & {
  map: MapResultsViewStateAndHelpers;
  isSelected: boolean;
  isActive: boolean;
  index: number;
  getMarkerProps: (
    props: React.HTMLAttributes<HTMLElement>
  ) => React.HTMLAttributes<HTMLElement>;
};

// HTML script tag holding Google map library
let scriptTag: HTMLScriptElement | undefined;
// Check the if library file loaded
let mapReady = false;

interface HTMLMarkerType<Marker> {
  index: number;
  lat: number;
  lng: number;
  pos: google.maps.LatLng;
  data: MarkerRemote<Marker>;
  div: HTMLDivElement;
  render: (mapState: MapResultsViewStateAndHelpers) => void;
  getPanes: () => google.maps.MapPanes;
  getProjection: () => google.maps.MapCanvasProjection;
}

const initializeMap = function<Marker>(
  options: google.maps.MapOptions,
  markers: MarkerRemote<Marker>[],
  MarkerComponent: React.ComponentType<MarkerComponentProps<Marker>>,
  mapState: MapResultsViewStateAndHelpers,
  node: HTMLDivElement
) {
  const map: google.maps.Map = new google.maps.Map(node, options);

  // Create Marker
  function HTMLMarker<Marker>(
    this: HTMLMarkerType<Marker>,
    data: MarkerRemote<Marker>,
    index: number,
    MarkerComponent: React.ComponentType<MarkerComponentProps<Marker>>
  ) {
    const { lat, lng } = data;
    this.lat = lat;
    this.lng = lng;
    this.pos = new google.maps.LatLng(this.lat, this.lng);

    this.index = index;
    this.data = data;

    this.render = function(mapState: MapResultsViewStateAndHelpers) {
      this.div.style.zIndex = mapState.activeMarker === this.index ? "2" : "1";
      ReactDOM.render(
        <MarkerComponent
          map={mapState}
          index={this.index}
          isSelected={mapState.selectedMarkers.includes(this.index)}
          isActive={mapState.activeMarker === this.index}
          getMarkerProps={(props: React.HTMLAttributes<HTMLElement>) => ({
            onClick: callAll(() => {
              mapState.setActiveMarker(this.index);
            }, props.onClick)
          })}
          {...data}
        />,
        this.div
      );
    };
  }

  HTMLMarker.prototype = new google.maps.OverlayView();

  HTMLMarker.prototype.onAdd = function(this: HTMLMarkerType<Marker>) {
    this.div = document.createElement("div");
    this.div.className = "sf-map-view-result-marker";
    this.render(mapState);
    var panes = this.getPanes();
    panes.overlayImage.appendChild(this.div);
  };

  HTMLMarker.prototype.draw = function(this: HTMLMarkerType<Marker>) {
    var overlayProjection = this.getProjection();
    var position = overlayProjection.fromLatLngToDivPixel(this.pos);
    this.div.style.left = position.x + "px";
    this.div.style.top = position.y + "px";
  };

  const storedMarkers: HTMLMarkerType<Marker>[] = [];
  const bounds = new google.maps.LatLngBounds();
  markers.forEach((marker, index) => {
    // TODO: ts-ignore should be removed
    // @ts-ignore
    var htmlMarker = new HTMLMarker<Marker>(marker, index, MarkerComponent);
    htmlMarker.setMap(map);
    storedMarkers.push(htmlMarker);
    bounds.extend({ lat: marker.lat, lng: marker.lng });
    map.fitBounds(bounds);
  });

  return (mapState: MapResultsViewStateAndHelpers) => {
    storedMarkers.forEach(marker => {
      marker.render(mapState);
    });
  };
};

interface MapResultsViewState<Marker> extends MapResultsViewStateAndHelpers {
  prevPropData: MapProps<Marker>;
}

interface MapResultsViewStateAndHelpers {
  activeMarker: number;
  setActiveMarker: (id: number) => void;
  selectedMarkers: number[];
}

export class MapResultsView<Marker> extends Component<
  MapResultsViewProps<Marker>,
  MapResultsViewState<Marker>
> {
  target = React.createRef<HTMLDivElement>();
  clientX: number = 0;
  clientY: number = 0;
  scriptTag: HTMLScriptElement | undefined;

  setActiveMarker = (index: number) => {
    this.setState(
      prevState => {
        const newState = { activeMarker: index } as MapResultsViewState<Marker>;
        if (!prevState.selectedMarkers.includes(index)) {
          newState.selectedMarkers = [...prevState.selectedMarkers, index];
        }
        return newState;
      },
      () => {
        this.markerClickCallback(this.getMapResultsViewStateAndHelpers());
      }
    );
  };

  static defaultProps = {
    styles: {
      paddingBottom: "56%"
    }
  };

  static getDerivedStateFromProps<Marker>(
    nextProps: MapResultsViewProps<Marker>,
    prevState: MapResultsViewState<Marker>
  ) {
    if (nextProps.data !== prevState.prevPropData) {
      return {
        activeMarker: -1,
        selectedMarkers: [],
        prevPropData: nextProps.data
      };
    }

    return null;
  }

  state: MapResultsViewState<Marker> = {
    activeMarker: -1,
    setActiveMarker: this.setActiveMarker,
    selectedMarkers: [],
    prevPropData: this.props.data
  };

  markerClickCallback: (
    state: MapResultsViewStateAndHelpers
  ) => void = () => {};

  getMapResultsViewStateAndHelpers = (): MapResultsViewStateAndHelpers => {
    const { activeMarker, selectedMarkers, setActiveMarker } = this.state;
    return {
      activeMarker,
      selectedMarkers,
      setActiveMarker
    };
  };

  getOptions = (props = this.props): google.maps.MapOptions => {
    const { lat, lng } = this.props.data;
    const customOptions = props.options || {};
    return {
      center: { lat, lng },
      zoom: 16,
      scrollwheel: true,
      disableDoubleClickZoom: true,
      ...customOptions
    };
  };

  init = (props: MapResultsViewProps<Marker> = this.props) => {
    if (!this.target.current || !mapReady) return;

    this.markerClickCallback = initializeMap<Marker>(
      this.getOptions(),
      props.data.markers,
      props.MarkerComponent,
      this.getMapResultsViewStateAndHelpers(),
      this.target.current
    );
  };

  componentDidMount() {
    if (!mapReady) {
      if (!scriptTag) {
        scriptTag = document.createElement("script");
        scriptTag.id = "google-map-script";
        scriptTag.async = true;
        scriptTag.defer = true;
        scriptTag.src = `https://maps.googleapis.com/maps/api/js?key=${
          this.props.GoogleAPIMapKey
        }`;
        document.body.appendChild(scriptTag);
      }
      scriptTag.addEventListener("load", () => {
        mapReady = true;
        this.init();
      });
    } else {
      this.init();
    }
  }

  componentDidUpdate(nextProps: MapResultsViewProps<Marker>) {
    if (nextProps.data !== this.props.data) {
      this.init(nextProps);
    }
  }

  // The `handleMouseDown` & `handleMouseUp` were designed to control the UX state of
  // the active marker. As when users click on the map (not the marker) then the active marker
  // should be deactivated. However, if you try to drag the map, the active marker should be remained
  handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    this.clientX = event.clientX;
    this.clientY = event.clientY;
  };
  handleMouseUp = (event: React.MouseEvent<HTMLDivElement>) => {
    // TODO: should be worked around to remove casting
    if (
      !closest(event.target as HTMLElement, "sf-map-view-result-marker") &&
      (this.clientX === event.clientX && this.clientY === event.clientY)
    ) {
      this.setActiveMarker(-1);
    }
  };

  render() {
    return (
      <div
        className={cx(
          css({ ...this.props.styles }),
          css({
            ".sf-map-view-result-marker": {
              display: "inline-block",
              borderRadius: "4px",
              transform: "translateX(-50%)",
              position: "absolute"
            }
          })
        )}
        ref={this.target}
        onMouseDown={this.handleMouseDown}
        onMouseUp={this.handleMouseUp}
      />
    );
  }
}

const callAll = (...fns: (((...args: any[]) => void) | undefined)[]) => (
  ...args: any[]
) => fns.forEach(fn => fn && fn(...args));

const closest = (el: HTMLElement, className: string) => {
  let element: HTMLElement | null = el;

  while (element && element.className != className) {
    element = element.parentNode as HTMLElement | null;
    if (!element) {
      return null;
    }
  }
  return element;
};
