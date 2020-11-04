import { css, SerializedStyles } from '@emotion/core';
import { TwStyle } from 'twin.macro';

// TODO: This is replicated in the components package, somehow share it
export function mapStyles(styles: Record<string, (TwStyle | string)[]>): Record<string, SerializedStyles> {
  return Object.entries(styles).reduce((obj, [key, value]) => Object.assign(obj, { [key]: css(value) }), {}) as Record<
    keyof typeof styles,
    SerializedStyles
  >;
}
