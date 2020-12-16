/** @jsx jsx */
import { jsx } from '@emotion/core';
import { useId } from '@react-aria/utils';
import { Select } from '@sajari/react-components';
import { useSorting } from '@sajari/react-hooks';
import { useTranslation } from 'react-i18next';

import { useSearchUIContext } from '../ContextProvider';
import ViewOption from '../ViewOption';
import { SortingProps, SortOption } from './types';

const defaultOptions: SortOption[] = [{ name: 'Most relevant', value: '' }];

const Sorting = (props: SortingProps) => {
  const { t } = useTranslation('sorting');
  const { label = t('label'), options = defaultOptions, size, styles: stylesProp, ...rest } = props;
  const { disableDefaultStyles = false, customClassNames } = useSearchUIContext();
  const { sorting, setSorting } = useSorting();
  const id = `sorting-${useId()}`;

  return (
    <ViewOption
      id={id}
      label={label}
      size={size}
      containerClassName={customClassNames.sorting?.container}
      labelClassName={customClassNames.sorting?.label}
      renderAsLabel
      {...rest}
    >
      <Select
        id={id}
        value={sorting}
        onChange={(e) => setSorting(e.target.value)}
        size={size}
        disableDefaultStyles={disableDefaultStyles}
        className={customClassNames.sorting?.select}
      >
        {options.map((s) => (
          <option key={s.value} value={s.value}>
            {s.name}
          </option>
        ))}
      </Select>
    </ViewOption>
  );
};

export default Sorting;
export type { SortingProps };
