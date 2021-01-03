import { AriaTextFieldOptions, useTextField } from '@react-aria/textfield';
import { __DEV__, clamp, closest, formatNumber, getStylesObject, noop, round } from '@sajari/react-sdk-utils';
import * as React from 'react';
import { useRanger } from 'react-ranger';

import Box from '../Box';
import Text from '../Text';
import Fill from './components/Fill';
import Handle from './components/Handle';
import Input from './components/Input';
import Track from './components/Track';
import useRangeInputStyles from './styles';
import { RangeInputProps } from './types';

const RangeInput = React.forwardRef((props: RangeInputProps, ref?: React.Ref<HTMLDivElement>) => {
  const {
    language,
    format = 'default',
    currency = 'USD',
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const setValue = (newValue: any, fireOnChange = false) => {
    setRange(newValue);
    onInput(newValue);

    if (!fireOnChange) {
      return;
    }

    onChange(newValue);
  };

  React.useEffect(() => {
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

  // Format a value to be presented in the UI
  const formatValue = (input: number) => {
    if (format === 'price') {
      return formatNumber(input, { style: 'currency', currency }).replace('.00', '');
    }

    return input.toLocaleString(language);
  };

  const handleSwitchRange = () => {
    if (isSingleHandle) {
      return;
    }

    if (low > high) {
      setValue([high, low]);
    }
  };

  const handleSegmentClick = (event: React.MouseEvent<HTMLDivElement>, i: number) => {
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

  let rightInput: React.ReactNode | null = <Input {...rightInputProps} />;

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
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            const { style, ...tickProps } = getTickProps();
            const { width, ...tickStyles } = style as React.CSSProperties;

            return (
              <Text
                {...tickProps}
                style={{ ...tickStyles }}
                css={styles.tickItem}
                disableDefaultStyles={disableDefaultStyles}
              >
                {formatValue(tickValue)}
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
              isSingleHandle={isSingleHandle}
              disableDefaultStyles={disableDefaultStyles}
              className={fillClassName}
              {...getSegmentProps({
                index: i,
                onClick: (e: React.MouseEvent<HTMLDivElement>) => handleSegmentClick(e, i),
              })}
            />
          ))}

          {handles.map(({ value: handleValue, active, getHandleProps }) => (
            <Handle
              data-value={formatValue(handleValue)}
              activeClassName={handleActiveClassName}
              className={handleClassName}
              disableDefaultStyles={disableDefaultStyles}
              {...getHandleProps({ active })}
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
