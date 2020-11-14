/** @jsx jsx */
import { jsx } from '@emotion/core';
import tw from 'twin.macro';

import { IconEmptyMic, IconMic } from '../../../assets/icons';
import Box from '../../../Box';
import useVoiceInput from '../../../hooks/useVoiceInput';
import { VoiceProps } from './types';

const Voice = ({ children, onVoiceInput }: VoiceProps) => {
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
      type="button"
      css={[
        tw`transition duration-200 bg-transparent border-0 outline-none cursor-pointer`,
        active ? tw`text-red-500` : tw`hover:text-gray-600 focus:text-gray-600`,
      ]}
      onClick={start}
      aria-label="Search by voice"
    >
      {active ? <IconMic /> : <IconEmptyMic />}
    </Box>
  );
};

export default Voice;
