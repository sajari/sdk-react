import React, { ComponentClass, SFC } from "react";
import { CSSObject } from "emotion/node_modules/create-emotion/types";

export type WithGetStylesProps<Props, State, Selectors> = {
  customStyles?: StyleProps<State, Selectors>;
} & Props;

export type WrapperComponentProps<Props, State, Selectors> = WithGetStylesProps<
  Props,
  State,
  Selectors
> & { getStyles: (key: keyof Selectors, props?: State) => CSSObject };

export type DefaultStyleProps<State, Selectors> = {
  [k in keyof Selectors]?: ((props: State) => CSSObject) | CSSObject
};

export type StyleProps<State, Selectors> = {
  [k in keyof Selectors]?: (
    defaultStyles: CSSObject,
    props?: State
  ) => CSSObject
};

export function withGetStyles<Props, State, Selectors>(
  WrappedComponent:
    | ComponentClass<WrapperComponentProps<Props, State, Selectors>>
    | SFC<WrapperComponentProps<Props, State, Selectors>>,
  defaultStyles: DefaultStyleProps<State, Selectors>
) {
  return class extends React.Component<
    WithGetStylesProps<Props, State, Selectors>
  > {
    getStyles = (key: keyof Selectors, props?: State): CSSObject => {
      if (!defaultStyles[key]) {
        return {};
      }

      const base =
        typeof defaultStyles[key] === "function"
          ? // TODO: ts warning should be fixed
            // @ts-ignore
            defaultStyles[key](props)
          : defaultStyles[key];

      if (this.props.customStyles) {
        const custom = this.props.customStyles[key];

        if (typeof custom === "function") {
          return custom(base, props);
        } else if (
          custom != null &&
          typeof custom === "object" &&
          Array.isArray(custom) === false
        ) {
          return custom;
        }
      }
      return base;
    };

    render() {
      return <WrappedComponent getStyles={this.getStyles} {...this.props} />;
    }
  };
}
