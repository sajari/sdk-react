/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { useId } from '@reach/auto-id';
import { Button, ButtonGroup, Label } from '@sajari/react-components';
import { useSearchContext } from '@sajari/react-hooks';
import { __DEV__ } from '@sajari/react-sdk-utils';
import React from 'react';
import tw from 'twin.macro';

import { IconSmallGrid, IconSmallList } from '../assets/icons';
import { ViewTypeProps } from './types';

const styles = [tw`transition-colors duration-300 ease-out fill-current`];

const ViewType: React.FC<ViewTypeProps> = ({ label = 'View' }) => {
  const id = `view-type-${useId()}`;
  const { viewType, setViewType } = useSearchContext();
  return (
    <div css={tw`flex space-x-4`}>
      <Label htmlFor={id}>{label}</Label>
      <ButtonGroup id={id} attached>
        <Button onClick={() => setViewType('grid')} appearance={viewType === 'grid' ? 'primary' : undefined}>
          <IconSmallGrid css={css([...styles, ...(viewType === 'grid' ? [tw`text-white`] : [])])} />
        </Button>
        <Button onClick={() => setViewType('list')} appearance={viewType === 'list' ? 'primary' : undefined}>
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
