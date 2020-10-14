import React from 'react';
import tw from 'twin.macro';
import { VoiceProps } from './types';
import Box from '../Box';
import { EmptyMic, Mic } from '../assets/icons';
import useVoiceInput from '../hooks/use-voice-input';

export const Voice = ({ children, onVoiceInput }: VoiceProps) => {
  const { active, start } = useVoiceInput(onVoiceInput);

  if (children && typeof children === 'function') {
    return children({ onClick: start, active });
  }

  return (
    <Box
      as="button"
      css={tw`bg-transparent shadow-none border-0 cursor-pointer`}
      onClick={start}
      aria-label="Search by voice"
    >
      {active ? <Mic /> : <EmptyMic />}
    </Box>
  );
};
