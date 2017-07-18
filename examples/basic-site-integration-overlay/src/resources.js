import Pipeline from "sajari-react/state/pipeline";
import Values, { changeEvent } from "sajari-react/state/values";
import { Filter, andFilter } from "sajari-react/state/filter";

import { Client, Tracking } from "sajari";

let client;
let pipeline;
let values;
let filter;

const initialiseResources = (project, collection, pipelineName) => {
  values = new Values();
  client = new Client(project, collection);
  const tracking = new Tracking();
  tracking.clickTokens("url");
  pipeline = new Pipeline(client, pipelineName, values, tracking);
  filter = new Filter(andFilter);

  values.set({ filter: () => filter.evaluate() });
  values.listen(changeEvent, (changes, set) => {
    if (!changes.page) {
      set({ page: "1" });
    }
  })
};

export { initialiseResources, client, pipeline, values, filter };
