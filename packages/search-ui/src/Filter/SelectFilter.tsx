import { Option, Select } from '@sajari/react-components';
import { useFilter } from '@sajari/react-hooks';
import { isArray, isEmpty } from '@sajari/react-sdk-utils';
import * as React from 'react';
import { useTranslation } from 'react-i18next';

import { useSearchUIContext } from '../ContextProvider';
import Box from './Box';
import { SelectFilterProps } from './types';
import { sortItems } from './utils';

const SelectFilter = (props: Omit<SelectFilterProps, 'type'>) => {
  const { name, title, sort = 'count', sortAscending = sort !== 'count' } = props;
  const { options, reset, setSelected, selected, multi } = useFilter(name);
  const { disableDefaultStyles = false, customClassNames } = useSearchUIContext();
  const { t } = useTranslation('filter');

  const sortedItems = React.useMemo(() => {
    let list = options;

    if (sort !== 'none') {
      list = sortItems(list, sort === 'count' ? 'count' : 'label', sortAscending);
    }

    return list;
  }, [JSON.stringify(options), sort, sortAscending]);

  if (isEmpty(options)) {
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
    <Box title={title} name={name} showReset={selected.length > 0 && multi} onReset={reset}>
      <Select
        multiple={multi}
        onChange={(value) => setSelected(isArray(value) ? value : [value])}
        value={selected}
        disableDefaultStyles={disableDefaultStyles}
        size="sm"
        text={getSelectText}
        containerClassName={customClassNames.filter?.select?.container}
        buttonClassName={customClassNames.filter?.select?.button}
        dropdownClassName={customClassNames.filter?.select?.dropdown}
        optionClassName={customClassNames.filter?.select?.option}
      >
        {sortedItems.map(({ value, label, count }) => (
          <Option value={label} key={value} label={count.toLocaleString()}>
            {label}
          </Option>
        ))}
      </Select>
    </Box>
  );
};

export default SelectFilter;
export type { SelectFilterProps };
