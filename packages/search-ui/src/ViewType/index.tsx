/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { useId } from '@reach/auto-id';
import { Button, ButtonGroup, Label } from '@sajari/react-components';
import { __DEV__ } from '@sajari/react-sdk-utils';
import React, { useEffect, useState } from 'react';
import tw from 'twin.macro';

import { IconSmallGrid, IconSmallList } from '../assets/icons';
import { ListViewType, ViewTypeProps } from './types';

const styles = [tw`transition-colors duration-300 ease-out fill-current`];

const ViewType: React.FC<ViewTypeProps> = ({ defaultView = 'list', label = 'View', onChange = () => {} }) => {
  const [type, setType] = useState<ListViewType>(defaultView);
  const id = `view-type-${useId()}`;
  useEffect(() => {
    onChange(type);
  }, [type]);
  return (
    <div css={tw`flex space-x-4`}>
      <Label htmlFor={id}>{label}</Label>
      <ButtonGroup id={id} attached>
        <Button onClick={() => setType('grid')} appearance={type === 'grid' ? 'primary' : undefined}>
          <IconSmallGrid css={css([...styles, ...(type === 'grid' ? [tw`text-white`] : [])])} />
        </Button>
        <Button onClick={() => setType('list')} appearance={type === 'list' ? 'primary' : undefined}>
          <IconSmallList css={css([...styles, ...(type === 'list' ? [tw`text-white`] : [])])} />
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
