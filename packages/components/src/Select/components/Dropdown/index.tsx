import { mergeProps } from '@react-aria/utils';
import { getStylesObject } from '@sajari/react-sdk-utils';
import * as React from 'react';

import Box from '../../../Box';
import { useSelectContext } from '../../context';
import { useDropdownStyles } from './styles';

const Dropdown = () => {
  const { children, open, getMenuProps, disableDefaultStyles, customClassNames } = useSelectContext();
  const { styles: dropdownStyles, focusRingProps } = useDropdownStyles({ shown: open });
  const styles = getStylesObject(dropdownStyles, disableDefaultStyles);

  return (
    <Box
      as="ul"
      css={styles.container}
      {...mergeProps(focusRingProps, getMenuProps())}
      className={customClassNames.dropdownClassName}
    >
      {open && children}
    </Box>
  );
};

export default Dropdown;
