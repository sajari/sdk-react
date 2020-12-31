import { mergeProps } from '@react-aria/utils';
import { cleanChildren, getStylesObject } from '@sajari/react-sdk-utils';
import * as React from 'react';

import Box from '../../../Box';
import { useSelectContext } from '../../context';
import Option from '../Option';
import { useDropdownStyles } from './styles';

const Dropdown = () => {
  const { children, open, getMenuProps, disableDefaultStyles, customClassNames } = useSelectContext();
  const { styles: dropdownStyles, focusRingProps } = useDropdownStyles({ shown: open });
  const styles = getStylesObject(dropdownStyles, disableDefaultStyles);
  // Ensure backwards compatibility with <option> children
  const options = cleanChildren(children).map((child) =>
    child.type === 'option' ? <Option {...child.props} key={child.props.value} /> : child,
  );

  return (
    <Box
      as="ul"
      css={styles.container}
      {...mergeProps(focusRingProps, getMenuProps())}
      className={customClassNames.dropdownClassName}
    >
      {open && options}
    </Box>
  );
};

export default Dropdown;
