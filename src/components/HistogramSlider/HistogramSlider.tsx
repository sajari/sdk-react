import React, { Component } from "react";
import { Histogram } from "./Histogram";
import { RangeSlider } from "./RangeSlider";
import { css } from "emotion";

interface HistogramSliderProps {
  data: number[];
  value: [number, number];
  min: number;
  max: number;
  step: number;
  distance: number;
  debounceDelay?: number;
  colors: {
    in: string;
    out: string;
  };
  onApply?: (value: [number, number]) => void;
  onChange?: (value: [number, number]) => void;
}

interface HistogramSliderState {
  value: [number, number];
}

export class HistogramSlider extends Component<
  HistogramSliderProps,
  HistogramSliderState
> {
  state: HistogramSliderState = {
    value: [this.props.value[0], this.props.value[1]]
  };

  timeout: number | undefined;

  componentWillReceiveProps(nextProps: HistogramSliderProps) {
    const { value } = nextProps;
    if (value !== this.props.value) {
      this.setState({ value });
    }
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
          this.props.onChange(this.state.value);
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

    const isDisabled = this.isDisabled();
    const { data, ...rangeSliderProps } = this.props;

    return (
      <div
        className={css({
          maxWidth: "240px",
          minWidth: "240px",
          padding: "10px",
          boxSizing: "border-box"
        })}
      >
        <Histogram
          colors={this.props.colors}
          data={this.props.data}
          value={this.state.value}
          min={this.props.min}
          max={this.props.max}
        />
        <div className={css({ marginTop: "-5px" })}>
          <RangeSlider
            {...rangeSliderProps}
            value={this.state.value}
            onChange={this.handleSliderChange}
          />
        </div>
        <div className={css({ marginTop: "20px" })}>
          <div
            className={css({
              marginBottom: "10px",
              fontSize: "12px",
              color: "#666666"
            })}
          >
            ${this.state.value[0]} AUD - ${this.state.value[1]} AUD
          </div>

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
