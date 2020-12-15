/* eslint-disable react/no-array-index-key */
/** @jsx jsx */
import { jsx } from '@emotion/core';
import { useId } from '@react-aria/utils';
import { Box, Label, Select } from '@sajari/react-components';
import { useSearchContext, useSorting } from '@sajari/react-hooks';
import { getStylesObject } from '@sajari/react-sdk-utils';
import { useTranslation } from 'react-i18next';

import { useSearchUIContext } from '../ContextProvider';
import useSortingStyles from './styles';
import { SortingProps, SortOption } from './types';

const defaultOptions: SortOption[] = [{ name: 'Most relevant', value: '' }];

const Sorting = (props: SortingProps) => {
  const { t } = useTranslation('sorting');
  const { label = t('label'), options = defaultOptions, size, styles: stylesProp, ...rest } = props;
  const { disableDefaultStyles = false, customClassNames } = useSearchUIContext();
  const { searched } = useSearchContext();
  const { sorting, setSorting } = useSorting();
  const id = `sorting-${useId()}`;
  const styles = getStylesObject(useSortingStyles(), disableDefaultStyles);

  if (!searched) {
    return null;
  }

  return (
    <Box css={[styles.container, stylesProp]} {...rest} className={customClassNames.sorting?.container}>
      <Label
        htmlFor={id}
        css={styles.label}
        size={size}
        disableDefaultStyles={disableDefaultStyles}
        className={customClassNames.sorting?.label}
      >
        {label}
      </Label>
      <Select
        id={id}
        value={sorting}
        onChange={(e) => setSorting(e.target.value)}
        size={size}
        disableDefaultStyles={disableDefaultStyles}
        className={customClassNames.sorting?.select}
      >
        {options.map((s, i) => (
          <option key={`${id}-option-${i}`} value={s.value}>
            {s.name}
          </option>
        ))}
      </Select>
    </Box>
  );
};

export default Sorting;
export type { SortingProps };
