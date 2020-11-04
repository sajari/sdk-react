/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { AriaTextFieldOptions, useTextField } from '@react-aria/textfield';
import { Range } from '@sajari/react-hooks';
import React from 'react';
import { useRanger } from 'react-ranger';
import tw from 'twin.macro';

import { defaultParams } from './defaults';
import { __DEV__ } from '../utils/assertion';
import { Input } from './input';
import { Handle, Segment, Track, ValueTip } from './styled';
import { RangeInputProps } from './types';

const RangeInput = React.forwardRef(
  (
    {
      filter,
      onChange = defaultParams.onChange,
      value = defaultParams.value,
      min: minProps = defaultParams.min,
      max: maxProps = defaultParams.max,
      leftInput: leftInputFunc,
      rightInput: rightInputFunc,
    }: RangeInputProps,
    ref?: React.Ref<HTMLDivElement>,
  ) => {
    const isSingleHandle = value.length === 1;
    const [min, max] = filter?.limit() ?? [minProps, maxProps];
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
        isSingleHandle
          ? [Number.isNaN(newValue) ? min : newValue]
          : left
          ? [Number.isNaN(newValue) ? min : newValue, r[1] as number]
          : [r[0], Number.isNaN(newValue) ? max : newValue],
      );
    };

    const handleSwitchRange = () => {
      if (isSingleHandle) return;
      const [from, to] = range as Range;
      if (from > to) {
        setRange([to, from]);
      }
    };

    React.useEffect(() => {
      if (filter) {
        filter.set(range[0], range[1] as number);
      } else {
        onChange(range);
      }
    }, [range]);

    const inputProps = {
      min,
      max,
      type: 'number',
      inputMode: 'numeric' as AriaTextFieldOptions['inputMode'],
      onBlur: handleSwitchRange,
      css: tw`w-10`,
    };

    const leftInputProps = {
      ...inputProps,
      value: range[0].toString(),
      onChange: handleRangeInputChange(true),
      label: 'Range input left bound',
    };

    const rightInputProps = {
      ...inputProps,
      value: (isSingleHandle ? 0 : (range[1] as number)).toString(),
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

    const rightInput = isSingleHandle ? null : rightInputFunc ? (
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
            <Segment isSingleHandle={isSingleHandle} index={i} {...getSegmentProps()} />
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
        <div
          css={css(
            tw`flex flex-col items-center sm:flex-row`,
            isSingleHandle ? tw`justify-center` : tw`justify-between`,
          )}
        >
          {leftInput}
          {isSingleHandle ? null : (
            <React.Fragment>
              &ndash;
              {rightInput}
            </React.Fragment>
          )}
        </div>
      </div>
    );
  },
);

if (__DEV__) {
  RangeInput.displayName = 'RangeInput';
}

export default RangeInput;
export type { RangeInputProps };
