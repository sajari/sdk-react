import { Box as CoreBox, Button, Checkbox, CheckboxGroup, Combobox, Radio, RadioGroup } from '@sajari/react-components';
import { useFilter, useQuery } from '@sajari/react-hooks';
import { getStylesObject, isBoolean, isEmpty, useTheme } from '@sajari/react-sdk-utils';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import tw from 'twin.macro';

import { IconSmallChevronDown, IconSmallChevronUp } from '../assets/icons';
import { useSearchUIContext } from '../ContextProvider';
import Box from './Box';
import { ListFilterProps } from './types';
import { pinItems, sortItems } from './utils';

const noop = () => {};

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
  const [query, setQuery] = useState('');
  const { query: q } = useQuery();
  const [expanded, setExpanded] = useState(false);
  const { options, reset, setSelected, selected, multi } = useFilter(name);
  const toggleExpanded = useCallback(() => setExpanded((prev) => !prev), []);
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
      toggleIcon: [tw`ml-2`, `color: ${theme.color.primary}`],
    },
    disableDefaultStyles,
  );

  // By default, pin selected items if the option count is over limit
  if (!isBoolean(pinSelected)) {
    pinSelected = options.length > limit;
  }

  useEffect(() => {
    setQuery('');
    setExpanded(false);
  }, [q]);

  const Control = multi ? Checkbox : Radio;
  const filtered = searchable ? options.filter((o) => o.label.toLowerCase().includes(query.toLowerCase())) : options;
  const slice = filtered.length > limit;

  const sortedItems = useMemo(() => {
    let list = filtered;

    if (sort !== 'none') {
      list = sortItems(list, sort === 'count' ? 'count' : 'label', sortAscending);
    }

    if (pinSelected) {
      list = pinItems(list, selected, 'label');
    }

    return list;
  }, [JSON.stringify(options), JSON.stringify(selected), pinSelected, sort, sortAscending]);

  const items = slice && !expanded ? sortedItems.slice(0, limit) : sortedItems;
  const Icon = expanded ? IconSmallChevronUp : IconSmallChevronDown;

  const innerList = useMemo(
    () =>
      items.map(({ label, count }) => (
        <CoreBox css={styles.innerList} key={label + count}>
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
    <Box title={title} showReset={selected.length > 0 && multi} onReset={reset}>
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
          >
            {innerList}
          </CheckboxGroup>
        ) : (
          <RadioGroup
            value={selected[0]}
            onChange={(e) => setSelected([e.target.value])}
            className={customClassNames.filter?.list?.radioGroup}
            disableDefaultStyles={disableDefaultStyles}
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
