import React from 'react';
import tw from 'twin.macro';

import { EmptyMic, Mic } from '../assets/icons';
import Box from '../Box';
import useVoiceInput from '../hooks/useVoiceInput';
import { VoiceProps } from './types';

export const Voice = ({ children, onVoiceInput }: VoiceProps) => {
  const { active, start, supported } = useVoiceInput(onVoiceInput);

  if (!supported) {
    return null;
  }

  if (children && typeof children === 'function') {
    return children({ onClick: start, active });
  }

  return (
    <Box
      as="button"
      css={tw`bg-transparent border-0 shadow-none cursor-pointer`}
      onClick={start}
      aria-label="Search by voice"
    >
      {active ? <Mic /> : <EmptyMic />}
    </Box>
  );
};
