import Pipeline from "sajari-react/controllers/pipeline";
import Values, { changeEvent } from "sajari-react/controllers/values";
import MultiFacet from "sajari-react/controllers/multiFacet";

import { Client, Tracking } from "sajari";

let client;
let pipeline;
let values;
let tracking;
let multiFacet;

const initialiseResources = (project, collection, pipelineName) => {
  values = new Values();
  client = new Client(project, collection);
  tracking = new Tracking();
  tracking.clickTokens("url");
  pipeline = new Pipeline(client, pipelineName, values, tracking);
  multiFacet = new MultiFacet({});

  values.listen(changeEvent, (changes, set) => {
    if (!changes.page) {
      set({ page: "1" });
    }
  })
};

export { initialiseResources, client, pipeline, values, tracking, multiFacet };
