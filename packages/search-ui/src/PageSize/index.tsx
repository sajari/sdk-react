/* eslint-disable react/no-array-index-key */
/** @jsx jsx */
import { jsx } from '@emotion/core';
import { useId } from '@reach/auto-id';
import { Label, Select } from '@sajari/react-components';
import { usePageSize, useSearchContext } from '@sajari/react-hooks';
import { __DEV__ } from '@sajari/react-sdk-utils';
import { useTranslation } from 'react-i18next';
import tw from 'twin.macro';

import { PageSizeProps } from './types';

const defaultSizes = [15, 25, 50, 100];

const PageSize = (props: PageSizeProps) => {
  const { t } = useTranslation();
  const { label = t('pageSize.label'), sizes = defaultSizes, size } = props;
  const { pageSize, setPageSize } = usePageSize();
  const { searched, totalResults } = useSearchContext();
  const id = `page-size-${useId()}`;
  const sizesSorted = sizes.sort((a, b) => a - b);
  const [min] = sizesSorted;

  if ((searched && totalResults === 0) || min > totalResults) {
    return null;
  }

  return (
    <div css={tw`flex items-center space-x-4`}>
      <Label htmlFor={id} css={tw`text-gray-500`} size={size}>
        {label}
      </Label>
      <Select id={id} value={`${pageSize}`} onChange={(e) => setPageSize(parseInt(e.target.value, 10))} size={size}>
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
