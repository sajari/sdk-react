import { Range, RangeProps } from "rc-slider";
import { styled } from "../styles";

export const StyledRanger = styled(Range)<RangeProps>`
  &.rc-slider {
    position: relative;
    padding: 5px 0;
    height: 4px;
    width: 100%;
    -ms-touch-action: none;
    touch-action: none;
    box-sizing: border-box;
  }
  &.rc-slider * {
    box-sizing: border-box;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
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
  .rc-slider-handle {
    position: absolute;
    width: 14px;
    height: 14px;
    cursor: pointer;
    cursor: -webkit-grab;
    margin-top: -5px;
    cursor: grab;
    border-radius: 50%;
    border: solid 2px #96dbfa;
    background-color: #fff;
    -ms-touch-action: pan-x;
    touch-action: pan-x;
  }
  .rc-slider-handle-dragging.rc-slider-handle-dragging.rc-slider-handle-dragging {
    border-color: #57c5f7;
    box-shadow: 0 0 0 5px #96dbfa;
  }
  .rc-slider-handle:focus {
    outline: none;
  }
  .rc-slider-handle-click-focused:focus {
    border-color: #96dbfa;
    box-shadow: unset;
  }
  .rc-slider-handle:hover {
    border-color: #57c5f7;
  }
  .rc-slider-handle:active {
    border-color: #57c5f7;
    box-shadow: 0 0 5px #57c5f7;
    cursor: -webkit-grabbing;
    cursor: grabbing;
  }
  .rc-slider-mark {
    position: absolute;
    top: 18px;
    left: 0;
    width: 100%;
    font-size: 12px;
  }
  .rc-slider-mark-text {
    position: absolute;
    display: inline-block;
    vertical-align: middle;
    text-align: center;
    cursor: pointer;
    color: #999;
  }
  .rc-slider-mark-text-active {
    color: #666;
  }
  .rc-slider-step {
    position: absolute;
    width: 100%;
    height: 4px;
    background: transparent;
  }
  .rc-slider-dot {
    position: absolute;
    bottom: -2px;
    margin-left: -4px;
    width: 8px;
    height: 8px;
    border: 2px solid #e9e9e9;
    background-color: #fff;
    cursor: pointer;
    border-radius: 50%;
    vertical-align: middle;
  }
  .rc-slider-dot-active {
    border-color: #96dbfa;
  }
  .rc-slider-dot-reverse {
    margin-right: -4px;
  }
  .rc-slider-disabled {
    background-color: #e9e9e9;
  }
  .rc-slider-disabled .rc-slider-track {
    background-color: #ccc;
  }
  .rc-slider-disabled .rc-slider-handle,
  .rc-slider-disabled .rc-slider-dot {
    border-color: #ccc;
    box-shadow: none;
    background-color: #fff;
    cursor: not-allowed;
  }
  .rc-slider-disabled .rc-slider-mark-text,
  .rc-slider-disabled .rc-slider-dot {
    cursor: not-allowed !important;
  }
  .rc-slider-vertical {
    width: 14px;
    height: 100%;
    padding: 0 5px;
  }
  .rc-slider-vertical .rc-slider-rail {
    height: 100%;
    width: 4px;
  }
  .rc-slider-vertical .rc-slider-track {
    left: 5px;
    bottom: 0;
    width: 4px;
  }
  .rc-slider-vertical .rc-slider-handle {
    margin-left: -5px;
    -ms-touch-action: pan-y;
    touch-action: pan-y;
  }
  .rc-slider-vertical .rc-slider-mark {
    top: 0;
    left: 18px;
    height: 100%;
  }
  .rc-slider-vertical .rc-slider-step {
    height: 100%;
    width: 4px;
  }
  .rc-slider-vertical .rc-slider-dot {
    left: 2px;
    margin-bottom: -4px;
  }
  .rc-slider-vertical .rc-slider-dot:first-child {
    margin-bottom: -4px;
  }
  .rc-slider-vertical .rc-slider-dot:last-child {
    margin-bottom: -4px;
  }

  .rc-slider-handle {
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

    &:focus {
      outline: 1px dotted #1e2124 !important;
      outline-offset: 3px;
      box-shadow: none !important;
    }
  }

  .rc-slider-track {
    background-color: #232323;
  }

  &:hover {
    opacity: 1;
  }
`;

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
