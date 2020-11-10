/** @jsx jsx */
import { jsx } from '@emotion/core';
import React from 'react';
import tw from 'twin.macro';

const Track = React.forwardRef((props: any, ref?: React.Ref<HTMLDivElement>) => {
  return <div css={tw`relative flex-1 h-1`} style={{ touchAction: 'none' }} ref={ref} {...props} />;
});

export default Track;
