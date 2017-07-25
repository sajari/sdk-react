import React from "react";

import { Filter, CombineFilters, Pipeline } from "sajari-react/controllers";
import Values, { changeEvent } from "sajari-react/controllers/values";
import { AutocompleteInput } from "sajari-react/ui/text";
import { Response, Results, Summary, Paginator } from "sajari-react/ui/results";
import { TabsFacet, RadioFacet } from "sajari-react/ui/facets";

import { Client, Tracking } from "sajari";

import "sajari-react/ui/Search.css";

const project = "sajariptyltd";
const collection = "sajari-com";
const pipelineName = "website";

const values = new Values();
const client = new Client(project, collection);
const tracking = new Tracking();
const pipeline = new Pipeline(client, pipelineName);

values.listen(changeEvent, (changes, set) => {
  if (!changes.page) {
    set({ page: "1" });
  }
});

const currentUnix = parseInt(String(new Date().getTime() / 1000), 10);
const day = 24 * 60 * 60;
const lastWeek = currentUnix - 7 * day;
const lastMonth = currentUnix - 30 * day;

const recency = new Filter(
  {
    last7: `firstseen>'${lastWeek}'`,
    last30: `firstseen>'${lastMonth}'`,
    all: ""
  },
  "all"
);

const tabsFilter = new Filter({
  All: "",
  Blog: "dir1='blog'",
  FAQ: "dir1='faq'"
}, "All");

const tabs = [
  { title: "All", filter: "" },
  { title: "Blog", filter: "dir1='blog'" },
  { title: "FAQ", filter: "dir1='faq'" }
];

const filter = CombineFilters([recency, tabsFilter]);
values.set({ filter: () => filter.filter() });
filter.register(() => {
  pipeline.search(values, tracking);
});

const App = () =>
  <div className="searchApp">
    <AutocompleteInput values={values} pipeline={pipeline} tracking={tracking} />
    <div>
      <RadioFacet fb={recency} name="last7" />
      <label>Last 7 Days</label>
    </div>
    <div>
      <RadioFacet fb={recency} name="last30" />
      <label>Last 30 Days</label>
    </div>
    <div>
      <RadioFacet fb={recency} name="all" />
      <label>All</label>
    </div>
    <Response pipeline={pipeline}>
      <TabsFacet
        tabs={tabs}
        fb={tabsFilter}
      />
      <Summary values={values} pipeline={pipeline} tracking={tracking} />
      <Results pipeline={pipeline} />
      <Paginator values={values} pipeline={pipeline} tracking={tracking} />
    </Response>
  </div>;

export default App;
