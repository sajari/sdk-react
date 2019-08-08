import { CSSObject } from "@emotion/core";
import styled, { CreateStyled, StyledComponent } from "@emotion/styled";
import * as React from "react";
import { Theme } from "./theme";

export { StyledComponent };
export default styled as CreateStyled<Theme>;

export interface StyledProps<T>
  extends React.HTMLAttributes<T>,
    React.ClassAttributes<T> {
  styles?: CSSObject | null;
  theme?: Theme;
}

export const override = (props: any) => (props.styles ? props.styles : {});
