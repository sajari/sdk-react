type HtmlAttributes = Omit<
  React.ImgHTMLAttributes<HTMLImageElement>,
  keyof Props
>;

interface Props {
  /** The alt text that describes the image */
  alt?: string;
  /** A callback for when the image `src` has been loaded */
  // onLoad?: (event: Event | string) => void;
  /** A callback for when there was an error loading the image `src` */
  // onError?: (event: Event | string) => void;
  /** The native HTML `width` attribute to the passed to the `img` */
  htmlWidth?: string | number;
  /**  The native HTML `height` attribute to the passed to the `img` */
  htmlHeight?: string | number;
  /** Defines loading strategy */
  loading?: "eager" | "lazy";
  /** Opt out of the `fallbackSrc` logic and use the `Image` directly */
}

export interface ImageProps extends HtmlAttributes, Props {}
