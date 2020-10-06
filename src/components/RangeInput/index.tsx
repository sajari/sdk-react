/** @jsx jsx */
import { jsx } from "@emotion/core";
import { useSeparator } from "@react-aria/separator";
import { AriaTextFieldOptions, useTextField } from "@react-aria/textfield";
import React from "react";
import tw from "twin.macro";
import { Range } from "../../controllers/rangeFilter";
import { RangeSliderUI } from "../RangeSlider/RangeSliderUI";
import { Input } from "./input";
import { RangeInputProps } from "./types";

const RangeInput = React.forwardRef(
  (
    {
      filter,
      leftInput: leftInputFunc,
      rightInput: rightInputFunc,
      ...rest
    }: RangeInputProps,
    ref?: React.Ref<HTMLDivElement>
  ) => {
    const { separatorProps } = useSeparator({});
    const limit = filter.limit();
    const [min, max] = limit;
    const [range, setRange] = React.useState(filter.getRange());
    const debounce = React.useRef(-1);
    const leftRef = React.useRef(null);
    const rightRef = React.useRef(null);

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

    const leftInputProps = {
      min,
      max,
      type: "number",
      inputMode: "numeric" as AriaTextFieldOptions["inputMode"],
      value: range[0].toString(),
      onBlur: handleSwitchRange,
      onChange: handleRangeInputChange(true)
    };

    const rightInputProps = {
      min,
      max,
      type: "number",
      inputMode: "numeric" as AriaTextFieldOptions["inputMode"],
      value: range[1].toString(),
      onBlur: handleSwitchRange,
      onChange: handleRangeInputChange(false)
    };

    const leftInput = leftInputFunc ? (
      leftInputFunc({
        // Ignore because the useTextField doesn't have `min` and `max` params for input of type number
        // @ts-ignore
        getCustomInputProps: useTextField.bind(
          undefined,
          leftInputProps,
          leftRef
        )
      })
    ) : (
      <Input {...leftInputProps} label="Range input left bound" />
    );

    const rightInput = rightInputFunc ? (
      rightInputFunc({
        // @ts-ignore
        getCustomInputProps: useTextField.bind(
          undefined,
          rightInputProps,
          rightRef
        )
      })
    ) : (
      <Input {...rightInputProps} label="Range input right bound" />
    );

    return (
      <div ref={ref} css={tw`flex flex-col`}>
        <RangeSliderUI
          min={min}
          max={max}
          onChange={handleRangeChange}
          value={range}
          {...rest}
        />
        <div css={tw`flex flex-col sm:flex-row items-center justify-between`}>
          {leftInput}
          <hr
            {...separatorProps}
            css={tw`border-0 w-2 h-px bg-gray-500 rounded`}
          />
          {rightInput}
        </div>
      </div>
    );
  }
);

export default RangeInput;
