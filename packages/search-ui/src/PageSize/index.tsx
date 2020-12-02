/* eslint-disable react/no-array-index-key */
/** @jsx jsx */
import { jsx } from '@emotion/core';
import { useId } from '@reach/auto-id';
import { Label, Select } from '@sajari/react-components';
import { usePageSize, useSearchContext } from '@sajari/react-hooks';
import { __DEV__, getStylesObject } from '@sajari/react-sdk-utils';
import { useTranslation } from 'react-i18next';

import { useSearchUIContext } from '../ContextProvider';
import usePageSizeStyles from './styles';
import { PageSizeProps } from './types';

const defaultSizes = [15, 25, 50, 100];

const PageSize = (props: PageSizeProps) => {
  const { t } = useTranslation();
  const { customClassNames, disableDefaultStyles = false } = useSearchUIContext();
  const { label = t('pageSize.label'), sizes = defaultSizes, styles: stylesProp, size, ...rest } = props;
  const { pageSize, setPageSize } = usePageSize();
  const { searched, totalResults } = useSearchContext();
  const id = `page-size-${useId()}`;
  const sizesSorted = sizes.sort((a, b) => a - b);
  const [min] = sizesSorted;

  if (!searched || totalResults === 0 || min > totalResults) {
    return null;
  }

  const styles = getStylesObject(usePageSizeStyles(), disableDefaultStyles);

  return (
    <div css={[styles.container, stylesProp]} {...rest} className={customClassNames.pageSize?.container}>
      <Label
        htmlFor={id}
        css={styles.label}
        size={size}
        disableDefaultStyles={disableDefaultStyles}
        className={customClassNames.pageSize?.label}
      >
        {label}
      </Label>
      <Select
        id={id}
        value={`${pageSize}`}
        onChange={(e) => setPageSize(parseInt(e.target.value, 10))}
        size={size}
        disableDefaultStyles={disableDefaultStyles}
        className={customClassNames.pageSize?.select}
      >
        {sizes.map((s, i) => (
          <option key={`${id}-option-${i}`} value={s}>
            {s}
          </option>
        ))}
      </Select>
    </div>
  );
};

if (__DEV__) {
  PageSize.displayName = 'PageSize';
}

export default PageSize;
export type { PageSizeProps };
