import { ComboboxProps } from '@sajari/react-components';

export interface InputProps<T> extends Omit<ComboboxProps<T>, 'items' | 'renderItem'> {}
