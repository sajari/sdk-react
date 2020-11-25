/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { useId } from '@reach/auto-id';
import { Button, ButtonGroup, Text } from '@sajari/react-components';
import { useSearchContext } from '@sajari/react-hooks';
import { __DEV__ } from '@sajari/react-sdk-utils';
import tw from 'twin.macro';

import { IconSmallGrid, IconSmallList } from '../assets/icons';
import { ViewTypeProps } from './types';

const styles = [tw`transition-colors duration-300 ease-out fill-current`];

const ViewType = (props: ViewTypeProps) => {
  const { label = 'View', size = 'sm' } = props;
  const id = `view-type-${useId()}`;
  const { viewType, setViewType } = useSearchContext();

  return (
    <div css={tw`flex items-center space-x-4`} aria-labelledby={id}>
      {/* @ts-ignore Union too complex? */}
      <Text id={id} css={tw`text-sm text-gray-500`}>
        {label}
      </Text>
      <ButtonGroup attached>
        <Button
          onClick={() => setViewType('grid')}
          size={size}
          appearance={viewType === 'grid' ? 'primary' : undefined}
        >
          &#8203;
          <IconSmallGrid css={css([...styles, ...(viewType === 'grid' ? [tw`text-white`] : [])])} />
        </Button>
        <Button
          onClick={() => setViewType('list')}
          size={size}
          appearance={viewType === 'list' ? 'primary' : undefined}
        >
          &#8203;
          <IconSmallList css={css([...styles, ...(viewType === 'list' ? [tw`text-white`] : [])])} />
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
