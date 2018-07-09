import * as React from "react";
import { Provider } from "../components";
import { NoTracking, Pipeline, Values } from "../controllers";

const pipeline = new Pipeline(
  {
    project: "sajariptyltd",
    collection: "sajari-com"
  },
  "website",
  new NoTracking()
);
const values = new Values({ q: "api", resultsPerPage: 3 });

export const Wrapper = ({ children }: { [k: string]: any }) => (
  <Provider search={{ pipeline, values }}>{children}</Provider>
);

export default Wrapper;
