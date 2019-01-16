import React, { Component } from "react";
import { Histogram } from "./Histogram";
import { RangeSlider } from "./RangeSlider";
import { css } from "emotion";

interface HistogramSliderProps {
  /** Array of numbers used to render graph */
  data: number[];
  /** Default value [start, end] */
  value: [number, number];
  min: number;
  max: number;
  step: number;
  /** Minimum range between `start` and `end` */
  distance: number;
  widthPx?: number;
  heightPx?: number;
  /** `in` color for the selected part */
  colors?: {
    in: string;
    out: string;
  };
  /** Custom component for render UI to reflect [start, end], pass `null` if you don't want to show the part */
  InfoRenderComponent?:
    | null
    | ((
        props: { value: [number, number]; min: number; max: number }
      ) => JSX.Element);
  /** Showing an `apply` & `reset` button if a function was passed to the prop*/
  onApply?: (value: [number, number]) => void;
  /** Callback function while the range changed */
  onChange?: (value: [number, number]) => void;
  /** The delay time for `onChange` get called from the last */
  debounceDelay?: number;
}

interface HistogramSliderState {
  value: [number, number];
  prevPropValue: [number, number];
}

const DefaultInfoRenderComponent = ({ value }: { value: [number, number] }) => (
  <div
    className={css({
      marginBottom: "10px",
      fontSize: "16px",
      color: "#666666"
    })}
  >
    ${value[0]} AUD - ${value[1]} AUD
  </div>
);

export class HistogramSlider extends Component<
  HistogramSliderProps,
  HistogramSliderState
> {
  static defaultProps = {
    widthPx: 300,
    heightPx: 70,
    colors: {
      in: "#D7D8D8",
      out: "#EEEEEE"
    },
    InfoRenderComponent: DefaultInfoRenderComponent
  };

  constructor(props: HistogramSliderProps) {
    super(props);

    if (this.props.min >= this.props.max) {
      console.error(
        `The prop "min" should not be greater than the props "max".`
      );
    }

    if (this.props.value[0] >= this.props.value[1]) {
      console.error(
        `The [0] of the prop "value" should not be greater than the [1].`
      );
    }

    this.state = {
      value: [this.props.value[0], this.props.value[1]],
      prevPropValue: [this.props.value[0], this.props.value[1]]
    };
  }

  timeout: number | undefined;

  static getDerivedStateFromProps(
    nextProps: HistogramSliderProps,
    prevState: HistogramSliderState
  ) {
    if (
      nextProps.value[0] !== prevState.prevPropValue[0] ||
      nextProps.value[1] !== prevState.prevPropValue[1]
    ) {
      return {
        value: [nextProps.value[0], nextProps.value[1]],
        prevPropValue: [nextProps.value[0], nextProps.value[1]]
      };
    }

    return null;
  }

  reset = (e: React.MouseEvent) => {
    e.preventDefault();
    this.setState({ value: [this.props.min, this.props.max] }, () => {
      if (typeof this.props.onApply === "function") {
        this.props.onApply(this.state.value);
      } else if (typeof this.props.onChange === "function") {
        this.props.onChange(this.state.value);
      }
    });
  };

  isDisabled = () => {
    return (
      this.state.value[0] === this.props.min &&
      this.state.value[1] === this.props.max
    );
  };

  handleSliderChange = (value: [number, number]) => {
    this.setState({ value }, () => {
      if (typeof this.props.onChange === "function") {
        if (this.timeout) {
          window.clearTimeout(this.timeout);
        }
        this.timeout = window.setTimeout(() => {
          //@ts-ignore: has been checked outsite
          this.props.onChange(value);
        }, this.props.debounceDelay || 500);
      }
    });
  };

  handleApply = (e: React.MouseEvent) => {
    e.preventDefault();
    if (typeof this.props.onApply === "function") {
      this.props.onApply(this.state.value);
    }
  };

  render() {
    const isDisabled = this.isDisabled();
    const {
      data,
      widthPx,
      InfoRenderComponent,
      ...rangeSliderProps
    } = this.props;

    return (
      <div
        className={css({
          maxWidth: `${widthPx}px`,
          width: "100%",
          padding: "10px",
          boxSizing: "content-box"
        })}
      >
        <Histogram
          colors={this.props.colors!}
          data={this.props.data}
          value={this.state.value}
          min={this.props.min}
          max={this.props.max}
          widthPx={this.props.widthPx!}
          heightPx={this.props.heightPx!}
        />
        <RangeSlider
          {...rangeSliderProps}
          colors={this.props.colors!}
          value={this.state.value}
          onChange={this.handleSliderChange}
        />

        <div className={css({ marginTop: "20px" })}>
          {InfoRenderComponent && (
            <InfoRenderComponent
              value={this.state.value}
              min={this.props.min}
              max={this.props.max}
            />
          )}

          {typeof this.props.onApply === "function" && (
            <div
              className={css({
                display: "flex",
                alignItems: "center",
                justifyContent: isDisabled ? "flex-end" : "space-between"
              })}
            >
              {!isDisabled && (
                <button onClick={this.reset} disabled={isDisabled}>
                  Reset
                </button>
              )}
              <button onClick={this.handleApply}>Apply</button>
            </div>
          )}
        </div>
      </div>
    );
  }
}
