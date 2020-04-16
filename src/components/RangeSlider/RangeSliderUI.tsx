import classnames from "classnames";
import { Handle, RangeProps } from "rc-slider";
import React from "react";
import { CSSObject } from "styled-components";
import { StyledRange, ValueTip } from "./styled";

export interface RangeCustomStyleObject {
  handle?: CSSObject;
  container?: CSSObject;
  rail?: CSSObject;
  track?: CSSObject;
}

export interface RangerSliderCustomProps {
  className?: string;
  styles?: RangeCustomStyleObject;
  renderTip?: (value: number) => JSX.Element;
  allowCross?: boolean;
  pushable?: boolean | number;
  step?: number;
}

export type RangeSliderUIProps = RangeProps & RangerSliderCustomProps;

export const RangeSliderUI = ({
  renderTip,
  className,
  ...props
}: RangeSliderUIProps) => {
  // Assign type `any` for handleProps due to missing definition from lib
  const handle = (handleProps: any) => {
    const hanleModifiedProps = {
      ...handleProps,
      dragging: handleProps.dragging.toString()
    };

    return (
      <Handle {...hanleModifiedProps}>
        <ValueTip>
          {renderTip ? (
            <span>{renderTip(handleProps.value)}</span>
          ) : (
            <span>{handleProps.value}</span>
          )}
        </ValueTip>
      </Handle>
    );
  };

  return (
    <StyledRange
      {...props}
      className={classnames("sj-range-slider", className)}
      defaultValue={props.value}
      handle={handle}
    />
  );
};
