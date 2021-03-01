import { useId } from '@react-aria/utils';
import { Option, Select } from '@sajari/react-components';
import { useSorting } from '@sajari/react-hooks';
import { isArray } from '@sajari/react-sdk-utils';
import * as React from 'react';
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
      className={customClassNames.sorting?.container}
      labelClassName={customClassNames.sorting?.label}
      renderAsLabel
      {...rest}
    >
      <Select
        id={id}
        value={sorting}
        onChange={(value) => setSorting(isArray(value) ? value[0] : value)}
        size={size}
        disableDefaultStyles={disableDefaultStyles}
        className={customClassNames.sorting?.select}
      >
        {options.map((s) => (
          <Option key={s.value} value={s.value}>
            {s.name}
          </Option>
        ))}
      </Select>
    </ViewOption>
  );
};

export default Sorting;
export type { SortingProps };
