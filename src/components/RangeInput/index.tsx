/** @jsx jsx */
import { jsx } from "@emotion/core";
import { useSeparator } from "@react-aria/separator";
import React from "react";
import tw from "twin.macro";
import { Range } from "../../controllers/rangeFilter";
import { RangeSliderUI } from "../RangeSlider/RangeSliderUI";
import { Input } from "./input";
import { RangeInputProps } from "./types";

const RangeInput = React.forwardRef(
  ({ filter, ...rest }: RangeInputProps, ref?: React.Ref<HTMLDivElement>) => {
    const { separatorProps } = useSeparator({});
    const limit = filter.limit();
    const [min, max] = limit;
    const [range, setRange] = React.useState(filter.getRange());
    const debounce = React.useRef(-1);

    const handleRangeChange = React.useCallback(r => setRange(r as Range), [
      setRange
    ]);
    const handleRangeInputChange = React.useCallback(
      (left: boolean) => (v: string) =>
        setRange(r =>
          left ? [parseInt(v, 10), r[1]] : [r[0], parseInt(v, 10)]
        ),
      [setRange]
    );
    const handleSwitchRange = React.useCallback(() => {
      const [from, to] = range;
      if (from > to) {
        setRange([to, from]);
      }
    }, [range, setRange]);

    React.useEffect(() => {
      window.clearTimeout(debounce.current);
      // @ts-ignore: keep refer to Node.Timeout
      debounce.current = setTimeout(() => {
        filter.set(range[0], range[1]);
      }, 500);
    }, [range]);

    return (
      <div ref={ref} css={tw`flex flex-col`}>
        <RangeSliderUI
          min={min}
          max={max}
          onChange={handleRangeChange}
          value={range}
          {...rest}
        />
        <div css={tw`flex items-center justify-between`}>
          <Input
            min={min}
            max={max}
            value={range[0].toString()}
            onChange={handleRangeInputChange(true)}
            onBlur={handleSwitchRange}
            label="Range input left bound"
          />
          <hr
            {...separatorProps}
            css={tw`border-0 w-2 h-px bg-gray-500 rounded`}
          />
          <Input
            min={min}
            max={max}
            value={range[1].toString()}
            onChange={handleRangeInputChange(false)}
            onBlur={handleSwitchRange}
            label="Range input right bound"
          />
        </div>
      </div>
    );
  }
);

export default RangeInput;
