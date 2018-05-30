import * as React from "react";
import {
  override,
  styled,
  StyledComponent,
  StyledProps,
  Theme
} from "../styles";

import { Container as BaseContainer, ContainerProps } from "../Checkbox/styled";

export { HiddenInput, icon as iconStyles } from "../Checkbox/styled";

export const Container = styled(BaseContainer)({});
