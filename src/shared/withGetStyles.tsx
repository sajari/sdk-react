import React, { ComponentClass, SFC } from "react";
import { CSSObject } from "emotion/node_modules/create-emotion/types";

// export function withTheme<Props, Theme = {}>(
//   component: ComponentClass<Props> | SFC<Props>
// ): ComponentClass<OptionalThemeProps<Props, Theme>>;

export type WrapperComponentProps<Props, T> = {
  customStyles: StyleProps<T>;
  getStyles: (key: string, props?: T) => CSSObject;
} & Props;

export interface DefaultStyleProps<T> {
  [k: string]: ((props: T) => CSSObject) | CSSObject;
}

export interface StyleProps<T> {
  [k: string]: (defaultStyles: CSSObject, props: T) => CSSObject;
}

function withGetStyles<Props, T>(
  WrappedComponent:
    | ComponentClass<WrapperComponentProps<Props, T>>
    | SFC<WrapperComponentProps<Props, T>>,
  defaultStyles: DefaultStyleProps<T>
) {
  return class extends React.Component<WrapperComponentProps<Props, T>> {
    static defaultProps = {
      customStyles: {}
    };

    getStyles = (key: string, props: T) => {
      if (!defaultStyles[key]) {
        return {};
      }

      const base =
        typeof defaultStyles[key] === "function"
          ? // @ts-ignore
            // @ts-ignore
            defaultStyles[key](props)
          : defaultStyles[key];
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
      return base;
    };

    render() {
      return <WrappedComponent getStyles={this.getStyles} {...this.props} />;
    }
  };
}

export default withGetStyles;
