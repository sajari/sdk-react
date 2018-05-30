import * as React from "react";
import styled, {
  StyledComponent,
  ThemedReactEmotionInterface
} from "react-emotion";

import { Theme } from "./theme";

export { StyledComponent };
export default styled as ThemedReactEmotionInterface<Theme>;

export interface StyledProps<T>
  extends React.HTMLAttributes<T>,
    React.ClassAttributes<T> {
  styles?: React.CSSProperties | null;
  theme?: Theme;
}

export const override = (props: any) => (props.styles ? props.styles : {});
