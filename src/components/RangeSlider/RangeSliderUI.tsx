import classnames from "classnames";
import { Handle, RangeProps } from "rc-slider";
import React from "react";
import { StyledRanger, ValueTip } from "./styled";

export interface RangeSliderUIProps extends RangeProps {
  renderTip?: (value: number) => JSX.Element;
  className?: string;
}

export const RangeSliderUI = ({
  renderTip,
  className,
  ...props
}: RangeSliderUIProps) => {
  const handle = (handleProps: any) => {
    const hanleModifiedProps = {
      ...handleProps,
      dragging: handleProps.dragging.toString()
    };

    return (
      <Handle {...hanleModifiedProps}>
        <ValueTip>
          {renderTip ? renderTip(handleProps.value) : handleProps.value}
        </ValueTip>
      </Handle>
    );
  };

  return (
    <StyledRanger
      {...props}
      className={classnames("sj-range-slider", className)}
      defaultValue={props.value}
      handle={handle}
    />
  );
};
