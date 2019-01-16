import React, { Component } from "react";

interface HistogramProps {
  data: number[];
  value: [number, number];
  widthPx: number;
  heightPx: number;
  min: number;
  max: number;
  colors: {
    in: string;
    out: string;
  };
}

interface HistogramState {
  data: number[];
  prevPropData: number[];
}

let maskCount = 0;

export class Histogram extends Component<HistogramProps, HistogramState> {
  maskHighlightID: string = `sf-histogram-mask-${maskCount++}`;
  maskID: string = `sf-histogram-mask-${maskCount++}`;

  state: HistogramState = {
    prevPropData: [],
    data: []
  };

  static getDerivedStateFromProps(
    nextProps: HistogramProps,
    prevState: HistogramState
  ) {
    if (nextProps.data !== prevState.prevPropData) {
      const viewBoxWidth = nextProps.data.length;
      const viewBoxHeight =
        (nextProps.heightPx * viewBoxWidth) / nextProps.widthPx;
      const max = Math.max(...nextProps.data);
      const heightPxPerUnit = viewBoxHeight / max;

      return {
        data: nextProps.data.map(v =>
          parseFloat((heightPxPerUnit * v).toFixed(2))
        )
      };
    }

    return null;
  }

  getViewboxSize = () => {
    const viewBoxWidth = this.props.data.length;
    const viewBoxHeight =
      (this.props.heightPx * viewBoxWidth) / this.props.widthPx;
    return { viewBoxHeight, viewBoxWidth };
  };

  render() {
    const { min, max, value, colors } = this.props;
    const [vMin, vMax] = value;
    const range = max - min;
    const { viewBoxWidth, viewBoxHeight } = this.getViewboxSize();
    const start = ((vMin - min) * viewBoxWidth) / range;
    const end = start + ((vMax - vMin) * viewBoxWidth) / range;

    return (
      <React.Fragment>
        <svg
          display="block"
          width="100%"
          xmlns="http://www.w3.org/2000/svg"
          viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
        >
          <defs>
            <mask
              id={this.maskID}
              x="0"
              y="0"
              width={viewBoxWidth}
              height={viewBoxHeight}
            >
              >
              <rect
                x="0"
                y="0"
                fill="white"
                width={start}
                height={viewBoxHeight}
              />
              <rect
                x={start}
                y="0"
                fill="black"
                width={end - start}
                height={viewBoxHeight}
              />
              <rect
                x={end}
                y="0"
                fill="white"
                width={viewBoxWidth - end}
                height={viewBoxHeight}
              />
            </mask>

            <mask
              id={this.maskHighlightID}
              x="0"
              y="0"
              width={viewBoxWidth}
              height={viewBoxHeight}
            >
              >
              <rect
                x={start}
                y="0"
                fill="white"
                width={end - start}
                height={viewBoxHeight}
              />
            </mask>
          </defs>
          {this.state.data.map((height, index) => (
            <React.Fragment key={index}>
              <rect
                mask={`url(#${this.maskID})`}
                x={index}
                y={viewBoxHeight! - height}
                width="1"
                height={height}
                fill={colors.out}
              />
              <rect
                mask={`url(#${this.maskHighlightID})`}
                x={index}
                y={viewBoxHeight! - height}
                width="1"
                fill={colors.in}
                height={height}
              />
            </React.Fragment>
          ))}
        </svg>
      </React.Fragment>
    );
  }
}
