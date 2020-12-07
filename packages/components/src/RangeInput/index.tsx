/** @jsx jsx */
import { jsx } from '@emotion/core';
import { AriaTextFieldOptions, useTextField } from '@react-aria/textfield';
import { __DEV__, clamp, closest, getStylesObject, round } from '@sajari/react-sdk-utils';
import React, { MouseEvent, ReactNode, useEffect } from 'react';
import { useRanger } from 'react-ranger';

import Box from '../Box';
import Text from '../Text';
import Fill from './components/Fill';
import Handle from './components/Handle';
import Input from './components/Input';
import Track from './components/Track';
import useRangeInputStyles from './styles';
import { RangeInputProps } from './types';

const noop = () => {};

const RangeInput = React.forwardRef((props: RangeInputProps, ref?: React.Ref<HTMLDivElement>) => {
  const {
    onChange = noop,
    onInput = noop,
    value = [25, 50],
    min: minProp = 0,
    max: maxProp = 100,
    step = 1,
    steps,
    leftInput: leftInputFunc,
    rightInput: rightInputFunc,
    showInputs = false,
    tick,
    fillClassName,
    handleClassName,
    handleActiveClassName,
    trackClassName,
    inputClassName,
    styles: stylesProp,
    disableDefaultStyles = false,
    ...rest
  } = props;
  const isSingleHandle = value.length === 1;
  const [min, max] = [minProp, maxProp];
  const { ticks: ticksProp = !tick ? [min, max] : undefined } = props;
  const [range, setRange] = React.useState(value);
  const mapRange = (v: number[]) => v.map(Number);
  const [low, high] = mapRange(range);
  const setValue = (newValue: any, fireOnChange = false) => {
    setRange(newValue);
    onInput(newValue);

    if (!fireOnChange) {
      return;
    }

    onChange(newValue);
  };

  useEffect(() => {
    setRange(value);
  }, [value]);

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
    disableDefaultStyles,
    onBlur: handleSwitchRange,
  };

  const leftInputProps = {
    ...inputProps,
    className: inputClassName,
    value: low.toString(),
    onChange: handleRangeInputChange(true),
    label: 'Range input left bound',
  };

  const rightInputProps = {
    ...inputProps,
    className: inputClassName,
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

  const styles = getStylesObject(useRangeInputStyles({ isSingleHandle }), disableDefaultStyles);

  return (
    <Box ref={ref} css={[styles.container, stylesProp]} {...rest}>
      <Box css={styles.wrapper}>
        <Box css={styles.ticks}>
          {ticks.map(({ value: tickValue, getTickProps }) => {
            // Remove width from the styles to prevent needing !important in our styles
            const { style, ...tickProps } = getTickProps();
            const { width, ...tickStyles } = style;

            return (
              <Text
                {...tickProps}
                style={{ ...tickStyles }}
                css={styles.tickItem}
                disableDefaultStyles={disableDefaultStyles}
              >
                {tickValue}
              </Text>
            );
          })}
        </Box>

        <Track
          {...getTrackProps({ ref: trackRef })}
          className={trackClassName}
          disableDefaultStyles={disableDefaultStyles}
        >
          {segments.map(({ getSegmentProps }, i: number) => (
            <Fill
              index={i}
              isSingleHandle={isSingleHandle}
              onClick={(e: MouseEvent<HTMLDivElement>) => handleSegmentClick(e, i)}
              disableDefaultStyles={disableDefaultStyles}
              className={fillClassName}
              {...getSegmentProps()}
            />
          ))}

          {handles.map(({ value: handleValue, active, getHandleProps }) => (
            <Handle
              active={active}
              data-value={handleValue}
              activeClassName={handleActiveClassName}
              className={handleClassName}
              disableDefaultStyles={disableDefaultStyles}
              {...getHandleProps()}
            />
          ))}
        </Track>
      </Box>

      {showInputs && (
        <Box css={styles.input}>
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
