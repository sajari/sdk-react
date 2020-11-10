import { Swatch } from '@sajari/react-components';
import { useFilter } from '@sajari/react-hooks';
import React from 'react';

import Box from './Box';
import { ColorFilterProps } from './types';

const { colorKeys } = Swatch;

const ColorFilter = ({ name, title }: Omit<ColorFilterProps, 'type'>) => {
  const { options, selected, setSelected, reset } = useFilter(name);
  const optionKeys = options.map((o) => o.label);
  const filtered = colorKeys.filter((c) => optionKeys.some((o) => o.includes(c)));

  if (filtered.length === 0) {
    return null;
  }

  return (
    <Box title={title} showReset={selected.length > 0} onReset={reset}>
      <Swatch checkedColors={selected} onChange={setSelected}>
        {filtered.map((color) => {
          const Component = Swatch.Color[color];
          return <Component key={color} />;
        })}
      </Swatch>
    </Box>
  );
};

export default ColorFilter;
export type { ColorFilterProps };
