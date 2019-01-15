import React, { Component } from "react";
import { css } from "emotion";

interface RangeSliderProps {
  min: number;
  max: number;
  step: number;
  value: [number, number];
  distance: number;
  onChange?: (value: [number, number]) => void;
  colors: {
    in: string;
    out: string;
  };
}

interface RangeSliderState {
  value: [number, number];
}

export class RangeSlider extends Component<RangeSliderProps, RangeSliderState> {
  state: RangeSliderState = {
    value: [this.props.value[0], this.props.value[1]]
  };

  ref = React.createRef<HTMLDivElement>();
  range = this.props.max - this.props.min;

  getKeyboardStep = () => {
    let step = Math.floor(this.props.max / 100);
    return step < this.props.step ? this.props.step : step;
  };

  triggerMouseMin = () => {
    document.addEventListener("mousemove", this.mouseMoveMin);
    document.addEventListener("mouseup", this.clearDocumentEvents);
  };

  triggerMouseMax = () => {
    document.addEventListener("mousemove", this.mouseMoveMax);
    document.addEventListener("mouseup", this.clearDocumentEvents);
  };

  triggerTouchMin = () => {
    document.addEventListener("touchmove", this.touchMoveMin);
    document.addEventListener("touchend", this.clearDocumentEvents);
    document.addEventListener("touchcancel", this.clearDocumentEvents);
  };

  triggerTouchMax = () => {
    document.addEventListener("touchmove", this.touchMoveMax);
    document.addEventListener("touchend", this.clearDocumentEvents);
    document.addEventListener("touchcancel", this.clearDocumentEvents);
  };

  getCordsProperties = () => {
    // @ts-ignore
    const { x, width } = this.ref.current.getBoundingClientRect();
    return { minX: x, maxX: x + width, width };
  };

  touchMoveMax = (e: TouchEvent) => {
    const { clientX } = e.changedTouches[0];
    this.dragMax(clientX);
  };

  mouseMoveMax = (e: MouseEvent) => {
    const { clientX } = e;
    this.dragMax(clientX);
  };

  touchMoveMin = (e: TouchEvent) => {
    const { clientX } = e.changedTouches[0];
    this.dragMin(clientX);
  };

  mouseMoveMin = (e: MouseEvent) => {
    const { clientX } = e;
    this.dragMin(clientX);
  };

  dragMin = (clientX: number) => {
    const { minX, width } = this.getCordsProperties();
    const percent = clientX < minX ? 0 : (clientX - minX) / width;
    let min = percent * this.range;

    this.setState(prevState => {
      const [prevStateMin, prevStateMax] = prevState.value;
      if (clientX <= minX) {
        return { value: [this.props.min, prevStateMax] };
      }

      const delta = (min - prevStateMin + this.props.min) / this.props.step;
      let addition = 0;
      if (Math.abs(delta) >= 1) {
        addition = Math.floor(delta / this.props.step) * this.props.step;
      }
      min = prevStateMin + addition;
      if (min + this.props.distance > prevStateMax) {
        min = prevStateMax - this.props.distance;
      }
      return { value: [min, prevStateMax] };
    }, this.callback);
  };

  dragMax = (clientX: number) => {
    const { maxX, minX, width } = this.getCordsProperties();
    const percent = clientX > maxX ? 1 : (clientX - minX) / width;
    let max = percent * this.range;

    this.setState((prevState: RangeSliderState) => {
      const [prevStateMin, prevStateMax] = prevState.value;

      if (clientX >= maxX) {
        return { value: [prevStateMin, this.props.max] };
      }
      const delta = (max - prevStateMax + this.props.min) / this.props.step;
      let addition = 0;
      if (Math.abs(delta) >= 1) {
        addition = Math.ceil(delta / this.props.step) * this.props.step;
      }
      max = prevStateMax + addition;
      if (max - this.props.distance < prevStateMin) {
        max = prevStateMin + this.props.distance;
      }
      return { value: [prevStateMin, max] };
    }, this.callback);
  };

  handleMinKeydown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    const { key } = e;
    if (key === "Enter" || key === " ") {
      e.preventDefault();
      return;
    }
    const { distance, min } = this.props;

    if (key === "ArrowRight") {
      this.setState((prevState: RangeSliderState) => {
        const [prevStateMin, prevStateMax] = prevState.value;
        const nextStateMin =
          prevStateMin + distance >= prevStateMax
            ? prevStateMax - distance
            : prevStateMin + this.getKeyboardStep();
        return { value: [nextStateMin, prevStateMax] };
      }, this.callback);
    } else if (key === "ArrowLeft") {
      this.setState((prevState: RangeSliderState) => {
        const [prevStateMin, prevStateMax] = prevState.value;
        const nextStateMin =
          prevStateMin <= min ? min : prevStateMin - this.getKeyboardStep();
        return { value: [nextStateMin, prevStateMax] };
      }, this.callback);
    }
  };

  handleMaxKeydown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    const { key } = e;
    if (key === "Enter" || key === " ") {
      e.preventDefault();
      return;
    }
    const { distance, max } = this.props;

    if (key === "ArrowRight") {
      this.setState((prevState: RangeSliderState) => {
        const [prevStateMin, prevStateMax] = prevState.value;
        const nextStateMax =
          prevStateMax >= max ? max : prevStateMax + this.getKeyboardStep();
        return { value: [prevStateMin, nextStateMax] };
      }, this.callback);
    } else if (key === "ArrowLeft") {
      this.setState((prevState: RangeSliderState) => {
        const [prevStateMin, prevStateMax] = prevState.value;
        const nextStateMax =
          prevStateMax - distance <= prevStateMin
            ? prevStateMin + distance
            : prevStateMax - this.getKeyboardStep();
        return { value: [prevStateMin, nextStateMax] };
      }, this.callback);
    }
  };

  handleBarClick = (e: React.MouseEvent<HTMLDivElement>) => {
    let point = e.clientX;
    const { minX, maxX, width } = this.getCordsProperties();
    if (point < minX) {
      point = minX;
    } else if (point > maxX) {
      point = maxX;
    }
    const range =
      Math.round(((point - minX) * this.range) / width) + this.props.min;

    this.setState((prevState: RangeSliderState) => {
      const [prevStateMin, prevStateMax] = prevState.value;
      const { distance } = this.props;
      if (range <= prevStateMin) {
        return { value: [range, prevStateMax] };
      } else if (range >= prevStateMax) {
        return { value: [prevStateMin, range] };
      }
      if (Math.abs(range - prevStateMin) >= Math.abs(range - prevStateMax)) {
        const nextMaxState =
          range - prevStateMin < distance ? prevStateMin + distance : range;
        return { value: [prevStateMin, nextMaxState] };
      } else {
        const nextMinState =
          prevStateMax - range < distance ? prevStateMax - distance : range;
        return { value: [nextMinState, prevStateMax] };
      }
    }, this.callback);
  };

  callback = () => {
    if (typeof this.props.onChange === "function") {
      const { value } = this.state;
      this.props.onChange(value);
    }
  };

  clearDocumentEvents = () => {
    document.removeEventListener("mouseup", this.clearDocumentEvents);
    document.removeEventListener("mousemove", this.mouseMoveMin);
    document.removeEventListener("mousemove", this.mouseMoveMax);
    document.removeEventListener("touchmove", this.touchMoveMin);
    document.removeEventListener("touchmove", this.touchMoveMax);
    document.removeEventListener("touchend", this.clearDocumentEvents);
    document.removeEventListener("touchcancel", this.clearDocumentEvents);
  };

  componentWillReceiveProps(nextProps: RangeSliderProps) {
    const { value, min, max } = nextProps;
    if (value !== this.props.value) {
      this.setState({ value });
    }

    if (min !== this.props.min || max !== this.props.max) {
      this.range = max - min;
    }
  }

  componentWillUnmount() {
    this.clearDocumentEvents();
  }

  render() {
    const [minState, maxState] = this.state.value;
    const { min, max, colors } = this.props;
    const right = 100 - ((maxState - min) * 100) / this.range;
    const left = ((minState - min) * 100) / this.range;

    return (
      <div
        className={css({ width: "100%", position: "relative" })}
        ref={this.ref}
      >
        <div
          className={css({
            width: "100%",
            height: "4px",
            borderRadius: "999px",
            backgroundColor: colors.out
          })}
          onClick={this.handleBarClick}
        />
        <div
          className={css({
            position: "absolute",
            top: "0px",
            height: "4px",
            borderRadius: "999px",
            backgroundColor: colors.in
          })}
          onClick={this.handleBarClick}
          style={{
            left: left + "%",
            right: right + "%"
          }}
        >
          <Button
            className={css({
              position: "absolute",
              top: "-13px",
              left: "-10px",
              width: "28px",
              height: "28px",
              borderRadius: "9999px",
              backgroundColor: "#ffffff",
              boxShadow: "rgb(235, 235, 235) 0px 2px 2px",
              border: "1px solid #d9d9d9"
            })}
            onClick={e => e.preventDefault()}
            role="slider"
            tabIndex={0}
            aria-valuenow={minState}
            aria-valuemax={max}
            aria-valuemin={min}
            aria-disabled="false"
            onMouseDown={this.triggerMouseMin}
            onKeyDown={this.handleMinKeydown}
            onTouchStart={this.triggerTouchMin}
          />
          <Button
            className={css({
              position: "absolute",
              top: "-13px",
              right: "-10px",
              width: "28px",
              height: "28px",
              borderRadius: "9999px",
              backgroundColor: "#ffffff",
              boxShadow: "rgb(235, 235, 235) 0px 2px 2px",
              border: "1px solid #d9d9d9"
            })}
            onClick={e => e.preventDefault()}
            role="slider"
            tabIndex={0}
            aria-valuenow={maxState}
            aria-valuemax={max}
            aria-valuemin={min}
            aria-disabled="false"
            onKeyDown={this.handleMaxKeydown}
            onMouseDown={this.triggerMouseMax}
            onTouchStart={this.triggerTouchMax}
          />
        </div>
      </div>
    );
  }
}

const Button = (props: React.HTMLAttributes<HTMLButtonElement>) => (
  <button {...props}>
    {[1, 2, 3].map(index => (
      <span
        key={index}
        className={css({
          height: "9px",
          width: "1px",
          backgroundColor: "rgb(216, 216, 216)",
          marginLeft: "1px",
          marginRight: "1px",
          display: "inline-block"
        })}
      />
    ))}
  </button>
);
