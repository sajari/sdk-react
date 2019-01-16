import React, { Component } from "react";
import * as ReactDOM from "react-dom";
import "./style.css";

export interface MapResultsViewProps {
  GoogleAPIMapKey: string;
  MarkerComponent: React.ComponentClass;
  options?: google.maps.MapOptions;
  data: {
    lat: number;
    lng: number;
    markers: {
      lat: number;
      lng: number;
      [K: string]: any;
    }[];
  };
}

let scriptTag: HTMLScriptElement | undefined;
let mapReady = false;

interface HTMLMarkerType {
  index: number;
  lat: number;
  lng: number;
  id: number;
  pos: google.maps.LatLng;
  data: { [K: string]: any };
  div: HTMLDivElement;
  render: (mapState: MapResultsViewState) => void;
  getPanes: () => google.maps.MapPanes;
  getProjection: () => google.maps.MapCanvasProjection;
}

const initMap = function(
  options: google.maps.MapOptions,
  markers: { [K: string]: any }[],
  MarkerComponent: React.ComponentClass,
  mapState: MapResultsViewState,
  node: HTMLDivElement
) {
  const map: google.maps.Map = new google.maps.Map(node, options);
  // Create Marker
  function HTMLMarker(
    this: HTMLMarkerType,
    data: { lat: number; lng: number; [K: string]: any },
    index: number
  ) {
    const { lat, lng, ...rest } = data;
    this.index = index;
    this.lat = lat;
    this.id = data.id;
    this.lng = lng;
    this.data = rest;
    this.pos = new google.maps.LatLng(this.lat, this.lng);
  }

  HTMLMarker.prototype = new google.maps.OverlayView();
  HTMLMarker.prototype.onRemove = function() {
    console.log("remove");
  };

  // init your html element here
  HTMLMarker.prototype.onAdd = function(this: HTMLMarkerType) {
    console.log("add marker fire");
    this.div = document.createElement("div");
    this.div.className = "sf-map-view-result-marker";

    this.div.style.zIndex = mapState.activeMarker === this.index ? "2" : "1";
    ReactDOM.render(
      // @ts-ignore
      <MarkerComponent
        {...this.data}
        map={mapState}
        index={this.index}
        isSelected={mapState.selectedMarkers.includes(this.index)}
        isActive={mapState.activeMarker === this.index}
        getMarkerProps={(props: React.HTMLAttributes<HTMLElement>) => ({
          onClick: callAll(() => {
            mapState.setActiveMarker(this.index);
          }, props.onClick)
        })}
      />,
      this.div
    );

    var panes = this.getPanes();
    panes.overlayImage.appendChild(this.div);
  };

  HTMLMarker.prototype.draw = function(this: HTMLMarkerType) {
    console.log("drag fire!");
    var overlayProjection = this.getProjection();
    var position = overlayProjection.fromLatLngToDivPixel(this.pos);
    // var panes = this.getPanes();
    this.div.style.left = position.x + "px";
    this.div.style.top = position.y + "px";
  };

  var bounds = new google.maps.LatLngBounds();

  //@ts-ignore
  const storedMarkers = [];
  //@ts-ignore
  markers.forEach((marker, index) => {
    //@ts-ignore
    var htmlMarker = new HTMLMarker(marker, index);
    htmlMarker.setMap(map);
    storedMarkers.push(htmlMarker);
    bounds.extend({ lat: marker.lat, lng: marker.lng });
    map.fitBounds(bounds);
  });

  //@ts-ignore
  return mapState => {
    //@ts-ignore
    storedMarkers.forEach(marker => {
      marker.render(mapState);
    });
  };
};

interface MapResultsViewState {
  activeMarker: number;
  setActiveMarker: (id: number) => void;
  selectedMarkers: number[];
}

export class MapResultsView extends Component<
  MapResultsViewProps,
  MapResultsViewState
> {
  target = React.createRef<HTMLDivElement>();
  clientX: number = 0;
  clientY: number = 0;
  scriptTag: HTMLScriptElement | undefined;

  setActiveMarker = (index: number) => {
    this.setState(
      prevState => {
        const newState = { activeMarker: index };
        if (!prevState.selectedMarkers.includes(index)) {
          // @ts-ignore
          newState.selectedMarkers = [...prevState.selectedMarkers, index];
        }
        return newState;
      },
      () => {
        this.markerClickCallback(this.state);
      }
    );
  };

  state: MapResultsViewState = {
    activeMarker: -1,
    setActiveMarker: this.setActiveMarker,
    selectedMarkers: []
  };

  markerClickCallback: (state: MapResultsViewState) => void = () => {};

  constructor(props: MapResultsViewProps) {
    super(props);
  }

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

  componentDidMount() {
    if (!this.target.current) {
      return;
    }

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
        if (!this.target.current) {
          return;
        }
        mapReady = true;
        this.markerClickCallback = initMap(
          this.getOptions(),
          this.props.data.markers,
          this.props.MarkerComponent,
          this.state,
          this.target.current
        );
      });
    } else {
      this.markerClickCallback = initMap(
        this.getOptions(),
        this.props.data.markers,
        this.props.MarkerComponent,
        this.state,
        this.target.current
      );
    }
  }

  componentWillReceiveProps(nextProps: MapResultsViewProps) {
    if (nextProps.data !== this.props.data) {
      this.setState(
        {
          activeMarker: -1,
          selectedMarkers: []
        },
        () => {
          this.markerClickCallback = this.markerClickCallback = initMap(
            this.getOptions(nextProps),
            nextProps.data.markers,
            nextProps.MarkerComponent,
            this.state,
            this.target.current as HTMLDivElement
          );
        }
      );
    }
  }

  render() {
    return (
      <div
        ref={this.target}
        style={{ height: "calc(100vh - 60px)" }}
        onMouseDown={e => {
          this.clientX = e.clientX;
          this.clientY = e.clientY;
        }}
        onMouseUp={(e: React.MouseEvent<HTMLDivElement>) => {
          if (
            //@ts-ignore
            !closestById(e.target, "sf-map-view-result-marker") &&
            (this.clientX === e.clientX && this.clientY === e.clientY)
          ) {
            this.setActiveMarker(-1);
          }
        }}
      />
    );
  }
}

//@ts-ignore
const callAll = (...fns) => (...args) => fns.forEach(fn => fn && fn(...args));

function closestById(el: HTMLElement, className: string) {
  while (el.className != className) {
    //@ts-ignore
    el = el.parentNode;
    if (!el) {
      return null;
    }
  }
  return el;
}
