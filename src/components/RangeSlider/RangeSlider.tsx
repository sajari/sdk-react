import React, { useEffect, useState } from "react";
import { RangeAggregrateFilter } from "../../controllers/rangeAggregrateFilter";
import { RangeFilter } from "../../controllers/rangeFilter";
import { RangeSliderUI } from "./RangeSliderUI";

export interface RangeSliderStaticProps {
  filter: RangeFilter;
}

export const RangeSliderStatic = ({ filter }: RangeSliderStaticProps) => {
  const value = filter.getRange();
  const [range, setRange] = useState<number[]>(value);
  const [min, max] = filter.limit();

  useEffect(() => {
    filter.set(range[0], range[1]);
  }, [range]);

  return (
    <RangeSliderUI value={range} onChange={setRange} min={min} max={max} />
  );
};

export interface RangeAggregrateSliderProps {
  filter: RangeAggregrateFilter;
}

export const RangeAggregrateSlider = ({
  filter
}: RangeAggregrateSliderProps) => {
  const value = filter.getRange();
  const [range, setRange] = useState<number[]>(value);
  const [[min, max], setLimit] = useState(filter.limit());

  useEffect(() => {
    filter.addLimitChangeListener(bounce => {
      setLimit(bounce);
    });
  }, []);

  useEffect(() => {
    filter.set(range[0], range[1]);
  }, [range]);

  return (
    <RangeSliderUI value={range} onChange={setRange} min={min} max={max} />
  );
};

export interface RangeSliderProps {
  filter: RangeFilter | RangeAggregrateFilter;
}

export const RangeSlider = ({ filter }: RangeSliderProps) => {
  if (filter instanceof RangeAggregrateFilter) {
    return <RangeAggregrateSlider filter={filter} />;
  } else {
    return <RangeSliderStatic filter={filter} />;
  }
};
