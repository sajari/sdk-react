import { RangeInput } from '@sajari/react-components';
import { useRangeFilter } from '@sajari/react-hooks';
import React from 'react';

import { useSearchUIContext } from '../ContextProvider';
import Box from './Box';
import { ColorFilterProps } from './types';

const RangeFilter = ({ name, title }: Omit<ColorFilterProps, 'type'>) => {
  const { min, max, range, setRange, reset, showReset } = useRangeFilter(name);
  const { disableDefaultStyles = false, customClassNames } = useSearchUIContext();

  if (!range || max === 0) {
    return null;
  }

  return (
    <Box title={title} showReset={showReset} onReset={reset}>
      <RangeInput
        min={min}
        max={max}
        value={range}
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
export type { ColorFilterProps };
