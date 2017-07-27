import { Client, Tracking } from "sajari";

import { Values, valuesChangedEvent, Pipeline } from "sajari-react/controllers";

let client;
let pipeline;
let values;
let tracking;

const initialiseResources = (project, collection, pipelineName) => {
  values = new Values();
  client = new Client(project, collection);
  tracking = new Tracking();
  tracking.clickTokens("url");
  pipeline = new Pipeline(client, pipelineName, values, tracking);

  values.listen(valuesChangedEvent, (changes, set) => {
    if (!changes.page) {
      set({ page: "1" });
    }
  });
};

export { initialiseResources, client, pipeline, values, tracking };
