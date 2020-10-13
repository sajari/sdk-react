import React from 'react';

type HtmlAttributes = Omit<React.ImgHTMLAttributes<HTMLImageElement>, keyof Props>;

interface Props {
  /** The alt text that describes the image */
  alt?: string;
  /** The native HTML `width` attribute to the passed to the `img` */
  htmlWidth?: string | number;
  /**  The native HTML `height` attribute to the passed to the `img` */
  htmlHeight?: string | number;
  /** Defines loading strategy */
  loading?: 'eager' | 'lazy';
  /** Opt out of the `fallbackSrc` logic and use the `Image` directly */
}

export interface ImageProps extends HtmlAttributes, Props {}
