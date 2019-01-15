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
}

let maskCount = 0;

export class Histogram extends Component<HistogramProps, HistogramState> {
  maskHighlightID: string = `sf-histogram-mask-${maskCount++}`;
  maskID: string = `sf-histogram-mask-${maskCount++}`;
  viewBoxWidth: number = this.props.data.length;
  viewBoxHeight: number =
    (this.props.heightPx * this.viewBoxWidth) / this.props.widthPx;

  constructor(props: HistogramProps) {
    super(props);

    const { data } = this.props;
    const max = Math.max(...data);
    const heightPxPerUnit = this.viewBoxHeight / max;
    const heightData = data.map(v =>
      parseFloat((heightPxPerUnit * v).toFixed(2))
    );

    this.state = {
      data: heightData
    };
  }

  componentWillReceiveProps({ data }: HistogramProps) {
    if (data !== this.props.data) {
      const max = Math.max(...data);
      this.viewBoxWidth = data.length;
      this.viewBoxHeight = parseFloat(
        (
          (this.props.heightPx * this.viewBoxWidth) /
          this.props.widthPx
        ).toFixed(2)
      );

      const heightPxPerUnit = this.viewBoxHeight / max;
      const heightData = data.map(v =>
        parseFloat((heightPxPerUnit * v).toFixed(2))
      );

      this.setState({
        data: heightData
      });
    }
  }

  render() {
    const { min, max, value, colors } = this.props;
    const [vMin, vMax] = value;
    const range = max - min;
    const start = ((vMin - min) * this.viewBoxWidth) / range;
    const end = start + ((vMax - vMin) * this.viewBoxWidth) / range;

    return (
      <React.Fragment>
        <svg
          display="block"
          width="100%"
          xmlns="http://www.w3.org/2000/svg"
          viewBox={`0 0 ${this.viewBoxWidth} ${this.viewBoxHeight}`}
        >
          <defs>
            <mask
              id={this.maskID}
              x="0"
              y="0"
              width={this.viewBoxWidth}
              height={this.viewBoxHeight}
            >
              >
              <rect
                x="0"
                y="0"
                fill="white"
                width={start}
                height={this.viewBoxHeight}
              />
              <rect
                x={start}
                y="0"
                fill="black"
                width={end - start}
                height={this.viewBoxHeight}
              />
              <rect
                x={end}
                y="0"
                fill="white"
                width={this.viewBoxWidth - end}
                height={this.viewBoxHeight}
              />
            </mask>

            <mask
              id={this.maskHighlightID}
              x="0"
              y="0"
              width={this.viewBoxWidth}
              height={this.viewBoxHeight}
            >
              >
              <rect
                x={start}
                y="0"
                fill="white"
                width={end - start}
                height={this.viewBoxHeight}
              />
            </mask>
          </defs>
          {this.state.data.map((height, index) => (
            <React.Fragment key={index}>
              <rect
                mask={`url(#${this.maskID})`}
                x={index}
                y={this.viewBoxHeight! - height}
                width="1"
                height={height}
                fill={colors.out}
              />
              <rect
                mask={`url(#${this.maskHighlightID})`}
                x={index}
                y={this.viewBoxHeight! - height}
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
