/** @jsx jsx */
import { jsx } from '@emotion/core';
import { AriaTextFieldOptions, useTextField } from '@react-aria/textfield';
import React from 'react';
import { useRanger } from 'react-ranger';
import tw from 'twin.macro';

import { defaultParams } from './defaults';
import { Input } from './input';
import { Handle, Segment, Track, ValueTip } from './styled';
import { RangeInputProps } from './types';

export const RangeInput = React.forwardRef(
  (
    {
      filter,
      onChange = defaultParams.onChange,
      value = defaultParams.value,
      limit = defaultParams.limit,
      leftInput: leftInputFunc,
      rightInput: rightInputFunc,
    }: RangeInputProps,
    ref?: React.Ref<HTMLDivElement>,
  ) => {
    const limitRange = filter?.limit() ?? limit;
    const [min, max] = limitRange;
    const [range, setRange] = React.useState(filter?.getRange() ?? value);
    const { getTrackProps, segments, handles } = useRanger({
      stepSize: 1,
      min,
      max,
      values: range,
      onChange: setRange,
    });
    const leftRef = React.useRef(null);
    const rightRef = React.useRef(null);

    const handleRangeInputChange = (left: boolean) => (v: string) => {
      const newValue = parseInt(v, 10);
      setRange((r) =>
        left ? [Number.isNaN(newValue) ? min : newValue, r[1]] : [r[0], Number.isNaN(newValue) ? max : newValue],
      );
    };

    const handleSwitchRange = () => {
      const [from, to] = range;
      if (from > to) {
        setRange([to, from]);
      }
    };

    React.useEffect(() => {
      if (filter) {
        filter.set(range[0], range[1]);
      } else {
        onChange(range);
      }
    }, [range]);

    const leftInputProps = {
      min,
      max,
      type: 'number',
      inputMode: 'numeric' as AriaTextFieldOptions['inputMode'],
      value: range[0].toString(),
      onBlur: handleSwitchRange,
      onChange: handleRangeInputChange(true),
      label: 'Range input left bound',
    };

    const rightInputProps = {
      min,
      max,
      type: 'number',
      inputMode: 'numeric' as AriaTextFieldOptions['inputMode'],
      value: range[1].toString(),
      onBlur: handleSwitchRange,
      onChange: handleRangeInputChange(false),
      label: 'Range input right bound',
    };

    const leftInput = leftInputFunc ? (
      leftInputFunc({
        getProps: (override = {}) => ({ ...useTextField({ ...leftInputProps, ...override }, leftRef), ref: leftRef }),
      })
    ) : (
      <Input {...leftInputProps} />
    );

    const rightInput = rightInputFunc ? (
      rightInputFunc({
        getProps: (override = {}) => ({
          ...useTextField({ ...rightInputProps, ...override }, rightRef),
          ref: rightRef,
        }),
      })
    ) : (
      <Input {...rightInputProps} />
    );

    return (
      <div ref={ref} css={tw`flex flex-col`}>
        <Track {...getTrackProps()}>
          {segments.map(({ getSegmentProps }, i) => (
            <Segment index={i} {...getSegmentProps()} />
          ))}
          {handles.map(({ value: handleValue, active, getHandleProps }) => (
            <button
              type="button"
              {...getHandleProps({
                style: { appearance: 'none', border: 'none', background: 'transparent', outline: 'none' },
              })}
            >
              <Handle active={active}>
                <ValueTip>{handleValue}</ValueTip>
              </Handle>
            </button>
          ))}
        </Track>
        <div css={tw`flex flex-col items-center justify-between sm:flex-row`}>
          {leftInput}
          &ndash;
          {rightInput}
        </div>
      </div>
    );
  },
);

export default RangeInput;
