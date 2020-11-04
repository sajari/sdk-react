/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { useId } from '@reach/auto-id';
import { Button, ButtonGroup, Label } from '@sajari/react-components';
import React, { useState } from 'react';
import { __DEV__ } from 'sajari-react-sdk-utils';
import tw from 'twin.macro';

import { SmallGrid, SmallList } from '../assets/icons';
import { ListViewType, ViewTypeProps } from './types';

const styles = [tw`transition-colors duration-300 ease-out fill-current`];

const ViewType: React.FC<ViewTypeProps> = ({ defaultView = 'list', label = 'View' }) => {
  const [type, setType] = useState<ListViewType>(defaultView);
  const id = `view-type-${useId()}`;
  return (
    <div css={tw`flex space-x-4`}>
      <Label htmlFor={id}>{label}</Label>
      <ButtonGroup id={id} attached>
        <Button onClick={() => setType('grid')} appearance={type === 'grid' ? 'primary' : undefined}>
          <SmallGrid css={css([...styles, ...(type === 'grid' ? [tw`text-white`] : [])])} />
        </Button>
        <Button onClick={() => setType('list')} appearance={type === 'list' ? 'primary' : undefined}>
          <SmallList css={css([...styles, ...(type === 'list' ? [tw`text-white`] : [])])} />
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
