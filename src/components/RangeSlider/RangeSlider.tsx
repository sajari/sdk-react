import React, { useEffect, useRef, useState } from "react";
import {
  LimitUpdateListener,
  RangeAggregrateFilter
} from "../../controllers/rangeAggregrateFilter";
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
  const debounce = useRef<number>(-1);
  const value = filter.getRange();
  const [range, setRange] = useState<number[]>(value);
  const [min, max] = filter.limit();

  useEffect(() => {
    window.clearTimeout(debounce.current);
    // @ts-ignore: keep refer to Node.Timeout
    debounce.current = setTimeout(() => {
      filter.set(range[0], range[1]);
    }, 500);
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
  const debounce = useRef<number>(-1);
  const value = filter.getRange();
  const [range, setRange] = useState<number[]>(value);
  const [[min, max], setLimit] = useState(filter.limit());

  useEffect(() => {
    const callback: LimitUpdateListener = ({ bounce, range: cbRange }) => {
      setLimit(bounce);
      setRange(cbRange);
    };
    filter.addLimitChangeListener(callback);

    return () => {
      filter.removeLimitChangeListener(callback);
    };
  }, []);

  useEffect(() => {
    window.clearTimeout(debounce.current);
    // @ts-ignore: keep refer to Node.Timeout
    debounce.current = setTimeout(() => {
      filter.set(range[0], range[1]);
    }, 500);

    return () => {
      window.clearTimeout(debounce.current);
    };
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
