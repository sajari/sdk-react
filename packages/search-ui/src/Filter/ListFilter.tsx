/** @jsx jsx */
import { jsx } from '@emotion/core';
import { Button, Checkbox, CheckboxGroup, Combobox, Radio, RadioGroup } from '@sajari/react-components';
import { useFilter, useQuery } from '@sajari/react-hooks';
import { isBoolean, isEmpty } from '@sajari/react-sdk-utils';
import { useCallback, useEffect, useState } from 'react';
import tw from 'twin.macro';

import { IconSmallChevronDown, IconSmallChevronUp } from '../assets/icons';
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

  // By default, pin selected items if the option count is over limit
  if (!isBoolean(pinSelected)) {
    pinSelected = options.length > limit;
  }

  useEffect(() => {
    setQuery('');
    setExpanded(false);
  }, [q]);

  if (isEmpty(options) || options.length === 1) {
    return null;
  }

  const Control = multi ? Checkbox : Radio;
  const filtered = searchable ? options.filter((o) => o.label.toLowerCase().includes(query.toLowerCase())) : options;
  const slice = filtered.length > limit;
  const sorted = sort !== 'none' ? sortItems(filtered, sort === 'count' ? 'count' : 'label', sortAscending) : filtered;
  const ordered = pinSelected ? pinItems(sorted, selected, 'label') : sorted;
  const sliced = slice && !expanded ? ordered.slice(0, limit) : ordered;
  const Icon = expanded ? IconSmallChevronUp : IconSmallChevronDown;

  const innerList = sliced.map(({ label, count }) => (
    <div css={tw`flex items-center justify-between`} key={label + count}>
      <Control value={label} checked={selected.includes(label)} onChange={noop} css={tw`text-sm`}>
        {typeof itemRender === 'function' ? itemRender(label) : label}
      </Control>
      <span css={tw`ml-2 text-xs text-gray-400`}>{count}</span>
    </div>
  ));

  return (
    <Box title={title} showReset={selected.length > 0 && multi} onReset={reset}>
      {searchable ? (
        <div css={tw`mb-2`}>
          <Combobox
            value={query}
            size="sm"
            placeholder={placeholder}
            onChange={(value) => {
              setQuery(value || '');
            }}
          />
        </div>
      ) : null}
      <div id={`list-${name}`}>
        {multi ? (
          <CheckboxGroup value={selected} onChange={setSelected}>
            {innerList}
          </CheckboxGroup>
        ) : (
          <RadioGroup value={selected[0]} onChange={(e) => setSelected([e.target.value])}>
            {innerList}
          </RadioGroup>
        )}
      </div>

      {slice ? (
        <div css={tw`mt-1`}>
          <Button
            appearance="link"
            onClick={toggleExpanded}
            aria-controls={`list-${name}`}
            aria-expanded={expanded}
            size="sm"
            spacing="none"
          >
            {expanded ? 'Show less' : `Show ${filtered.length - limit} more`}
            <Icon css={[tw`ml-2`, `color: ${({ theme }) => theme.colors.primary}`]} />
          </Button>
        </div>
      ) : null}
    </Box>
  );
};

export default ListFilter;
