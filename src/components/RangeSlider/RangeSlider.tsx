import React, { useEffect, useState } from "react";
import { RangeFilter } from "../../controllers/rangeFilter";
import { RangeSliderUI } from "./RangeSliderUI";

export interface RangeSliderProps {
  filter: RangeFilter;
}

export const RangeSlider = ({ filter }: RangeSliderProps) => {
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
