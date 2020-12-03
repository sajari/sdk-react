import { Swatch } from '@sajari/react-components';
import { useFilter } from '@sajari/react-hooks';
import { isEmpty } from '@sajari/react-sdk-utils';
import React, { useMemo } from 'react';

import Box from './Box';
import { ColorFilterProps } from './types';

const { colorKeys } = Swatch;

const ColorFilter = ({ name, title }: Omit<ColorFilterProps, 'type'>) => {
  const { options, selected, setSelected, reset } = useFilter(name);
  const optionKeys = useMemo(() => options.map((o) => o.label), [JSON.stringify(options)]);
  const filtered = useMemo(() => colorKeys.filter((c) => optionKeys.some((o) => o.includes(c))), [
    JSON.stringify(optionKeys),
  ]);

  const children = useMemo(
    () =>
      filtered.map((color) => {
        const Component = Swatch.Color[color];
        return <Component key={color} />;
      }),
    [JSON.stringify(filtered)],
  );

  if (isEmpty(filtered) || filtered.length === 1) {
    return null;
  }

  return (
    <Box title={title} showReset={selected.length > 0} onReset={reset}>
      <Swatch checkedColors={selected} onChange={setSelected}>
        {children}
      </Swatch>
    </Box>
  );
};

export default ColorFilter;
export type { ColorFilterProps };
