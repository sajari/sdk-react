import { Tab, TabList, Tabs } from '@sajari/react-components';
import { useFilter } from '@sajari/react-hooks';
import { isEmpty } from '@sajari/react-sdk-utils';
import * as React from 'react';
import { useTranslation } from 'react-i18next';

import { useSearchUIContext } from '../ContextProvider';
import { TabFilterProps } from './types';
import { formatLabel, sortItems } from './utils';

const TabFilter = (props: Omit<TabFilterProps, 'type'>) => {
  const { name, title, limit = 15, sort = 'count', sortAscending = sort !== 'count', format } = props;
  const { t } = useTranslation('filter');
  const { options, setSelected, selected } = useFilter(name);
  const sorted = sort !== 'none' ? sortItems(options, sort === 'count' ? 'count' : 'label', sortAscending) : options;
  const sliced = limit && options.length > limit ? sorted.slice(0, limit) : sorted;
  const { disableDefaultStyles = false, customClassNames, currency, language } = useSearchUIContext();

  if (isEmpty(sliced)) {
    return null;
  }

  const selectedIndex = sliced.findIndex(({ label }) => label === selected[0]);

  return (
    <Tabs
      aria-label={title}
      onChange={(index) => setSelected(index !== 0 ? [sliced[index - 1].label] : [])}
      index={selectedIndex < 0 ? 0 : selectedIndex + 1}
      disableDefaultStyles={disableDefaultStyles}
      className={customClassNames.filter?.tabs?.container}
    >
      <TabList className={customClassNames.filter?.tabs?.list}>
        <Tab
          className={customClassNames.filter?.tabs?.tab}
          selectedClassName={customClassNames.filter?.tabs?.selectedTab}
        >
          {t('all')}
        </Tab>
        {sliced.map(({ label, count, value }) => (
          <Tab
            key={value}
            className={customClassNames.filter?.tabs?.tab}
            selectedClassName={customClassNames.filter?.tabs?.selectedTab}
          >
            {`${formatLabel(label, { format, currency, t })} (${count.toLocaleString(language)})`}
          </Tab>
        ))}
      </TabList>
    </Tabs>
  );
};

export default TabFilter;
export type { TabFilterProps };
