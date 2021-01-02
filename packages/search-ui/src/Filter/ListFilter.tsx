import { Box as CoreBox, Button, Checkbox, CheckboxGroup, Combobox, Radio, RadioGroup } from '@sajari/react-components';
import { useFilter, useQuery } from '@sajari/react-hooks';
import { getStylesObject, isBoolean, isEmpty, noop, useTheme } from '@sajari/react-sdk-utils';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import tw from 'twin.macro';

import { IconSmallChevronDown, IconSmallChevronUp } from '../assets/icons';
import { useSearchUIContext } from '../ContextProvider';
import Box from './Box';
import { ListFilterProps } from './types';
import { getHeaderId, pinItems, sortItems } from './utils';

const ListFilter = (props: Omit<ListFilterProps, 'type'>) => {
  const {
    name,
    title,
    limit = 8,
    searchable = false,
    sort = 'count',
    sortAscending = sort !== 'count',
    itemRender,
    placeholder = 'Search',
  } = props;
  let { pinSelected } = props;
  const [query, setQuery] = React.useState('');
  const { query: q } = useQuery();
  const [expanded, setExpanded] = React.useState(false);
  const { options, reset, setSelected, selected, multi } = useFilter(name);
  const toggleExpanded = React.useCallback(() => setExpanded((prev) => !prev), []);
  const { disableDefaultStyles = false, customClassNames, language } = useSearchUIContext();
  const theme = useTheme();
  const { t } = useTranslation('filter');

  const styles = getStylesObject(
    {
      innerList: [tw`flex items-center justify-between`],
      count: [tw`ml-2 text-xs text-gray-400`],
      checkbox: [tw`text-sm`],
      searchWrapper: [tw`mb-2`],
      toggleButtonWrapper: [tw`mt-1`],
      toggleIcon: [tw`ml-2`, `color: ${theme.color.primary.base}`],
    },
    disableDefaultStyles,
  );

  // By default, pin selected items if the option count is over limit
  if (!isBoolean(pinSelected)) {
    pinSelected = options.length > limit;
  }

  // Reset internal query on global query change
  React.useEffect(() => {
    setQuery('');
  }, [q]);

  // Collapse when filtering via internal or external query change
  React.useEffect(() => {
    setExpanded(false);
  }, [query, q]);

  const Control = multi ? Checkbox : Radio;
  const filtered = searchable ? options.filter((o) => o.label.toLowerCase().includes(query.toLowerCase())) : options;
  const slice = filtered.length > limit;

  const sortedItems = React.useMemo(() => {
    let list = filtered;

    if (sort !== 'none') {
      list = sortItems(list, sort === 'count' ? 'count' : 'label', sortAscending);
    }

    if (pinSelected) {
      list = pinItems(list, selected, 'label');
    }

    return list;
  }, [JSON.stringify(filtered), JSON.stringify(selected), pinSelected, sort, sortAscending]);

  const items = slice && !expanded ? sortedItems.slice(0, limit) : sortedItems;
  const Icon = expanded ? IconSmallChevronUp : IconSmallChevronDown;

  const innerList = React.useMemo(
    () =>
      items.map(({ label, count }) => (
        <CoreBox css={styles.innerList} key={`${label}-${count}`}>
          <Control
            value={label}
            checked={selected.includes(label)}
            onChange={noop}
            css={styles.checkbox}
            disableDefaultStyles={disableDefaultStyles}
          >
            {typeof itemRender === 'function' ? itemRender(label) : label}
          </Control>
          <span css={styles.count}>{count.toLocaleString(language)}</span>
        </CoreBox>
      )),
    [JSON.stringify(items), itemRender, selected],
  );

  if (isEmpty(options)) {
    return null;
  }

  return (
    <Box title={title} name={name} showReset={selected.length > 0 && multi} onReset={reset}>
      {searchable ? (
        <CoreBox css={styles.searchWrapper}>
          <Combobox
            value={query}
            size="sm"
            className={customClassNames.filter?.list?.searchFilter}
            placeholder={placeholder}
            onChange={(value) => {
              setQuery(value || '');
            }}
            disableDefaultStyles={disableDefaultStyles}
          />
        </CoreBox>
      ) : null}

      <CoreBox id={`list-${name}`} className={customClassNames.filter?.list?.container}>
        {multi ? (
          <CheckboxGroup
            value={selected}
            onChange={setSelected}
            className={customClassNames.filter?.list?.checkboxGroup}
            disableDefaultStyles={disableDefaultStyles}
            aria-labelledby={getHeaderId(name)}
          >
            {innerList}
          </CheckboxGroup>
        ) : (
          <RadioGroup
            value={selected[0]}
            onChange={(e) => setSelected([e.target.value])}
            className={customClassNames.filter?.list?.radioGroup}
            disableDefaultStyles={disableDefaultStyles}
            aria-labelledby={getHeaderId(name)}
          >
            {innerList}
          </RadioGroup>
        )}
      </CoreBox>

      {slice ? (
        <CoreBox css={styles.toggleButtonWrapper}>
          <Button
            appearance="link"
            onClick={toggleExpanded}
            aria-controls={`list-${name}`}
            aria-expanded={expanded}
            size="sm"
            spacing="none"
            className={customClassNames.filter?.list?.toggleButton}
            disableDefaultStyles={disableDefaultStyles}
          >
            {expanded
              ? t('showLess')
              : t('showMore', { count: (filtered.length - limit).toLocaleString(language) as never })}
            <Icon css={styles.toggleIcon} />
          </Button>
        </CoreBox>
      ) : null}
    </Box>
  );
};

export default ListFilter;
export type { ListFilterProps };
