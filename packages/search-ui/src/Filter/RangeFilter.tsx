import { RangeInput } from '@sajari/react-components';
import { useRangeFilter } from '@sajari/react-hooks';
import * as React from 'react';

import { useSearchUIContext } from '../ContextProvider';
import Box from './Box';
import { RangeFilterProps } from './types';
import { getHeaderId } from './utils';

const RangeFilter = (props: Omit<RangeFilterProps, 'type' | 'step'>) => {
  const { name, title, format, showInputs, steps, tick, ticks } = props;
  const { min, max, range, setRange, reset, showReset, step } = useRangeFilter(name);
  const { disableDefaultStyles = false, customClassNames, currency, language } = useSearchUIContext();

  if (max === 0 && min === max) {
    return null;
  }

  return (
    <Box title={title} name={name} showReset={showReset} onReset={reset}>
      <RangeInput
        language={language}
        format={format}
        currency={currency}
        min={min}
        max={max}
        value={range === null ? [min, max] : range}
        step={step}
        steps={steps}
        tick={tick}
        ticks={ticks}
        showInputs={showInputs}
        onChange={setRange}
        disableDefaultStyles={disableDefaultStyles}
        className={customClassNames.filter?.range?.container}
        fillClassName={customClassNames.filter?.range?.fill}
        handleClassName={customClassNames.filter?.range?.handle}
        handleActiveClassName={customClassNames.filter?.range?.handleActive}
        inputClassName={customClassNames.filter?.range?.input}
        trackClassName={customClassNames.filter?.range?.track}
        aria-labelledby={getHeaderId(name)}
      />
    </Box>
  );
};

export default RangeFilter;
export type { RangeFilterProps };
