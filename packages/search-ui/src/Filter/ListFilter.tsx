/** @jsx jsx */
import { jsx } from '@emotion/core';
import { Button, Checkbox, CheckboxGroup, Combobox, Radio, RadioGroup } from '@sajari/react-components';
import { useFilter, useQuery } from '@sajari/react-hooks';
import { getStylesObject, isBoolean, isEmpty, useTheme } from '@sajari/react-sdk-utils';
import { useCallback, useEffect, useMemo, useState } from 'react';
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
  const { disableDefaultStyles = false, customClassNames } = useSearchUIContext();
  const theme = useTheme();

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
  const sorted = sort !== 'none' ? sortItems(filtered, sort === 'count' ? 'count' : 'label', sortAscending) : filtered;
  const ordered = pinSelected ? pinItems(sorted, selected, 'label') : sorted;
  const sliced = slice && !expanded ? ordered.slice(0, limit) : ordered;
  const Icon = expanded ? IconSmallChevronUp : IconSmallChevronDown;

  const innerList = useMemo(
    () =>
      sliced.map(({ label, count }) => (
        <div css={styles.innerList} key={label + count}>
          <Control
            value={label}
            checked={selected.includes(label)}
            onChange={noop}
            css={styles.checkbox}
            disableDefaultStyles={disableDefaultStyles}
          >
            {typeof itemRender === 'function' ? itemRender(label) : label}
          </Control>
          <span css={styles.count}>{count}</span>
        </div>
      )),
    [JSON.stringify(sliced), itemRender, selected],
  );

  if (isEmpty(options) || options.length === 1) {
    return null;
  }

  return (
    <Box title={title} showReset={selected.length > 0 && multi} onReset={reset}>
      {searchable ? (
        <div css={styles.searchWrapper}>
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
        </div>
      ) : null}
      <div id={`list-${name}`} className={customClassNames.filter?.list?.container}>
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
      </div>

      {slice ? (
        <div css={styles.toggleButtonWrapper}>
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
            {expanded ? 'Show less' : `Show ${filtered.length - limit} more`}
            <Icon css={styles.toggleIcon} />
          </Button>
        </div>
      ) : null}
    </Box>
  );
};

export default ListFilter;
