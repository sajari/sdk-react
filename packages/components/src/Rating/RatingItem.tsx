/** @jsx jsx */
import { jsx } from '@emotion/core';
import React from 'react';
import tw, { styled, theme } from 'twin.macro';

import { InternalRatingItemProps } from './types';

const StyledFirstHalf = styled.div<{ half: boolean; flipped: boolean }>`
  ${tw`absolute top-0 w-1/2 h-full overflow-hidden select-none`}
  & > * {
    flex-shrink: 0;
  }
  ${({ flipped }) => (flipped ? tw`flex flex-row-reverse right-0` : tw`flex flex-row left-0`)};
  color: ${({ half }) => (half ? theme`colors.orange.400` : 'inherit')};
`;

const StyledSecondHalf = styled.div`
  display: flex;
  color: inherit;
`;

export const RatingItem = ({
  character,
  half = false,
  active,
  flipped = false,
  count,
  index,
}: InternalRatingItemProps) => {
  const characterNode = typeof character === 'function' ? character({ count, index }) : character;

  return (
    <div
      css={[tw`relative m-0 p-0 inline-block`, active && !half ? tw`text-orange-400` : tw`text-gray-300`]}
      aria-hidden
    >
      <div aria-setsize={count} aria-posinset={index + 1}>
        <StyledFirstHalf flipped={flipped} half={half}>
          {characterNode}
        </StyledFirstHalf>
        <StyledSecondHalf>{characterNode}</StyledSecondHalf>
      </div>
    </div>
  );
};
