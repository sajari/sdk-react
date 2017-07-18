import Pipeline from "sajari-react/state/pipeline";
import Values from "sajari-react/state/values";
import { Filter, andFilter } from "sajari-react/state/filter";

import { Client, Tracking } from "sajari";

let client;
let pipeline;
let values;
let filter;

const initialiseResources = (project, collection, pipelineName) => {
  values = new Values();
  client = new Client(project, collection);
  pipeline = new Pipeline(client, pipelineName, values, new Tracking());
  filter = new Filter(andFilter);
  values.set({ filter: () => filter.evaluate() });
};

export { initialiseResources, client, pipeline, values, filter };
