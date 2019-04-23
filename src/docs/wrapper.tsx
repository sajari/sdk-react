/** @jsx jsx */ jsx;
import { jsx } from "@emotion/core";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "../components";
import { Pipeline, Values } from "../controllers";
import { Theme } from "../components/styles";
import { CSSObject } from "@emotion/css";

export const GeneralWrapper: React.SFC = ({ children }) => {
  let pipeline = new Pipeline(
    {
      project: "sajariptyltd",
      collection: "sajari-com"
    },
    "website"
  );
  let values = new Values({ q: "api", resultsPerPage: 3 });

  return (
    <Provider search={{ pipeline, values }} searchOnLoad>
      {children}
    </Provider>
  );
};

export const ExampleWrapper: React.SFC = ({ children }) => {
  if (process.env.NODE_ENV !== "production") {
    var axe = require("react-axe");
    axe(React, ReactDOM, 1000);
  }

  let pipeline = new Pipeline(
    {
      project: "sajariptyltd",
      collection: "sajari-com"
    },
    "website"
  );
  let values = new Values({ resultsPerPage: 5 });

  return (
    <Provider search={{ pipeline, values }}>
      <div style={{ minHeight: 500 }}>{children}</div>
    </Provider>
  );
};

export interface InputWrapperProps {
  style?: CSSObject;
  theme?: Theme;
}

export const InputWrapper: React.SFC<InputWrapperProps> = ({
  children,
  style,
  theme
}) => {
  let pipeline = new Pipeline(
    { project: "sajariptyltd", collection: "sajari-com" },
    "website"
  );
  let values = new Values({ resultsPerPage: 3 });

  return (
    <Provider search={{ pipeline, values }} theme={theme}>
      <div css={style}>{children}</div>
    </Provider>
  );
};
