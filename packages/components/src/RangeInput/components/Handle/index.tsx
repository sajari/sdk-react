/** @jsx jsx */
import { jsx } from '@emotion/core';
import Color from 'color';
import React from 'react';
import { useTheme } from 'sajari-react-sdk-styles';
import tw from 'twin.macro';

interface Props {
  active: boolean;
}

const Fill = React.forwardRef((props: Props, ref?: React.Ref<HTMLButtonElement>) => {
  const theme = useTheme();
  const { active, ...rest } = props;
  const color = new Color(theme.color.primary.base);

  return (
    <button
      type="button"
      css={[
        tw`w-4 h-4 transition duration-200 bg-white border border-gray-300 rounded-full shadow-sm outline-none appearance-none cursor-pointer before:(absolute transform -translate-x-1/2 text-sm pb-2 text-center transition-opacity duration-200)`,
        {
          boxShadow: active ? `0 0 0 3px ${color.alpha(0.25).hsl().string()}` : undefined,
          borderColor: active ? color.alpha(0.75).hsl().string() : undefined,
        },
        `&::before {
          content: attr(data-value);
          bottom: 100%;
          left: 50%;
          opacity: ${active ? 1 : 0};
        }
        &:hover::before,
        &:focus::before {
          opacity: 1;
        }        `,
        { touchAction: 'pan-x' },
      ]}
      ref={ref}
      {...rest}
    />
  );
});

export default Fill;
