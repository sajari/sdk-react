import React from "react";

import {
  Filter,
  selectionUpdatedEvent,
  Pipeline,
  Values,
  valuesUpdatedEvent
} from "sajari-react/controllers";
import { AutocompleteInput } from "sajari-react/ui/text";
import { Response, Results, Summary, Paginator } from "sajari-react/ui/results";
import { TabsFacet } from "sajari-react/ui/facets";

import "sajari-react/ui/text/AutocompleteInput.css";
import "sajari-react/ui/results/Results.css";
import "sajari-react/ui/results/Paginator.css";
import "sajari-react/ui/facets/Tabs.css";

const pipeline = new Pipeline("sajariptyltd", "sajari-com", "website");
const values = new Values();

// Any change to values should reset the paginator back to page 1
values.listen(valuesUpdatedEvent, (changes, set) => {
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

tabsFilter.listen(selectionUpdatedEvent, () => {
  if (values.get()["q"]) {
    values.emitUpdated();
    pipeline.search(values.get());
  }
});

const App = () =>
  <div className="searchApp">
    <AutocompleteInput values={values} pipeline={pipeline} focus={true} />
    <Response pipeline={pipeline}>
      <TabsFacet tabs={tabs} filter={tabsFilter} />
      <Summary values={values} pipeline={pipeline} />
      <Results pipeline={pipeline} />
      <Paginator values={values} pipeline={pipeline} />
    </Response>
  </div>;

export default App;
