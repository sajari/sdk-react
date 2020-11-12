/** @jsx jsx */
import { jsx } from '@emotion/core';
import Color from 'color';
import React from 'react';
import tw, { theme as twTheme } from 'twin.macro';

import useFocusRingStyles from '../../../hooks/useFocusRingStyles';

interface Props {
  active: boolean;
}

const Fill = React.forwardRef((props: Props, ref?: React.Ref<HTMLButtonElement>) => {
  const { active, ...rest } = props;
  const colorShadow = new Color(twTheme`colors.gray.900`);
  const { focusRingStyles, focusProps } = useFocusRingStyles({ rounded: 'full' });

  return (
    <button
      type="button"
      css={[
        tw`w-4 h-4 transition duration-200 bg-white border-none rounded-full outline-none appearance-none cursor-pointer before:(absolute transform -translate-x-1/2 text-sm pb-2 text-center transition-opacity duration-200)`,
        {
          boxShadow: `inset 0 0 0 1px ${colorShadow.alpha(0.15).hsl()},
              inset 0 -1px 0 ${colorShadow.alpha(0.15).hsl()},
              0 1px 1px ${colorShadow.alpha(0.1).hsl()}`,
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
        }`,
        { touchAction: 'pan-x' },
        focusRingStyles,
      ]}
      ref={ref}
      {...focusProps}
      {...rest}
    />
  );
});

export default Fill;
