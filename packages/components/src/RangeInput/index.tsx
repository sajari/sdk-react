/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { AriaTextFieldOptions, useTextField } from '@react-aria/textfield';
import { __DEV__, clamp, closest, round } from '@sajari/react-sdk-utils';
import React, { MouseEvent, ReactNode } from 'react';
import { useRanger } from 'react-ranger';
import tw from 'twin.macro';

import Box from '../Box';
import Text from '../Text';
import Fill from './components/Fill';
import Handle from './components/Handle';
import Input from './components/Input';
import Track from './components/Track';
import { RangeInputProps } from './types';

const noop = () => {};

const RangeInput = React.forwardRef((props: RangeInputProps, ref?: React.Ref<HTMLDivElement>) => {
  const {
    filter,
    onChange = noop,
    onInput = noop,
    value = [25, 50],
    min: minProp = 0,
    max: maxProp = 100,
    step = 1,
    steps,
    leftInput: leftInputFunc,
    rightInput: rightInputFunc,
    showInputs = true,
    tick,
  } = props;
  const isSingleHandle = value.length === 1;
  const [min, max] = filter?.limit() ?? [minProp, maxProp];
  const { ticks: ticksProp = !tick ? [min, max] : undefined } = props;
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
  const { getTrackProps, handles, ticks, segments } = useRanger({
    stepSize: step,
    steps,
    min,
    max,
    values: range,
    tickSize: tick,
    ticks: ticksProp,
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
    const newValue = round((max - min) * (percent / 100), step);

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
    <Box ref={ref} css={tw`flex flex-col`}>
      <Box css={tw`w-full mt-8 mb-3`}>
        <Box css={tw`relative`}>
          {ticks.map(({ value: tickValue, getTickProps }) => (
            <Text
              css={[
                tw`w-10 mb-2.5 text-xs text-center text-gray-400 after:(content w-0 border-r border-gray-300 border-solid h-1.5 absolute)`,
                { bottom: '100%' },
                '&::after { left: 50%; top: 100% }',
              ]}
              {...getTickProps()}
            >
              {tickValue}
            </Text>
          ))}
        </Box>

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
      </Box>

      {showInputs && (
        <Box
          css={css(tw`flex flex-col items-center sm:flex-row`, isSingleHandle ? tw`justify-end` : tw`justify-between`)}
        >
          {leftInput}
          {isSingleHandle ? null : rightInput}
        </Box>
      )}
    </Box>
  );
});

if (__DEV__) {
  RangeInput.displayName = 'RangeInput';
}

export default RangeInput;
export type { RangeInputProps };
