import { filterObject, forwardRefWithAs, PropsWithAs } from '@sajari/react-sdk-utils';
import React from 'react';

import blacklist from './props-blacklist';
import { BoxProps } from './types';

type DefaultElement = 'div';

const BoxComponent = (props: PropsWithAs<BoxProps, DefaultElement>, ref: React.Ref<HTMLDivElement>) => {
  const { as: Type = 'div', children, ...rest } = props;
  const filteredProps = filterObject(rest, blacklist, true);

  return (
    <Type ref={ref} {...filteredProps}>
      {children}
    </Type>
  );
};

const Box = forwardRefWithAs<BoxProps, DefaultElement>(BoxComponent);

export default Box;
export type { BoxProps };
