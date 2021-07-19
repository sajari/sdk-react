import { Box as CoreBox, Button, Checkbox, CheckboxGroup, Combobox, Radio, RadioGroup } from '@sajari/react-components';
import { useFilter, useQuery } from '@sajari/react-hooks';
import { getStylesObject, isBoolean, isEmpty, isNullOrUndefined, isSSR, noop, useTheme } from '@sajari/react-sdk-utils';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import tw from 'twin.macro';

import { IconSmallChevronDown, IconSmallChevronUp } from '../assets/icons';
import { useSearchUIContext } from '../ContextProvider';
import Box from './Box';
import { ListFilterProps } from './types';
import { formatLabel, getHeaderId, pinItems } from './utils';

const ListFilter = (props: Omit<ListFilterProps, 'type'>) => {
  const {
    name,
    title,
    limit = 10,
    sort = 'count',
    sortAscending = sort !== 'count',
    itemRender,
    placeholder = '',
    format,
    hideCount = false,
    textTransform = 'normal-case',
    excludes,
    includes,
    prefixFilter,
  } = props;

  const filterContainerId = `list-${name}`;
  const { options, reset, setSelected, selected, multi, showReset } = useFilter(name, {
    sort,
    sortAscending,
    excludes,
    includes,
    prefixFilter,
  });
  // Enable search by default if there's more than the limit
  const { searchable = options.length > limit } = props;
  // By default, pin selected items if the option count is over limit
  let { pinSelected } = props;
  if (!isBoolean(pinSelected)) {
    pinSelected = options.length > limit;
  }

  // Because as the selected list changes the elements are being recreated so the focus is not focusing the correct element anymore
  const [lastFocusedControl, setLastFocusedControl] = React.useState('');
  const [query, setQuery] = React.useState('');
  const { query: q } = useQuery();
  const [shown, setShown] = React.useState(limit);
  const { disableDefaultStyles = false, customClassNames, currency, language } = useSearchUIContext();
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

  // Reset internal query on global query change
  React.useEffect(() => {
    setQuery('');
  }, [q]);

  // Reset shown number when filtering via internal or external query change
  React.useEffect(() => {
    setShown(limit);
  }, [query, q]);

  // On user interaction, get the last element being interacted with BEFORE the list is rerendered and focus that element
  React.useEffect(() => {
    if (!isSSR() && pinSelected && selected.includes(lastFocusedControl)) {
      const input = document
        .querySelector(`#${filterContainerId}`)
        ?.querySelector(`input[value="${lastFocusedControl}"]`) as HTMLInputElement | null;

      input?.focus();
    }
  }, [JSON.stringify(selected)]);

  const Control = multi ? Checkbox : Radio;
  const itemListFilteredByEmptyLabel = React.useMemo(
    () => options.filter((o) => !isNullOrUndefined(o.label) && !isEmpty(o.label)),
    [options],
  );

  const itemListFilteredByQuery = searchable
    ? itemListFilteredByEmptyLabel.filter((o) => o.label.toLowerCase().includes(query.toLowerCase()))
    : itemListFilteredByEmptyLabel;

  const slice = itemListFilteredByQuery.length > limit;

  const transformedItems = React.useMemo(() => {
    let list = itemListFilteredByQuery;

    if (pinSelected) {
      list = pinItems(list, selected, 'label');
    }

    return list;
  }, [JSON.stringify(itemListFilteredByQuery), JSON.stringify(selected), pinSelected]);

  const handleSelect = React.useCallback((value: string[]) => {
    setSelected(value);
    if (pinSelected) {
      setLastFocusedControl(value[value.length - 1]);
    }
  }, []);

  const items = slice ? transformedItems.slice(0, shown) : transformedItems;
  const allShown = shown >= itemListFilteredByQuery.length;
  const Icon = allShown ? IconSmallChevronUp : IconSmallChevronDown;
  const showMore = React.useCallback(() => {
    if (allShown) {
      setShown(limit);
    } else {
      setShown((s) => s + 20);
    }
  }, [allShown]);

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
            {typeof itemRender === 'function'
              ? itemRender(label)
              : formatLabel(label, { format, currency, textTransform, t })}
          </Control>
          {!hideCount && <span css={styles.count}>{count.toLocaleString(language)}</span>}
        </CoreBox>
      )),
    [JSON.stringify(items), itemRender, selected],
  );

  const filterSearchOnChange = React.useCallback((value) => {
    setQuery(value || '');
  }, []);

  if (isEmpty(options) && isEmpty(selected)) {
    return null;
  }

  return (
    <Box title={title} name={name} showReset={showReset} onReset={reset}>
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

      <CoreBox id={filterContainerId} className={customClassNames.filter?.list?.container}>
        {multi ? (
          <CheckboxGroup
            value={selected}
            onChange={handleSelect}
            className={customClassNames.filter?.list?.checkboxGroup}
            disableDefaultStyles={disableDefaultStyles}
            aria-labelledby={getHeaderId(name)}
          >
            {innerList}
          </CheckboxGroup>
        ) : (
          <RadioGroup
            value={selected[0]}
            onChange={(e) => handleSelect([e.target.value])}
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
            onClick={showMore}
            aria-controls={filterContainerId}
            size="sm"
            spacing="none"
            className={customClassNames.filter?.list?.toggleButton}
            disableDefaultStyles={disableDefaultStyles}
          >
            {t(allShown ? 'showLess' : 'showMore')}
            <Icon css={styles.toggleIcon} />
          </Button>
        </CoreBox>
      ) : null}
    </Box>
  );
};

export default ListFilter;
export type { ListFilterProps };
