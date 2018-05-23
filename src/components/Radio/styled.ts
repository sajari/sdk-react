import * as React from "react";
import {
  IStyledProps,
  ITheme,
  override,
  styled,
  StyledComponent
} from "../styles";

import {
  Container as BaseContainer,
  IContainerProps
} from "../Checkbox/styled";

export { HiddenInput, icon as iconStyles } from "../Checkbox/styled";

export const Container = styled(BaseContainer)({});
