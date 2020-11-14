import { PropsWithAs } from '../types/component-as';

export interface Props {
  /** The aspect ratio of the Box. Common values are:
   * `21/9`, `16/9`, `9/16`, `4/3`, `1.85/1` */
  ratio?: number | null;
}

export interface AspectRatioProps extends PropsWithAs<Props> {}
