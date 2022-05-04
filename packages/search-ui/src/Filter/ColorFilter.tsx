import { Swatch } from '@sajari/react-components';
import { useFilter } from '@sajari/react-hooks';
import { isEmpty } from '@sajari/react-sdk-utils';
import React, { useMemo } from 'react';

import { useSearchUIContext } from '../ContextProvider';
import Box from './Box';
import { ColorFilterProps } from './types';
import { capitalize } from './utils';

const { colorKeys } = Swatch;

const ColorFilter = ({ name, title, ...rest }: Omit<ColorFilterProps, 'type'>) => {
  const { options, selected, setSelected, reset, showReset } = useFilter(name);
  const { customClassNames, disableDefaultStyles = false } = useSearchUIContext();
  const optionKeys = useMemo(() => options.map((o) => o.label), [JSON.stringify(options)]);
  const filtered = useMemo(() => optionKeys.filter((c) => colorKeys.some((o) => c.toLowerCase() === o.toLowerCase())), [
    JSON.stringify(optionKeys),
  ]);

  const children = useMemo(
    () =>
      filtered.map((color) => {
        // We capitalize to get the pre-defined color component
        const Component = Swatch.Color[capitalize(color)];
        // `id` prop should override the default so that cases like `red` will be included in search request as-is and not `Red`
        return <Component key={color} id={color} />;
      }),
    [JSON.stringify(filtered)],
  );

  if ((isEmpty(filtered) && isEmpty(selected)) || filtered.length === 1) {
    return null;
  }

  return (
    <Box title={title} showReset={showReset} onReset={reset} {...rest}>
      <Swatch
        checkedColors={selected}
        onChange={setSelected}
        className={customClassNames.filter?.color?.container}
        colorClassName={customClassNames.filter?.color?.item}
        colorCheckedClassName={customClassNames.filter?.color?.itemChecked}
        disableDefaultStyles={disableDefaultStyles}
      >
        {children}
      </Swatch>
    </Box>
  );
};

export default ColorFilter;
export type { ColorFilterProps };
