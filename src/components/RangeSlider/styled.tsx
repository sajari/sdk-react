import { Range, RangeProps } from "rc-slider";
import { styled } from "../styles";
import { RangeCustomStyleObject } from "./RangeSliderUI";

const BaseStyledRange = styled(Range)`
  &.rc-slider {
    position: relative;
    padding: 5px 0;
    height: 4px;
    width: 100%;
    margin:40px 0 14px 0;
    touch-action: none;
    box-sizing: border-box;
  }
  &.rc-slider * {
    box-sizing: border-box;
  }
  .rc-slider-rail {
    position: absolute;
    width: 100%;
    background-color: #DADFE7;
    height: 4px;
    border-radius: 6px;
  }
  .rc-slider-track {
    position: absolute;
    left: 0;
    height: 4px;
    border-radius: 6px;
  }
  .rc-slider-handle-click-focused:focus {
    border-color: #D9DBFD;
    box-shadow: unset;
  }
  .rc-slider-handle:hover {
    border-color: #D9DBFD;
  }

  .rc-slider-handle {
    position: absolute;
    width: 14px;
    height: 14px;
    margin-top: -5px;
    cursor: grab;
    border-radius: 50%;
    background-color: #fff;
    touch-action: pan-x;
    border: none;
    background-color: transparent;

    &:before,
    &:after{
      content: "";
      display: block;
      width:100%;
      height:100%;
      position: absolute;
      left: 50%;
      transform: translate(-50%, -50%);
      top: 50%;
      border-radius: 999px;
      box-sizing:content-box;
    }


    &:after {
      box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.16);
      border:1px solid #DADFE7;
      background-color: #ffffff;
    }

    &:before{
      opacity:0;
      border:5px solid ${props => props.theme.colors?.brand || '#6772F9'};
    }
  }

  .rc-slider-handle:focus{
    outline:none;
  }

  .rc-slider-handle:focus,
  .rc-slider-handle:active,
  .rc-slider-handle-dragging.rc-slider-handle-dragging.rc-slider-handle-dragging {
    cursor: grabbing;
    &:before{
      opacity:0.2;
    }
    &:after{
     border-color: ${props => props.theme.colors?.brand || '#6772F9'};
    }
  }

  .rc-slider-track {
    background-color: ${props => props.theme.colors?.brand || '#6772F9'};
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
