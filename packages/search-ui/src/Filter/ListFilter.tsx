import { Box as CoreBox, Button, Checkbox, CheckboxGroup, Combobox, Radio, RadioGroup } from '@sajari/react-components';
import { useFilter, useQuery } from '@sajari/react-hooks';
import { getStylesObject, isBoolean, isEmpty, isSSR, noop, useTheme } from '@sajari/react-sdk-utils';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import tw from 'twin.macro';

import { IconSmallChevronDown, IconSmallChevronUp } from '../assets/icons';
import { useSearchUIContext } from '../ContextProvider';
import Box from './Box';
import { ListFilterProps } from './types';
import { formatLabel, getHeaderId, pinItems, sortItems } from './utils';

const ListFilter = (props: Omit<ListFilterProps, 'type'>) => {
  const {
    name,
    title,
    limit = 10,
    sort = 'count',
    sortAscending = sort !== 'count',
    itemRender,
    placeholder,
    format,
  } = props;

  const filterContainerId = `list-${name}`;
  const { options, reset, setSelected, selected, multi } = useFilter(name);
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
    if (!isSSR() && pinSelected) {
      const input = document
        .querySelector(`#${filterContainerId}`)
        ?.querySelector(`input[value='${lastFocusedControl}']`) as HTMLInputElement | null;

      input?.focus();
    }
  }, [JSON.stringify(selected)]);

  const Control = multi ? Checkbox : Radio;
  const filtered = searchable ? options.filter((o) => o.label.toLowerCase().includes(query.toLowerCase())) : options;
  const slice = filtered.length > limit;

  const sortedItems = React.useMemo(() => {
    if (!isSSR() && pinSelected) {
      setLastFocusedControl(`${(document.activeElement as HTMLInputElement).value}`);
    }
    let list = filtered;

    if (sort !== 'none') {
      list = sortItems(list, sort === 'count' ? 'count' : 'label', sortAscending);
    }

    if (pinSelected) {
      list = pinItems(list, selected, 'label');
    }

    return list;
  }, [JSON.stringify(filtered), JSON.stringify(selected), pinSelected, sort, sortAscending]);

  const items = slice ? sortedItems.slice(0, shown) : sortedItems;
  const allShown = shown >= filtered.length;
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
            {typeof itemRender === 'function' ? itemRender(label) : formatLabel(label, { format, currency, t })}
          </Control>
          <span css={styles.count}>{count.toLocaleString(language)}</span>
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
    <Box title={title} name={name} showReset={selected.length > 0 && multi} onReset={reset}>
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
