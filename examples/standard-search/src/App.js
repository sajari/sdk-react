import React from "react";

import {
  Filter,
  Pipeline,
  Values,
  valuesChangedEvent
} from "sajari-react/controllers";
import { AutocompleteInput } from "sajari-react/ui/text";
import { Response, Results, Summary, Paginator } from "sajari-react/ui/results";
import { TabsFacet } from "sajari-react/ui/facets";

import { Client, Tracking } from "sajari";

import "sajari-react/ui/text/AutocompleteInput.css";
import "sajari-react/ui/results/Results.css";
import "sajari-react/ui/results/Paginator.css";
import "sajari-react/ui/facets/Tabs.css";

const project = "sajariptyltd";
const collection = "sajari-com";
const pipelineName = "website";

const values = new Values();
const client = new Client(project, collection);
const tracking = new Tracking();
const pipeline = new Pipeline(client, pipelineName);

values.listen(valuesChangedEvent, (changes, set) => {
  if (!changes.page) {
    set({ page: "1" });
  }
});

const tabsFilter = new Filter(
  {
    All: "",
    Blog: "dir1='blog'",
    FAQ: "dir1='faq'"
  },
  "All"
);
values.set({ filter: () => tabsFilter.filter() });

const tabs = [
  { name: "All", displayText: "All" },
  { name: "Blog", displayText: "Blog" },
  { name: "FAQ", displayText: "FAQ" }
];

tabsFilter.listen(() => {
  if (values.get()["q"]) {
    values.emitChange();
    pipeline.search(values, tracking);
  }
});

const App = () =>
  <div className="searchApp">
    <AutocompleteInput
      values={values}
      pipeline={pipeline}
      tracking={tracking}
      focus={true}
    />
    <Response pipeline={pipeline}>
      <TabsFacet tabs={tabs} filter={tabsFilter} />
      <Summary values={values} pipeline={pipeline} tracking={tracking} />
      <Results pipeline={pipeline} tracking={tracking} />
      <Paginator values={values} pipeline={pipeline} tracking={tracking} />
    </Response>
  </div>;

export default App;
