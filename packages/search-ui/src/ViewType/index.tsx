/** @jsx jsx */
import { jsx } from '@emotion/core';
import { useId } from '@reach/auto-id';
import { Button, ButtonGroup, Text } from '@sajari/react-components';
import { useSearchContext } from '@sajari/react-hooks';
import { __DEV__ } from '@sajari/react-sdk-utils';
import { useTranslation } from 'react-i18next';
import tw from 'twin.macro';

import { IconSmallGrid, IconSmallList } from '../assets/icons';
import { ViewTypeProps } from './types';

const ViewType = (props: ViewTypeProps) => {
  const { t } = useTranslation();
  const { label = t('viewType.label'), size } = props;
  const id = `view-type-${useId()}`;
  const { viewType, setViewType } = useSearchContext();

  return (
    <div css={tw`flex items-center space-x-4`} aria-labelledby={id}>
      {/* @ts-ignore Union too complex? */}
      <Text id={id} css={tw`text-gray-500`} size={size}>
        {label}
      </Text>
      <ButtonGroup attached>
        <Button
          onClick={() => setViewType('grid')}
          size={size}
          appearance={viewType === 'grid' ? 'primary' : undefined}
          aria-label={t('viewType.grid')}
        >
          &#8203;
          <IconSmallGrid />
        </Button>
        <Button
          onClick={() => setViewType('list')}
          size={size}
          appearance={viewType === 'list' ? 'primary' : undefined}
          aria-label={t('viewType.list')}
        >
          &#8203;
          <IconSmallList />
        </Button>
      </ButtonGroup>
    </div>
  );
};

if (__DEV__) {
  ViewType.displayName = 'ViewType';
}
export default ViewType;
export type { ViewTypeProps };
