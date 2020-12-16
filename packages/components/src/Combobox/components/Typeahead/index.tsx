import { getStylesObject } from '@sajari/react-sdk-utils';
import React from 'react';

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
  const {
    mode,
    completion,
    inputValue,
    disableDefaultStyles = false,
    customClassNames: { typeaheadClassName = '' },
  } = useComboboxContext();
  const styles = getStylesObject(useTypeaheadStyles(), disableDefaultStyles);
  let typeaheadValue = '';
  let hiddenText = '&#8203;';

  if (mode === 'typeahead' && completion) {
    typeaheadValue = trimPrefix(completion, inputValue);
    hiddenText = completion.substring(0, completion.length - typeaheadValue.length);
  }

  return (
    <Box css={styles.container} className={typeaheadClassName}>
      <Box as="span" css={styles.hidden}>
        {hiddenText}
      </Box>
      {typeaheadValue}
    </Box>
  );
};

export default Typeahead;
