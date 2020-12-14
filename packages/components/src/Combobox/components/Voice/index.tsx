/** @jsx jsx */
import { jsx } from '@emotion/core';
import { getStylesObject } from '@sajari/react-sdk-utils';

import { IconEmptyMic, IconMic } from '../../../assets/icons';
import Box from '../../../Box';
import { useVoiceInput } from '../../../hooks';
import { useComboboxContext } from '../../context';
import useVoiceStyles from './styles';
import { VoiceProps } from './types';

const Voice = ({ children, onVoiceInput, ...rest }: VoiceProps) => {
  const { active, start, supported } = useVoiceInput(onVoiceInput);
  const { disableDefaultStyles = false } = useComboboxContext();

  if (!supported) {
    return null;
  }

  if (children && typeof children === 'function') {
    return children({ onClick: start, active });
  }

  const styles = getStylesObject(useVoiceStyles({ active }), disableDefaultStyles);

  return (
    <Box as="button" type="button" css={styles.container} onClick={start} aria-label="Search by voice" {...rest}>
      {active ? <IconMic /> : <IconEmptyMic />}
    </Box>
  );
};

export default Voice;
