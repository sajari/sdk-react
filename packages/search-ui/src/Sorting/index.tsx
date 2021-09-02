import { useId } from '@react-aria/utils';
import { Option, Radio, RadioGroup, Select } from '@sajari/react-components';
import { useSorting } from '@sajari/react-hooks';
import { getStylesObject, isArray } from '@sajari/react-sdk-utils';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import tw from 'twin.macro';

import { useSearchUIContext } from '../ContextProvider';
import { useDownshiftEnvironment } from '../hooks';
import ViewOption from '../ViewOption';
import { SortingProps, SortOption } from './types';

const defaultOptions: SortOption[] = [{ name: 'Most relevant', value: '' }];

const Sorting = (props: SortingProps) => {
  const { t } = useTranslation('sorting');
  const { type = 'select', label = t('label'), options = defaultOptions, size, styles: stylesProp, ...rest } = props;
  const { disableDefaultStyles = false, customClassNames } = useSearchUIContext();
  const { sorting, setSorting } = useSorting();
  const id = `sorting-${useId()}`;
  const styles = getStylesObject(
    {
      radioGroup: [tw`text-sm`],
    },
    disableDefaultStyles,
  );

  const renderSortOptionName = (name: string) =>
    name.toLowerCase() === 'most relevant' ? t('mostRelevantOption') : name;

  const downshiftEnvironment = useDownshiftEnvironment();

  const innerRender =
    type === 'select' ? (
      <Select
        id={id}
        value={sorting}
        onChange={(value) => setSorting(isArray(value) ? value[0] : value)}
        size={size}
        disableDefaultStyles={disableDefaultStyles}
        className={customClassNames.sorting?.select}
        downshiftEnvironment={downshiftEnvironment}
      >
        {options.map((s: SortOption) => (
          <Option key={s.value} value={s.value}>
            {renderSortOptionName(s.name)}
          </Option>
        ))}
      </Select>
    ) : (
      <RadioGroup
        id={id}
        value={sorting}
        onChange={(e) => setSorting(e.target.value)}
        className={customClassNames.filter?.list?.radioGroup}
        css={styles.radioGroup}
        disableDefaultStyles={disableDefaultStyles}
      >
        {options.map((s: SortOption) => (
          <Radio key={s.value} value={s.value}>
            {renderSortOptionName(s.name)}
          </Radio>
        ))}
      </RadioGroup>
    );

  return (
    <ViewOption
      id={id}
      label={label}
      size={size}
      className={customClassNames.sorting?.container}
      labelClassName={customClassNames.sorting?.label}
      renderAsLabel
      inline={type === 'select'}
      {...rest}
    >
      {innerRender}
    </ViewOption>
  );
};

export default Sorting;
export type { SortingProps };
