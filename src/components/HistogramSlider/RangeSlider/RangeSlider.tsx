import React, { Component, PureComponent } from "react";
import { css } from "emotion";

interface RangeSliderProps {
  min: number;
  max: number;
  step: number;
  value: [number, number];
  distance: number;
  onChange: (value: [number, number]) => void;
  ButtonRenderComponent?:
    | null
    | ((props: { focused?: boolean }) => JSX.Element);
  colors: {
    in: string;
    out: string;
  };
}

export class RangeSlider extends Component<RangeSliderProps> {
  ref = React.createRef<HTMLDivElement>();

  getRange = () => {
    return this.props.max - this.props.min;
  };

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
    const {
      onChange,
      value: [prevStateMin, prevStateMax],
      min,
      step,
      distance
    } = this.props;
    let nextStateMin = percent * this.getRange();
    let value: [number, number];

    if (clientX <= minX) {
      value = [min, prevStateMax];
    } else {
      const delta = (nextStateMin - prevStateMin + min) / step;
      let addition = 0;
      if (Math.abs(delta) >= 1) {
        addition = Math.floor(delta / step) * step;
      }
      nextStateMin = prevStateMin + addition;
      if (nextStateMin + distance > prevStateMax) {
        nextStateMin = prevStateMax - distance;
      }
      value = [nextStateMin, prevStateMax];
    }

    this.setState({ value }, () => {
      onChange(value);
    });
  };

  dragMax = (clientX: number) => {
    const { maxX, minX, width } = this.getCordsProperties();
    const percent = clientX > maxX ? 1 : (clientX - minX) / width;
    let nextStateMax = percent * this.getRange();

    const {
      onChange,
      value: [prevStateMin, prevStateMax],
      step,
      min,
      max,
      distance
    } = this.props;

    let value: [number, number];
    if (clientX >= maxX) {
      value = [prevStateMin, max];
    } else {
      const delta = (nextStateMax - prevStateMax + min) / step;
      let addition = 0;
      if (Math.abs(delta) >= 1) {
        addition = Math.ceil(delta / step) * step;
      }
      nextStateMax = prevStateMax + addition;
      if (nextStateMax - distance < prevStateMin) {
        nextStateMax = prevStateMin + distance;
      }
      value = [prevStateMin, nextStateMax];
    }

    this.setState({ value }, () => {
      onChange(value);
    });
  };

  handleMinKeydown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    const { key } = e;
    if (key === "Enter" || key === " ") {
      e.preventDefault();
      return;
    }
    const {
      distance,
      min,
      value: [prevStateMin, prevStateMax],
      onChange
    } = this.props;
    let value: [number, number];

    if (key === "ArrowRight") {
      const nextStateMin =
        prevStateMin + distance >= prevStateMax
          ? prevStateMax - distance
          : prevStateMin + this.getKeyboardStep();

      value = [nextStateMin, prevStateMax];
      this.setState({ value }, () => {
        onChange(value);
      });
    } else if (key === "ArrowLeft") {
      const nextStateMin =
        prevStateMin <= min ? min : prevStateMin - this.getKeyboardStep();

      value = [nextStateMin, prevStateMax];
      this.setState({ value }, () => {
        onChange(value);
      });
    }
  };

  handleMaxKeydown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    const { key } = e;
    if (key === "Enter" || key === " ") {
      e.preventDefault();
      return;
    }
    const {
      distance,
      max,
      value: [prevStateMin, prevStateMax],
      onChange
    } = this.props;
    let value: [number, number];

    if (key === "ArrowRight") {
      const nextStateMax =
        prevStateMax >= max ? max : prevStateMax + this.getKeyboardStep();
      value = [prevStateMin, nextStateMax];

      this.setState({ value }, () => {
        onChange(value);
      });
    } else if (key === "ArrowLeft") {
      const nextStateMax =
        prevStateMax - distance <= prevStateMin
          ? prevStateMin + distance
          : prevStateMax - this.getKeyboardStep();
      value = [prevStateMin, nextStateMax];

      this.setState({ value }, () => {
        onChange(value);
      });
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
    const {
      onChange,
      value: [prevStateMin, prevStateMax],
      min
    } = this.props;
    const range = Math.round(((point - minX) * this.getRange()) / width) + min;

    let value: [number, number];
    const { distance } = this.props;
    if (range <= prevStateMin) {
      value = [range, prevStateMax];
    } else if (range >= prevStateMax) {
      value = [prevStateMin, range];
    } else if (
      Math.abs(range - prevStateMin) >= Math.abs(range - prevStateMax)
    ) {
      const nextMaxState =
        range - prevStateMin < distance ? prevStateMin + distance : range;
      value = [prevStateMin, nextMaxState];
    } else {
      const nextMinState =
        prevStateMax - range < distance ? prevStateMax - distance : range;
      value = [nextMinState, prevStateMax];
    }

    this.setState({ value }, () => {
      onChange(value);
    });
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

  componentWillUnmount() {
    this.clearDocumentEvents();
  }

  preventDefaultClick = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
  };

  render() {
    const range = this.getRange();
    const {
      min,
      max,
      colors,
      value: [minState, maxState],
      ButtonRenderComponent
    } = this.props;
    const right = 100 - ((maxState - min) * 100) / range;
    const left = ((minState - min) * 100) / range;
    const ButtonInnerComponent =
      ButtonRenderComponent || DefaultRenderButtonComponent;

    return (
      <div
        className={css({
          width: "100%",
          position: "relative",
          marginTop: "-1px"
        })}
        ref={this.ref}
      >
        <div
          className={css({
            width: "100%",
            height: "5px",
            borderRadius: "999px",
            backgroundColor: colors.out
          })}
          onClick={this.handleBarClick}
        />
        <div
          className={css({
            position: "absolute",
            top: "0px",
            height: "5px",
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
              top: "0",
              left: "0",
              border: "none",
              backgroundColor: "transparent",
              transform: "translate(-50%, -50%)",
              padding: "0"
            })}
            onClick={this.preventDefaultClick}
            role="slider"
            tabIndex={0}
            aria-valuenow={minState}
            aria-valuemax={max}
            aria-valuemin={min}
            aria-disabled={false}
            onMouseDown={this.triggerMouseMin}
            onKeyDown={this.handleMinKeydown}
            onTouchStart={this.triggerTouchMin}
            ButtonRenderComponent={ButtonInnerComponent}
          />
          <Button
            className={css({
              position: "absolute",
              top: "50%",
              right: "0",
              transform: "translate(50%, -50%)",
              border: "none",
              backgroundColor: "transparent",
              padding: "0"
            })}
            onClick={this.preventDefaultClick}
            role="slider"
            tabIndex={0}
            aria-valuenow={maxState}
            aria-valuemax={max}
            aria-valuemin={min}
            aria-disabled={false}
            onKeyDown={this.handleMaxKeydown}
            onMouseDown={this.triggerMouseMax}
            onTouchStart={this.triggerTouchMax}
            ButtonRenderComponent={ButtonInnerComponent}
          />
        </div>
      </div>
    );
  }
}

const DefaultRenderButtonComponent = () => (
  <span
    className={css({
      width: "28px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: "28px",
      borderRadius: "9999px",
      backgroundColor: "#ffffff",
      boxShadow: "rgb(235, 235, 235) 0px 2px 2px",
      border: "1px solid #d9d9d9"
    })}
  >
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
  </span>
);

class Button extends React.PureComponent<
  {
    ButtonRenderComponent: ((props: { focused?: boolean }) => JSX.Element);
  } & React.HTMLAttributes<HTMLButtonElement>
> {
  state = {
    focused: false
  };

  handleFocus = () => {
    this.setState({ focused: true });
  };

  handleBlur = () => {
    this.setState({ focused: false });
  };

  render() {
    const { ButtonRenderComponent, ...rest } = this.props;
    return (
      <button {...rest} onFocus={this.handleFocus} onBlur={this.handleBlur}>
        <ButtonRenderComponent focused={this.state.focused} />
      </button>
    );
  }
}
