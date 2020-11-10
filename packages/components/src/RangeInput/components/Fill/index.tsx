/** @jsx jsx */
import { jsx } from '@emotion/core';
import React from 'react';
import { useTheme } from 'sajari-react-sdk-styles';
import tw from 'twin.macro';

interface Props {
  isSingleHandle?: boolean;
  index: number;
}

const Fill = React.forwardRef((props: Props, ref?: React.Ref<HTMLDivElement>) => {
  const theme = useTheme();
  const { isSingleHandle = false, index, ...rest } = props;

  return (
    <div
      css={[
        tw`h-full rounded-full cursor-pointer`,
        {
          backgroundColor:
            (index === 1 && !isSingleHandle) || (index === 0 && isSingleHandle)
              ? theme.color.primary.base
              : 'rgb(218, 223, 231)',
        },
      ]}
      ref={ref}
      {...rest}
    />
  );
});

export default Fill;
