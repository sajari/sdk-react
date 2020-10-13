import React from 'react';
import { PropsWithAs } from '../types/component-as';
import { forwardRefWithAs } from '../utils/react-helpers';

interface BoxProps {
  children?: React.ReactNode;
}

type DefaultElement = 'div';

const BoxComponent = (props: PropsWithAs<BoxProps, DefaultElement>, ref: React.Ref<HTMLDivElement>) => {
  const { as: Type = 'div', children, ...rest } = props;
  return (
    <Type ref={ref} {...rest}>
      {children}
    </Type>
  );
};

const Box = forwardRefWithAs<BoxProps, DefaultElement>(BoxComponent);

export default Box;
