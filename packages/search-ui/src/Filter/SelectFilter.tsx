import { Option, Select } from '@sajari/react-components';
import { useFilter } from '@sajari/react-hooks';
import { isArray, isEmpty } from '@sajari/react-sdk-utils';
import * as React from 'react';
import { useTranslation } from 'react-i18next';

import { useSearchUIContext } from '../ContextProvider';
import Box from './Box';
import { SelectFilterProps } from './types';
import { formatLabel } from './utils';

const SelectFilter = (props: Omit<SelectFilterProps, 'type'>) => {
  const {
    name,
    title,
    sort = 'count',
    sortAscending = sort !== 'count',
    format,
    textTransform = 'normal-case',
    hideCount = false,
    excludes,
    includes,
    prefixFilter,
  } = props;
  const { options, reset, setSelected, selected, multi, showReset } = useFilter(name, {
    sort,
    sortAscending,
    excludes,
    includes,
    prefixFilter,
  });
  const { disableDefaultStyles = false, customClassNames, currency } = useSearchUIContext();
  const { t } = useTranslation('filter');

  if (isEmpty(options) && isEmpty(selected)) {
    return null;
  }

  const getSelectText = (labels: Array<string | number>) => {
    if (!labels.length) {
      return t('select');
    }

    if (labels.length === 1) {
      const [first] = labels;
      return first;
    }

    return t('selected', { count: labels.length.toLocaleString() as never });
  };

  return (
    <Box title={title} name={name} showReset={showReset} onReset={reset}>
      {!isEmpty(options) && (
        <Select
          multiple={multi}
          onChange={(value) => setSelected(isArray(value) ? value : [value])}
          value={selected}
          disableDefaultStyles={disableDefaultStyles}
          size="sm"
          text={getSelectText}
          className={customClassNames.filter?.select?.container}
          buttonClassName={customClassNames.filter?.select?.button}
          dropdownClassName={customClassNames.filter?.select?.dropdown}
          optionClassName={customClassNames.filter?.select?.option}
        >
          {options.map(({ value, label, count }) => (
            <Option value={label} key={value} label={hideCount ? undefined : count.toLocaleString()}>
              {formatLabel(label, { format, currency, textTransform, t })}
            </Option>
          ))}
        </Select>
      )}
    </Box>
  );
};

export default SelectFilter;
export type { SelectFilterProps };
