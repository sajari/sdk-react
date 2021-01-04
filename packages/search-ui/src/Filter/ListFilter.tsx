import { Box as CoreBox, Button, Checkbox, CheckboxGroup, Combobox, Radio, RadioGroup } from '@sajari/react-components';
import { useFilter, useQuery } from '@sajari/react-hooks';
import { getStylesObject, isBoolean, isEmpty, noop, useTheme } from '@sajari/react-sdk-utils';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { useVirtual } from 'react-virtual';
import tw from 'twin.macro';
import useResizeObserver from 'use-resize-observer/polyfilled';

import { IconSmallChevronDown, IconSmallChevronUp } from '../assets/icons';
import { useSearchUIContext } from '../ContextProvider';
import Box from './Box';
import { ListFilterProps } from './types';
import { formatLabel, getHeaderId, pinItems, sortItems } from './utils';

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
    format,
    currency,
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
  const parentRef = React.useRef<HTMLDivElement | null>(null);
  const { ref, width } = useResizeObserver();

  const styles = getStylesObject(
    {
      innerList: [tw`flex items-center justify-between`],
      innerVirtualizedList: [tw`flex items-center justify-between absolute top-0 left-0 w-full`],
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

  const rowVirtualizer = useVirtual({
    parentRef,
    size: sortedItems.length,
    // Recalculate item's height on change
    estimateSize: React.useCallback(() => 21, [JSON.stringify(selected), width]),
    overscan: 10,
  });

  const items = sortedItems.slice(0, limit);
  const Icon = expanded ? IconSmallChevronUp : IconSmallChevronDown;

  const innerList = React.useMemo(() => {
    const InnerControl = ({ label, count }: { label: string; count: number }) => (
      <>
        <Control
          value={label}
          checked={selected.includes(label)}
          onChange={noop}
          css={styles.checkbox}
          disableDefaultStyles={disableDefaultStyles}
        >
          {typeof itemRender === 'function' ? itemRender(label) : formatLabel(label, { format, currency, t })}
        </Control>
        <span css={styles.count}>{count.toLocaleString(language)}</span>
      </>
    );

    // If the list is expanded or over the limit, virtualize it, othewise show normal list.
    return !expanded || !slice
      ? items.map(({ label, count }) => (
          <CoreBox css={styles.innerList} key={`${label}-${count}`}>
            <InnerControl label={label} count={count} />
          </CoreBox>
        ))
      : rowVirtualizer.virtualItems.map(({ index, measureRef, start }) => {
          const { label, count } = sortedItems[index];
          return (
            <CoreBox
              style={{ transform: `translateY(${start}px)`, margin: 0 }}
              css={styles.innerVirtualizedList?.concat(index === 0 ? tw`pt-0` : tw`pt-1`)}
              key={`${label}-${count}`}
              ref={measureRef}
            >
              <InnerControl label={label} count={count} />
            </CoreBox>
          );
        });
  }, [expanded, slice, rowVirtualizer, itemRender, selected]);

  const filterSearchOnChange = React.useCallback((value) => {
    setQuery(value || '');
  }, []);

  if (isEmpty(options)) {
    return null;
  }

  return (
    <Box ref={ref} title={title} name={name} showReset={selected.length > 0 && multi} onReset={reset}>
      {searchable ? (
        <CoreBox css={styles.searchWrapper}>
          <Combobox
            value={query}
            size="sm"
            className={customClassNames.filter?.list?.searchFilter}
            placeholder={placeholder}
            onChange={filterSearchOnChange}
            disableDefaultStyles={disableDefaultStyles}
          />
        </CoreBox>
      ) : null}

      <CoreBox
        id={`list-${name}`}
        css={slice && expanded ? tw`overflow-auto max-h-96` : tw``}
        className={customClassNames.filter?.list?.container}
        ref={parentRef}
      >
        {multi ? (
          <CheckboxGroup
            value={selected}
            onChange={setSelected}
            className={customClassNames.filter?.list?.checkboxGroup}
            disableDefaultStyles={disableDefaultStyles}
            aria-labelledby={getHeaderId(name)}
            style={{ height: slice && expanded ? `${rowVirtualizer.totalSize}px` : 'auto' }}
            css={tw`relative`}
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
            style={{ height: slice && expanded ? `${rowVirtualizer.totalSize}px` : 'auto' }}
            css={tw`relative`}
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
