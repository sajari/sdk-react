import * as React from "react";
import { Consumer } from "./context";

export const Response: React.SFC = ({ children }) => (
  <Consumer>
    {({ search: { response } }) => {
      if (response === null || response === undefined || response.isEmpty()) {
        return null;
      }
      return children;
    }}
  </Consumer>
);
