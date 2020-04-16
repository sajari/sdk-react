import React, { useEffect, useState } from "react";
import { RangeAggregrateFilter } from "../../controllers/rangeAggregrateFilter";
import { RangeFilter } from "../../controllers/rangeFilter";
import { RangerSliderCustomProps, RangeSliderUI } from "./RangeSliderUI";

export interface RangeSliderStaticProps extends RangerSliderCustomProps {
  filter: RangeFilter;
}

export const RangeSliderStatic = ({
  filter,
  step = 1,
  ...props
}: RangeSliderStaticProps) => {
  const value = filter.getRange();
  const [range, setRange] = useState<number[]>(value);
  const [min, max] = filter.limit();

  useEffect(() => {
    filter.set(range[0], range[1]);
  }, [range]);

  return (
    <RangeSliderUI
      value={range}
      onChange={setRange}
      min={min}
      max={max}
      step={step}
      {...props}
    />
  );
};

export interface RangeAggregrateSliderProps extends RangerSliderCustomProps {
  filter: RangeAggregrateFilter;
  step?: number;
}

export const RangeAggregrateSlider = ({
  filter,
  step = 1,
  ...props
}: RangeAggregrateSliderProps) => {
  const value = filter.getRange();
  const [range, setRange] = useState<number[]>(value);
  const [[min, max], setLimit] = useState(filter.limit());

  useEffect(() => {
    const callback = (bounce: [number, number]) => setLimit(bounce);
    filter.addLimitChangeListener(callback);

    return () => {
      filter.removeLimitChangeListener(callback);
    };
  }, []);

  useEffect(() => {
    filter.set(range[0], range[1]);
  }, [range]);

  return (
    <RangeSliderUI
      value={range}
      onChange={setRange}
      min={min}
      max={max}
      step={step}
      {...props}
    />
  );
};

export interface RangeSliderProps extends RangerSliderCustomProps {
  filter: RangeFilter | RangeAggregrateFilter;
}

export const RangeSlider = ({ filter, ...props }: RangeSliderProps) => {
  if (filter instanceof RangeAggregrateFilter) {
    return <RangeAggregrateSlider filter={filter} {...props} />;
  } else {
    return <RangeSliderStatic filter={filter} {...props} />;
  }
};
