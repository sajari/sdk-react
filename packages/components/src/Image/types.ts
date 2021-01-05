import * as React from 'react';

import { AspectRatioProps } from '../AspectRatio';
import { BoxProps } from '../Box';

type HtmlAttributes = Omit<React.ImgHTMLAttributes<HTMLImageElement>, keyof Props>;

interface Props extends BoxProps {
  /** The alt text that describes the image */
  alt?: string;
  /** The native HTML `width` attribute to the passed to the `img` */
  htmlWidth?: string | number;
  /**  The native HTML `height` attribute to the passed to the `img` */
  htmlHeight?: string | number;
  /** Defines loading strategy */
  loading?: 'eager' | 'lazy';
  /** Set an aspect ratio for the image */
  aspectRatio?: AspectRatioProps['ratio'];
  /** Handy for use with the aspectRatio option */
  objectFit?: 'contain' | 'cover' | 'fill' | 'scale-down' | 'none';
  /** The classname for  AspectRatio container wrapper */
  containerClassName?: string;
  /** The image sources, pass in an array to display the second image on hover */
  hoverSrc?: string;
}

export interface ImageProps extends HtmlAttributes, Props {}
