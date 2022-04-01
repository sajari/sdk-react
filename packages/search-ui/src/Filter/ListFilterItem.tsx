import { Box as CoreBox, Checkbox, Radio } from '@sajari/react-components';
import { getStylesObject } from '@sajari/react-sdk-utils';
import React from 'react';
import { useTranslation } from 'react-i18next';
import tw from 'twin.macro';

import { ListFilterProps } from './types';
import { formatLabel } from './utils';

type Props = Pick<
  ListFilterProps,
  'hideCount' | 'format' | 'textTransform' | 'sort' | 'sortAscending' | 'itemRender'
> & {
  label: string;
  count: number;
  language?: string;
  multi: boolean;
  disableDefaultStyles: boolean;
  isChecked?: boolean;
  currency: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
};

const ListFilterItem = React.memo(
  ({
    label,
    count,
    language,
    multi,
    disableDefaultStyles,
    isChecked,
    hideCount,
    format,
    currency,
    textTransform,
    onChange,
    itemRender,
  }: Props) => {
    const styles = getStylesObject(
      {
        innerList: [tw`flex items-center justify-between`],
        checkbox: [tw`text-sm`],
        count: [tw`ml-2 text-xs text-gray-400`],
      },
      disableDefaultStyles,
    );

    const { t } = useTranslation('filter');
    const Control = multi ? Checkbox : Radio;

    return (
      <CoreBox css={styles.innerList}>
        <Control
          value={label}
          checked={isChecked}
          onChange={onChange}
          css={styles.checkbox}
          disableDefaultStyles={disableDefaultStyles}
        >
          {typeof itemRender === 'function'
            ? itemRender(label)
            : formatLabel(label, { format, currency, textTransform, t })}
        </Control>
        {!hideCount && <span css={styles.count}>{count.toLocaleString(language)}</span>}
      </CoreBox>
    );
  },
);

export default ListFilterItem;
