/* eslint-disable @typescript-eslint/indent */
/* eslint-disable no-undef */
import React from 'react';

export type As<Props = any> = React.ElementType<Props>;

export type PropsWithAs<Props = {}, Type extends As = As> = Props &
  Omit<React.ComponentProps<Type>, 'as' | keyof Props> & {
    as?: Type;
  };

export interface ComponentWithAs<Props, DefaultType extends As> {
  <Type extends As>(props: PropsWithAs<Props, Type> & { as: Type }): JSX.Element;
  (props: PropsWithAs<Props, DefaultType>): JSX.Element;
}
