import { useFocusRing } from '@react-aria/focus';

import useRingStyles, { UseRingStylesProps } from './useRingStyles';

export type UseFocusRingStylesProps = Omit<UseRingStylesProps, 'visible'>;

export default function useFocusRingStyles(props?: UseFocusRingStylesProps) {
  const { isFocusVisible, focusProps } = useFocusRing();
  return { focusRingStyles: useRingStyles({ visible: isFocusVisible, ...props }), focusProps };
}
