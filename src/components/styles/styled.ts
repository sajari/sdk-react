import omit from "lodash-es/omit";
import * as React from "react";
import styled, {
  StyledComponent,
  ThemedReactEmotionInterface
} from "react-emotion";
import { ComponentEnhancer, compose, mapProps, renameProps } from "recompose";

import { ITheme } from "./theme";

export { StyledComponent };
export default styled as ThemedReactEmotionInterface<ITheme>;

export interface IStyledProps<T>
  extends React.HTMLAttributes<T>,
    React.ClassAttributes<T> {
  styles?: { [k: string]: any };
  class?: string;
  theme?: ITheme;
}

const omitProps = (keys: string[]) =>
  mapProps(props => omit(props, ...["style", "className", ...keys]));

export const strip = (keys: string[]) =>
  compose(
    renameProps({ style: "styles", className: "class" }),
    omitProps(keys)
  );

export const override = (props: any) => (props.styles ? props.styles : {});
