import React, { Children, isValidElement } from 'react';

import { As, ComponentWithAs } from '../types/component-as';

type ReactRef<T> = React.Ref<T> | React.RefObject<T> | React.MutableRefObject<T>;

export function setRef<T = any>(ref: React.Ref<T> = null, value: T) {
  if (!ref) {
    return;
  }

  if (typeof ref === 'function') {
    ref(value);
  } else {
    // eslint-disable-next-line no-param-reassign
    (ref as React.MutableRefObject<T>).current = value;
  }
}

/**
 * Get a list of all valid React child elements
 * @param children
 */
export function cleanChildren(children: React.ReactChildren | React.ReactNode): React.ReactElement[] {
  return Children.toArray(children).filter((child) => isValidElement(child)) as React.ReactElement[];
}

export function assignRef(ref: React.Ref<HTMLElement>, value: HTMLElement) {
  if (ref == null) {
    return;
  }

  try {
    setRef(ref, value);
  } catch (error) {
    throw new Error(`Cannot assign value "${value}" to ref "${ref}"`);
  }
}

/**
 * Combine multiple React refs into a single ref function.
 * This is used mostly when you need to allow consumers forward refs to
 * internal components
 *
 * @param refs refs to assign to value to
 */
export function mergeRefs<T>(...refs: Array<ReactRef<T> | undefined>) {
  return (value: T) => {
    // @ts-ignore
    refs.forEach((ref) => assignRef(ref, value));
  };
}

export function forwardRefWithAs<Props, DefaultType extends As>(component: React.ForwardRefRenderFunction<any, any>) {
  return (React.forwardRef(component) as unknown) as ComponentWithAs<Props, DefaultType>;
}
