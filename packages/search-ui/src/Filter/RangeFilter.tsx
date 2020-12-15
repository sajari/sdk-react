import { RangeInput } from '@sajari/react-components';
import { useRangeFilter } from '@sajari/react-hooks';
import React from 'react';

import { useSearchUIContext } from '../ContextProvider';
import Box from './Box';
import { RangeFilterProps } from './types';

const RangeFilter = ({ name, title, format, showInputs, step, steps, tick, ticks }: Omit<RangeFilterProps, 'type'>) => {
  const { min, max, range, setRange, reset, showReset } = useRangeFilter(name);
  const { disableDefaultStyles = false, customClassNames, currency, language } = useSearchUIContext();

  if (!range || max === 0) {
    return null;
  }

  return (
    <Box title={title} showReset={showReset} onReset={reset}>
      <RangeInput
        language={language}
        format={format}
        currency={currency}
        min={min}
        max={max}
        value={range}
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
      />
    </Box>
  );
};

export default RangeFilter;
export type { RangeFilterProps };
