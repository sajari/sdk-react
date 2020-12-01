import { Tab, TabList, Tabs } from '@sajari/react-components';
import { useFilter } from '@sajari/react-hooks';
import { isEmpty } from '@sajari/react-sdk-utils';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { TabFilterProps } from './types';
import { sortItems } from './utils';

const TabFilter = (props: Omit<TabFilterProps, 'type'>) => {
  const { name, title, limit = 15, sort = 'count', sortAscending = sort !== 'count' } = props;
  const { t } = useTranslation();
  const { options, setSelected, selected } = useFilter(name);
  const sorted = sort !== 'none' ? sortItems(options, sort === 'count' ? 'count' : 'label', sortAscending) : options;
  const sliced = limit && options.length > limit ? sorted.slice(0, limit) : sorted;

  if (isEmpty(sliced)) {
    return null;
  }

  const selectedIndex = sliced.findIndex(({ label }) => label === selected[0]);

  return (
    <Tabs
      aria-label={title}
      onChange={(index) => setSelected(index !== 0 ? [sliced[index - 1].label] : [])}
      index={selectedIndex < 0 ? 0 : selectedIndex + 1}
    >
      <TabList>
        <Tab>{t('filter.all')}</Tab>
        {sliced.map(({ label, count, value }) => (
          <Tab key={value}>{`${label} (${count.toLocaleString()})`}</Tab>
        ))}
      </TabList>
    </Tabs>
  );
};

export default TabFilter;
export type { TabFilterProps };
