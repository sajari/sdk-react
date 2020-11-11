/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { AriaTextFieldOptions, useTextField } from '@react-aria/textfield';
import React, { MouseEvent, ReactNode } from 'react';
import { useRanger } from 'react-ranger';
import tw from 'twin.macro';

import Text from '../Text';
import { __DEV__ } from '../utils/assertion';
import { clamp, closest } from '../utils/number';
import Fill from './components/Fill';
import Handle from './components/Handle';
import Input from './components/Input';
import Track from './components/Track';
import { RangeInputProps } from './types';

const noop = () => {};

const RangeInput = React.forwardRef(
  (
    {
      filter,
      onChange = noop,
      onInput = noop,
      value = [25, 50],
      min: minProp = 0,
      max: maxProp = 100,
      leftInput: leftInputFunc,
      rightInput: rightInputFunc,
      showInputs = true,
      showLabels = true,
    }: RangeInputProps,
    ref?: React.Ref<HTMLDivElement>,
  ) => {
    const isSingleHandle = value.length === 1;
    const [min, max] = filter?.limit() ?? [minProp, maxProp];
    const [range, setRange] = React.useState(filter?.getRange() ?? value);
    const mapRange = (v: number[]) => v.map(Number);
    const [low, high] = mapRange(range);
    const setValue = (newValue: any, fireOnChange = false) => {
      setRange(newValue);
      onInput(newValue);

      if (!fireOnChange) {
        return;
      }

      // Only update filter onChange to prevent hammering
      if (filter) {
        const [l, h] = mapRange(newValue);
        filter.set(l, h);
      }

      onChange(newValue);
    };
    const { getTrackProps, segments, handles } = useRanger({
      stepSize: 1,
      min,
      max,
      values: range,
      onDrag: setValue,
      onChange: (val: any) => setValue(val, true),
    });
    const leftRef = React.useRef(null);
    const rightRef = React.useRef(null);
    const trackRef = React.useRef<HTMLDivElement>(null);

    const handleRangeInputChange = (left: boolean) => (v: string | number) => {
      const updatedValue = typeof v === 'string' ? parseInt(v, 10) : v;
      const isNumeric = Number.isNaN(updatedValue);
      let newValue: number[] | null = null;

      if (isSingleHandle) {
        newValue = [isNumeric ? min : updatedValue];
      } else if (left) {
        newValue = [isNumeric ? min : updatedValue, high];
      } else {
        newValue = [low, isNumeric ? max : updatedValue];
      }

      if (!newValue) {
        return;
      }

      setValue(newValue, true);
    };

    const handleSwitchRange = () => {
      if (isSingleHandle) {
        return;
      }

      if (low > high) {
        setValue([high, low]);
      }
    };

    const handleSegmentClick = (event: MouseEvent<HTMLDivElement>, i: number) => {
      if (trackRef?.current === null) {
        return;
      }

      // Calculate percentage
      const clientRect = trackRef.current.getBoundingClientRect();
      const percent = clamp((100 / clientRect.width) * (event.clientX - clientRect.left), 0, 100);
      const newValue = Math.round((max - min) * (percent / 100));

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
        <div css={tw`flex items-center w-full mt-8 mb-4`}>
          {showLabels && <Text css={tw`mr-2 text-xs text-gray-400`}>{min}</Text>}
          <Track {...getTrackProps({ ref: trackRef })}>
            {segments.map(({ getSegmentProps }, i: number) => (
              <Fill
                index={i}
                isSingleHandle={isSingleHandle}
                onClick={(e: MouseEvent<HTMLDivElement>) => handleSegmentClick(e, i)}
                {...getSegmentProps()}
              />
            ))}

            {handles.map(({ value: handleValue, active, getHandleProps }) => (
              <Handle active={active} data-value={handleValue} {...getHandleProps()} />
            ))}
          </Track>
          {showLabels && <Text css={tw`ml-2 text-xs text-gray-400`}>{max}</Text>}
        </div>

        {showInputs && (
          <div
            css={css(
              tw`flex flex-col items-center sm:flex-row`,
              isSingleHandle ? tw`justify-end` : tw`justify-between`,
            )}
          >
            {leftInput}
            {isSingleHandle ? null : rightInput}
          </div>
        )}
      </div>
    );
  },
);

if (__DEV__) {
  RangeInput.displayName = 'RangeInput';
}

export default RangeInput;
export type { RangeInputProps };
