import { Range, RangeProps } from "rc-slider";
import { styled } from "../styles";
import { RangeCustomStyleObject } from "./RangeSliderUI";

const BaseStyledRange = styled(Range)`
  &.rc-slider {
    position: relative;
    padding: 5px 0;
    height: 4px;
    width: 100%;
    touch-action: none;
    box-sizing: border-box;
  }
  &.rc-slider * {
    box-sizing: border-box;
  }
  .rc-slider-rail {
    position: absolute;
    width: 100%;
    background-color: #e9e9e9;
    height: 4px;
    border-radius: 6px;
  }
  .rc-slider-track {
    position: absolute;
    left: 0;
    height: 4px;
    border-radius: 6px;
    background-color: #abe2fb;
  }
  .rc-slider-handle-dragging.rc-slider-handle-dragging.rc-slider-handle-dragging {
    border-color: #ddd;
    box-shadow: 0 0 0 5px #ddd;
  }
  .rc-slider-handle:focus {
    outline: none;
  }
  .rc-slider-handle-click-focused:focus {
    border-color: #ddd;
    box-shadow: unset;
  }
  .rc-slider-handle:hover {
    border-color: #ddd;
  }
  .rc-slider-handle:active {
    border-color: #ddd;
    box-shadow: 0 0 5px #ddd;
    cursor: grabbing;
  }
  .rc-slider-handle {
    position: absolute;
    width: 14px;
    height: 14px;
    margin-top: -5px;
    cursor: grab;
    border-radius: 50%;
    border: solid 2px #ddd;
    background-color: #fff;
    touch-action: pan-x;
    border: none;
    background-color: transparent;

    &:after {
      box-shadow: 0 16px 42px 0 rgba(0, 0, 0, 0.16);
      display: block;
      content: "";
      width: 16px;
      height: 16px;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      border-radius: 999px;
      background-color: #232323;
    }
  }

  .rc-slider-track {
    background-color: #232323;
  }

  &:hover {
    opacity: 1;
  }
`;

export const StyledRange = styled(BaseStyledRange)<
  RangeProps & {
    styles?: RangeCustomStyleObject;
  }
>(props => ({
    '&.rc-slider':props.styles?.container,
    '.rc-slider-handle': props.styles?.handle,
    '.rc-slider-rail': props.styles?.rail,
    '.rc-slider-track': props.styles?.track,
  })
);

export const ValueTip = styled.div`
  margin-top: -32px;
  font-size: 16px;
  line-height: 1.69em;
  text-align: center;
  position: relative;
  height: 24px;
  span {
    background: #fff;
    display: block;
    white-space: nowrap;
    width: max-content;
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
  }
`;
