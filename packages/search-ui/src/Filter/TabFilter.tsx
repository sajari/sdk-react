/** @jsx jsx */
import { jsx } from '@emotion/core';
import { Tab, TabList, Tabs } from '@sajari/react-components';
import { useFilter } from '@sajari/react-hooks';
import { isEmpty } from '@sajari/react-sdk-utils';
import { useTranslation } from 'react-i18next';

import { useSearchUIContext } from '../ContextProvider';
import { TabFilterProps } from './types';
import { sortItems } from './utils';

const TabFilter = (props: Omit<TabFilterProps, 'type'>) => {
  const { name, title, limit = 15, sort = 'count', sortAscending = sort !== 'count' } = props;
  const { t } = useTranslation();
  const { options, setSelected, selected } = useFilter(name);
  const sorted = sort !== 'none' ? sortItems(options, sort === 'count' ? 'count' : 'label', sortAscending) : options;
  const sliced = limit && options.length > limit ? sorted.slice(0, limit) : sorted;
  const { disableDefaultStyles = false, customClassNames } = useSearchUIContext();

  if (isEmpty(sliced) || sliced.length === 1) {
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
          {t('filter.all')}
        </Tab>
        {sliced.map(({ label, count, value }) => (
          <Tab
            key={value}
            className={customClassNames.filter?.tabs?.tab}
            selectedClassName={customClassNames.filter?.tabs?.selectedTab}
          >
            {`${label} (${count.toLocaleString()})`}
          </Tab>
        ))}
      </TabList>
    </Tabs>
  );
};

export default TabFilter;
export type { TabFilterProps };
