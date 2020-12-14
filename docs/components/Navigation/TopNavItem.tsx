import { IconButton, IconButtonProps } from '@sajari-ui/core';
import React from 'react';

const TopNavItem = React.forwardRef((props: IconButtonProps, ref?: React.Ref<HTMLElement>) => (
  <IconButton ref={ref} appearance="ghost" padding="p-2" {...props} />
));

export default TopNavItem;
