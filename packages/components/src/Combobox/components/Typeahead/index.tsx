/** @jsx jsx */
import { jsx } from '@emotion/core';
import tw from 'twin.macro';

import Box from '../../../Box';
import { useComboboxContext } from '../../context';
import { useTypeaheadStyles } from './styles';

export function trimPrefix(str: string, prefix: string) {
  if (str === undefined || prefix === '') {
    return '';
  }
  if (str.startsWith(prefix)) {
    return str.slice(prefix.length);
  }
  return '';
}

const Typeahead = () => {
  const { mode, completion, inputValue } = useComboboxContext();
  const styles = useTypeaheadStyles();
  let typeaheadValue = '';
  let hiddenText = '&#8203;';

  if (mode === 'typeahead' && completion) {
    typeaheadValue = trimPrefix(completion, inputValue);
    hiddenText = completion.substring(0, completion.length - typeaheadValue.length);
  }

  return (
    <Box css={styles.container}>
      <Box as="span" css={tw`opacity-0`}>
        {hiddenText}
      </Box>
      {typeaheadValue}
    </Box>
  );
};

export default Typeahead;
