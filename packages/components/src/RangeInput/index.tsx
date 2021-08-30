import { AriaTextFieldOptions, useTextField } from '@react-aria/textfield';
import {
  __DEV__,
  clamp,
  closest,
  formatNumber,
  getDecimalPlaces,
  getStylesObject,
  isArray,
  isNullOrUndefined,
  isString,
  noop,
  roundToStep,
} from '@sajari/react-sdk-utils';
import * as React from 'react';
import { useRanger } from 'react-ranger';

import Box from '../Box';
import Text from '../Text';
import Fill from './components/Fill';
import Handle from './components/Handle';
import Input from './components/Input';
import Track from './components/Track';
import useRangeInputStyles from './styles';
import { RangeInputProps, RangeInputValue, RangeValue } from './types';

function RangeInput<T extends RangeValue>(props: RangeInputProps<T>) {
  const {
    language,
    format = 'default',
    currency = 'USD',
    fixedPoint = false,
    onChange = noop,
    onInput = noop,
    min = 0,
    max = 100,
    value: valueProp = [min, max],
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

  const leftRef = React.useRef<HTMLInputElement>(null);
  const rightRef = React.useRef<HTMLInputElement>(null);
  const trackRef = React.useRef<HTMLDivElement>(null);

  // Format a value to be presented in the UI as a label
  const formatLabel = (input: number) => {
    if (format === 'price') {
      const formatted = formatNumber(input, { style: 'currency', currency });
      return fixedPoint ? formatted : formatted.replace('.00', '');
    }

    return fixedPoint ? Number(input).toFixed(getDecimalPlaces(step)) : input.toLocaleString(language);
  };

  // Format a value for the input
  const formatInputValue = (input: string) => {
    return fixedPoint ? Number(input).toFixed(getDecimalPlaces(step)) : input;
  };

  // Map RangeValue to the closest step and clamp values
  const mapRange = (value: RangeValue): RangeValue => {
    return isArray(value)
      ? (value.map((v) => roundToStep(clamp(Number(v), min, max), step)) as RangeValue)
      : roundToStep(clamp(Number(value), min, max), step);
  };

  // Map RangeValue to RangeInputValue
  const mapRangeInput = (value: RangeValue): RangeInputValue => {
    return (isArray(value) ? value : [value]).map(String).map(formatInputValue) as RangeInputValue;
  };

  const { ticks: ticksProp = !tick ? [min, max] : undefined } = props;
  const [inputValues, setInputValues] = React.useState<RangeInputValue>(mapRangeInput(valueProp));
  const [range, setRange] = React.useState<RangeValue>(mapRange(valueProp));
  const values = React.useMemo(() => mapRange(range), [range]);
  const [low, high] = isArray(values) ? values : [values];

  // Map and set a range
  const mapSetRange = (newValue: RangeValue, fireOnChange = false) => {
    const newRange = mapRange(newValue);

    setRange(newRange);

    onInput(newRange as T);

    if (fireOnChange) {
      onChange(newRange as T);
    }
  };

  // Set internal values when prop changes
  React.useEffect(() => setRange(mapRange(valueProp)), [valueProp]);

  // Set input values when the range changes
  React.useEffect(() => setInputValues(mapRangeInput(range)), [range]);

  const { getTrackProps, handles, ticks, segments } = useRanger({
    stepSize: step,
    steps,
    min,
    max,
    values: isArray(values) ? values : [values],
    tickSize: tick,
    ticks: ticksProp,
    onDrag: (val: number[]) => mapSetRange(val.length === 1 ? val[0] : (val as RangeValue)),
    onChange: (val: number[]) => mapSetRange(val.length === 1 ? val[0] : (val as RangeValue), true),
  });

  const handleRangeInputChange = (left: boolean, v: string | number) => {
    const val = isString(v) ? Number(v) : v;
    let newValue: Array<number>;

    if (isNullOrUndefined(high)) {
      newValue = [val < min ? min : val];
    } else if (left) {
      newValue = [val < min ? min : val, high];
    } else {
      newValue = [low, val > max ? max : val];
    }

    mapSetRange(newValue as RangeValue, true);
  };

  const handleSwitchRange = () => {
    if (isNullOrUndefined(high)) {
      return;
    }

    if (low > high) {
      mapSetRange([high, low], true);
    }
  };

  const handleSegmentClick = (event: React.MouseEvent<HTMLDivElement>, i: number) => {
    if (trackRef?.current === null) {
      return;
    }

    // Calculate percentage
    const clientRect = trackRef.current.getBoundingClientRect();
    const percent = clamp((100 / clientRect.width) * (event.clientX - clientRect.left), 0, 100);
    const newValue = roundToStep((max - min) * (percent / 100) + min, step);

    if (i === 1 && !isNullOrUndefined(high)) {
      // Determine closest handle if clicking in center section
      const [index] = closest(newValue, [low, high]);
      handleRangeInputChange(index === 0, newValue);
    } else {
      handleRangeInputChange(i === 0, newValue);
    }
  };

  const handleInputChange = (left: boolean) => (value: string) => {
    const [l, r] = inputValues;

    if (left && !isNullOrUndefined(r)) {
      setInputValues([value, r]);
    } else if (!isNullOrUndefined(r)) {
      setInputValues([l, value]);
    } else {
      setInputValues([value]);
    }
  };

  const handleInputKeyDown = (left: boolean) => (event: React.KeyboardEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;

    if (event.key === 'Enter') {
      handleRangeInputChange(left, target.value);
    }
  };

  const inputProps = {
    min,
    max,
    step,
    type: 'number',
    inputMode: 'numeric' as AriaTextFieldOptions['inputMode'],
    disableDefaultStyles,
    onBlur: handleSwitchRange,
  };

  const leftInputProps = {
    ...inputProps,
    className: inputClassName,
    value: inputValues[0],
    onChange: handleInputChange(true),
    onKeyDown: handleInputKeyDown(true),
    label: 'Range input left bound',
  };

  const rightInputProps = {
    ...inputProps,
    className: inputClassName,
    value: inputValues[1],
    onChange: handleInputChange(false),
    onKeyDown: handleInputKeyDown(false),
    label: 'Range input right bound',
  };

  const leftInput = leftInputFunc ? (
    leftInputFunc({
      getProps: (override = {}) => ({
        ...useTextField({ ...leftInputProps, ...override }, leftRef),
        ref: leftRef,
      }),
    })
  ) : (
    <Input {...leftInputProps} />
  );

  let rightInput: React.ReactNode | null = <Input {...rightInputProps} />;

  if (isNullOrUndefined(high)) {
    rightInput = null;
  } else if (rightInputFunc) {
    rightInput = rightInputFunc({
      getProps: (override = {}) => ({
        ...useTextField({ ...rightInputProps, ...override }, rightRef),
        ref: rightRef,
      }),
    });
  }

  const styles = getStylesObject(
    useRangeInputStyles({ isSingleHandle: isNullOrUndefined(high) }),
    disableDefaultStyles,
  );

  return (
    <Box css={[styles.container, stylesProp]} {...rest}>
      <Box css={styles.wrapper}>
        <Box css={styles.ticks}>
          {ticks.map(({ value: tickValue, getTickProps }, index) => {
            // Remove width from the styles to prevent needing !important in our styles
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            const { style, ...tickProps } = getTickProps({
              styles: min === max ? { left: index === 0 ? '0%' : '100%' } : {},
            });
            const { width, ...tickStyles } = style as React.CSSProperties;

            return (
              <Text
                {...tickProps}
                style={{ ...tickStyles }}
                css={styles.tickItem}
                disableDefaultStyles={disableDefaultStyles}
              >
                {formatLabel(tickValue)}
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
              isSingleHandle={isNullOrUndefined(high)}
              disableDefaultStyles={disableDefaultStyles}
              className={fillClassName}
              {...getSegmentProps({
                index: i,
                onClick: (e: React.MouseEvent<HTMLDivElement>) => handleSegmentClick(e, i),
                styles: i === 1 && min === max ? { width: '100%' } : {},
              })}
            />
          ))}

          {handles.map(({ value: handleValue, active, getHandleProps }, index) => {
            return (
              <Handle
                data-value={formatLabel(handleValue)}
                activeClassName={handleActiveClassName}
                className={handleClassName}
                disableDefaultStyles={disableDefaultStyles}
                {...getHandleProps({ active, styles: min === max ? { left: index === 0 ? '0%' : '100%' } : {} })}
              />
            );
          })}
        </Track>
      </Box>

      {showInputs && (
        <Box css={styles.input}>
          {leftInput}
          {rightInput}
        </Box>
      )}
    </Box>
  );
}

if (__DEV__) {
  RangeInput.displayName = 'RangeInput';
}

export default RangeInput;
export type { RangeInputProps };
