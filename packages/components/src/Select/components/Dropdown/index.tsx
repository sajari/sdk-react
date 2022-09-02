import { mergeProps } from '@react-aria/utils';
import { getStylesObject } from '@sajari/react-sdk-utils';
import * as React from 'react';

import Box from '../../../Box';
import { useSelectContext } from '../../context';
import Option from '../Option';
import { useDropdownStyles } from './styles';

const Dropdown = () => {
  const { items, open, getMenuProps, disableDefaultStyles, customClassNames } = useSelectContext();
  const { styles: dropdownStyles } = useDropdownStyles({ shown: open });
  const styles = getStylesObject(dropdownStyles, disableDefaultStyles);
  const options = items.map((item) => <Option {...item} key={item.value} />);

  return (
    <Box as="ul" css={styles.container} {...mergeProps(getMenuProps())} className={customClassNames.dropdownClassName}>
      {open && options}
    </Box>
  );
};

export default Dropdown;
