import React, { ComponentClass, SFC } from "react";
import { CSSObject } from "emotion/node_modules/create-emotion/types";

export type WrapperComponentOriginProps<Props, State> = {
  customStyles?: StyleProps<State>;
} & Props;

export type WrapperComponentProps<Props, State> = WrapperComponentOriginProps<
  Props,
  State
> & { getStyles: (key: string, props?: State) => CSSObject };

export interface DefaultStyleProps<State> {
  [k: string]: ((props: State) => CSSObject) | CSSObject;
}

export interface StyleProps<State> {
  [k: string]: (defaultStyles: CSSObject, props?: State) => CSSObject;
}

function withGetStyles<Props, State>(
  WrappedComponent:
    | ComponentClass<WrapperComponentProps<Props, State>>
    | SFC<WrapperComponentProps<Props, State>>,
  defaultStyles: DefaultStyleProps<State>
) {
  return class extends React.Component<
    WrapperComponentOriginProps<Props, State>
  > {
    static defaultProps = {
      customStyles: {}
    };

    getStyles = (key: string, props?: State): CSSObject => {
      if (!defaultStyles[key]) {
        return {};
      }

      const base =
        typeof defaultStyles[key] === "function"
          ? // @ts-ignore
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

export default withGetStyles;
