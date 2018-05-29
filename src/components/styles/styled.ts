import * as React from "react";
import styled, {
  StyledComponent,
  ThemedReactEmotionInterface
} from "react-emotion";

import { ITheme } from "./theme";

export { StyledComponent };
export default styled as ThemedReactEmotionInterface<ITheme>;

export interface IStyledProps<T>
  extends React.HTMLAttributes<T>,
    React.ClassAttributes<T> {
  styles?: React.CSSProperties | null;
  theme?: ITheme;
}

export const override = (props: any) => (props.styles ? props.styles : {});
