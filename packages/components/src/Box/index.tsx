import React from 'react';
import { filterObject } from 'sajari-react-sdk-styles';

import { PropsWithAs } from '../types/component-as';
import { forwardRefWithAs } from '../utils/react-helpers';
import blacklist from './props-blacklist';

interface BoxProps {
  children?: React.ReactNode;
}

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
