import { Box, Tab, TabList, Tabs } from '@sajari/react-components';
import { useFilter } from '@sajari/react-hooks';
import { isEmpty, useTheme } from '@sajari/react-sdk-utils';
import classnames from 'classnames';
import { useTranslation } from 'react-i18next';
import tw from 'twin.macro';

import { useSearchUIContext } from '../ContextProvider';
import { TabFilterProps } from './types';
import { formatLabel } from './utils';

const TabFilter = (props: Omit<TabFilterProps, 'type'>) => {
  const {
    name,
    title,
    limit = 15,
    sort = 'count',
    sortAscending = sort !== 'count',
    textTransform,
    format,
    hideCount = false,
    excludes,
    includes,
    prefixFilter,
    className,
    onChange,
    ...rest
  } = props;
  const { t } = useTranslation('filter');
  const theme = useTheme();
  const { options, setSelected, selected } = useFilter(name, { sort, sortAscending, excludes, includes, prefixFilter });
  const sliced = limit && options.length > limit ? options.slice(0, limit) : options;
  const { disableDefaultStyles = false, customClassNames, currency, language } = useSearchUIContext();

  if (isEmpty(sliced)) {
    return null;
  }

  // We want to hide filters which only contain a single option
  // But many queries only return relevant aggregate filters which have counts.
  // If a filter is selected, it can be the only aggregate with a count
  if (sliced.length === 1 && isEmpty(selected)) {
    return null;
  }

  const selectedIndex = sliced.findIndex(({ label }) => label === selected[0]);

  return (
    <Tabs
      aria-label={title}
      onChange={(index) => setSelected(index !== 0 ? [sliced[index - 1].label] : [])}
      index={selectedIndex < 0 ? 0 : selectedIndex + 1}
      disableDefaultStyles={disableDefaultStyles}
      className={classnames(customClassNames.filter?.tabs?.container, className)}
      {...rest}
    >
      <TabList className={customClassNames.filter?.tabs?.list}>
        <Tab
          className={customClassNames.filter?.tabs?.tab}
          selectedClassName={customClassNames.filter?.tabs?.selectedTab}
        >
          {formatLabel(t('all'), { textTransform, t })}
        </Tab>
        {sliced.map(({ label, count, value }, index) => (
          <Tab
            key={value}
            className={customClassNames.filter?.tabs?.tab}
            selectedClassName={customClassNames.filter?.tabs?.selectedTab}
          >
            {`${formatLabel(label, { format, currency, textTransform, t })}`}
            {!hideCount && (
              <Box
                as="span"
                css={[
                  tw`py-0.5 px-1 rounded ml-3 text-xs leading-tight transition-colors`,
                  index === selectedIndex
                    ? { backgroundColor: theme.color.primary.active, color: theme.color.primary.text }
                    : tw`text-gray-500 bg-gray-100`,
                ]}
              >
                {count.toLocaleString(language)}
              </Box>
            )}
          </Tab>
        ))}
      </TabList>
    </Tabs>
  );
};

export default TabFilter;
export type { TabFilterProps };
