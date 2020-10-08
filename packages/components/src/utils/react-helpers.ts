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

type CreateContextReturn<T> = [React.Provider<T>, () => T, React.Context<T>];

export interface CreateContextOptions {
  /** If `true`, React will throw if context is `null` or `undefined`. In some cases, you might want to support nested context, so you can set it to `false` */
  strict?: boolean;
  /** Error message to throw if the context is `undefined` */
  errorMessage?: string;
  /** The display name of the context */
  name?: string;
}

/**
 * Creates a named context, provider, and hook.
 *
 * @param options create context options
 */
export function createContext<ContextType>(options: CreateContextOptions = {}) {
  const { strict = true, errorMessage = 'useContext must be inside a Provider with a value', name } = options;
  const Context = React.createContext<ContextType | undefined>(undefined);

  Context.displayName = name;

  function useContext() {
    const context = React.useContext(Context);
    if (!context && strict) {
      throw new Error(errorMessage);
    }
    return context;
  }

  return [Context.Provider, useContext, Context] as CreateContextReturn<ContextType>;
}

export function forwardRefWithAs<Props, DefaultType extends As>(component: React.ForwardRefRenderFunction<any, any>) {
  return (React.forwardRef(component) as unknown) as ComponentWithAs<Props, DefaultType>;
}
