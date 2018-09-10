import * as React from "react";
import { Provider } from "../components";
import { Pipeline, Values } from "../controllers";

export const GeneralWrapper: React.SFC = ({ children }) => {
  let pipeline = new Pipeline(
    {
      project: "sajariptyltd",
      collection: "sajari-com"
    },
    "website"
  );
  let values = new Values({ q: "api", resultsPerPage: 5 });

  return (
    <Provider search={{ pipeline, values }} searchOnLoad>
      {children}
    </Provider>
  );
};

export const ExampleWrapper: React.SFC = ({ children }) => {
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
  style?: React.CSSProperties;
}

export const InputWrapper: React.SFC<InputWrapperProps> = ({
  children,
  style
}) => {
  let pipeline = new Pipeline(
    { project: "sajariptyltd", collection: "sajari-com" },
    "website"
  );
  let values = new Values({ resultsPerPage: 3 });

  return (
    <Provider search={{ pipeline, values }}>
      <div style={style}>{children}</div>
    </Provider>
  );
};
