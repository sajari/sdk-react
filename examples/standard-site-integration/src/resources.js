import Pipeline from "sajari-react/controllers/pipeline";
import Values, { changeEvent } from "sajari-react/controllers/values";
import { ANDFilter } from "sajari-react/controllers/filter";

import { Client, Tracking } from "sajari";

let client;
let pipeline;
let values;
let filter;
let tracking

const initialiseResources = (project, collection, pipelineName) => {
  values = new Values();
  client = new Client(project, collection);
  tracking = new Tracking();
  tracking.clickTokens("url");
  pipeline = new Pipeline(client, pipelineName, values, tracking);
  filter = new ANDFilter();

  values.set({ filter: () => filter.evaluate() });
  values.listen(changeEvent, (changes, set) => {
    if (!changes.page) {
      set({ page: "1" });
    }
  })
};

export { initialiseResources, client, pipeline, values, filter, tracking };
