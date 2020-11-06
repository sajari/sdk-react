/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { AriaTextFieldOptions, useTextField } from '@react-aria/textfield';
import { Range } from '@sajari/react-hooks';
import React, { MouseEvent, ReactNode } from 'react';
import { useRanger } from 'react-ranger';
import tw from 'twin.macro';

import { __DEV__ } from '../utils/assertion';
import { clamp, closest } from '../utils/number';
import Input from './components/Input';
import { defaultParams } from './defaults';
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
    const trackRef = React.useRef<HTMLDivElement>(null);
    const [low, high] = range.map(Number);

    React.useEffect(() => {
      if (filter) {
        filter.set(low, high);
      } else {
        onChange(range);
      }
    }, [range]);

    const handleRangeInputChange = (left: boolean) => (v: string | number) => {
      const newValue = typeof v === 'string' ? parseInt(v, 10) : v;

      setRange(() => {
        const isNumeric = Number.isNaN(newValue);

        if (isSingleHandle) {
          return [isNumeric ? min : newValue];
        }

        if (left) {
          return [isNumeric ? min : newValue, high];
        }

        return [low, isNumeric ? max : newValue];
      });
    };

    const handleSwitchRange = () => {
      if (isSingleHandle) {
        return;
      }

      if (low > high) {
        setRange([high, low]);
      }
    };

    const handleSegmentClick = (event: MouseEvent<HTMLDivElement>, i: number) => {
      if (trackRef?.current === null) {
        return;
      }

      // Calculate percentage
      const clientRect = trackRef.current.getBoundingClientRect();
      const percent = clamp((100 / clientRect.width) * (event.clientX - clientRect.left), 0, 100);
      const delta = max - min;
      const newValue = Math.round(delta * (percent / 100));

      if (i === 1 && !isSingleHandle) {
        // Determine closest handle if clicking in center section
        const [index] = closest(newValue, [low, high]);
        handleRangeInputChange(index === 0)(newValue);
      } else {
        handleRangeInputChange(i === 0)(newValue);
      }
    };

    const inputProps = {
      min,
      max,
      type: 'number',
      inputMode: 'numeric' as AriaTextFieldOptions['inputMode'],
      onBlur: handleSwitchRange,
      css: tw`w-10`,
      style: {
        width: '100px',
      },
    };

    const leftInputProps = {
      ...inputProps,
      value: low.toString(),
      onChange: handleRangeInputChange(true),
      label: 'Range input left bound',
    };

    const rightInputProps = {
      ...inputProps,
      value: (isSingleHandle ? 0 : high).toString(),
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

    let rightInput: ReactNode | null = <Input {...rightInputProps} />;

    if (isSingleHandle) {
      rightInput = null;
    }

    if (rightInputFunc) {
      rightInput = rightInputFunc({
        getProps: (override = {}) => ({
          ...useTextField({ ...rightInputProps, ...override }, rightRef),
          ref: rightRef,
        }),
      });
    }

    return (
      <div ref={ref} css={tw`flex flex-col`}>
        <Track {...getTrackProps({ ref: trackRef })}>
          {segments.map(({ getSegmentProps }, i: number) => (
            <Segment
              isSingleHandle={isSingleHandle}
              index={i}
              {...getSegmentProps()}
              onClick={(e: MouseEvent<HTMLDivElement>) => handleSegmentClick(e, i)}
            />
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
          {isSingleHandle ? null : rightInput}
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
