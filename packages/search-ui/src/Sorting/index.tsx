/* eslint-disable react/no-array-index-key */
/** @jsx jsx */
import { jsx } from '@emotion/core';
import { useId } from '@reach/auto-id';
import { Label, Select } from '@sajari/react-components';
import { useSorting } from '@sajari/react-hooks';
import { __DEV__, getStylesObject } from '@sajari/react-sdk-utils';
import { useTranslation } from 'react-i18next';
import tw from 'twin.macro';

import { useSearchUIContext } from '../ContextProvider';
import { SortingProps, SortOption } from './types';

const defaultOptions: SortOption[] = [{ name: 'Most relevant', value: '' }];

const Sorting = (props: SortingProps) => {
  const { t } = useTranslation();
  const { label = t('sorting.label'), options = defaultOptions, size, styles: stylesProp, ...rest } = props;
  const { disableDefaultStyles = false } = useSearchUIContext();
  const { sorting, setSorting } = useSorting();
  const id = `sorting-${useId()}`;

  const styles = getStylesObject(
    { container: [tw`flex items-center space-x-4`], label: [tw`text-sm text-gray-500`] },
    disableDefaultStyles,
  );

  return (
    <div css={[styles.container, stylesProp]} {...rest}>
      <Label htmlFor={id} css={styles.label} size={size} disableDefaultStyles={disableDefaultStyles}>
        {label}
      </Label>
      <Select
        id={id}
        value={sorting}
        onChange={(e) => setSorting(e.target.value)}
        size={size}
        disableDefaultStyles={disableDefaultStyles}
      >
        {options.map((s, i) => (
          <option key={`${id}-option-${i}`} value={s.value}>
            {s.name}
          </option>
        ))}
      </Select>
    </div>
  );
};

if (__DEV__) {
  Sorting.displayName = 'Sorting';
}

export default Sorting;
export type { SortingProps };
