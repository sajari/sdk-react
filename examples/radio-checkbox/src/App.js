import React from "react";

import {
  Filter,
  selectionUpdatedEvent,
  CombineFilters,
  Pipeline,
  Values
} from "sajari-react/controllers";
import { RadioFacet, CheckboxFacet } from "sajari-react/ui/facets";
import { AutocompleteInput } from "sajari-react/ui/text";
import { Response, Results, Summary, Paginator } from "sajari-react/ui/results";

import "sajari-react/ui/text/AutocompleteInput.css";
import "sajari-react/ui/results/Paginator.css";
import "sajari-react/ui/results/Results.css";

const pipeline = new Pipeline("sajariptyltd", "sajari-com", "website");
const values = new Values();

const currentUnix = parseInt(String(new Date().getTime() / 1000), 10);
const lastDays = n => currentUnix - n * 24 * 60 * 60;

const recencyFilter = new Filter(
  {
    last7: `firstseen>'${lastDays(7)}'`,
    last30: `firstseen>'${lastDays(30)}'`,
    last90: `firstseen>'${lastDays(90)}'`,
    all: ""
  },
  "all"
);

const categoryFilter = new Filter(
  {
    blog: "dir1='blog'",
    faq: "dir1='faq'",
    other: "dir1!='blog' AND dir1!='faq'"
  },
  [],
  true
);

const filter = CombineFilters([recencyFilter, categoryFilter]);
values.set({ filter: () => filter.filter() });
filter.listen(selectionUpdatedEvent, () => {
  values.emitUpdated();
  pipeline.search(values.get());
});

const App = () =>
  <div className="searchApp">
    <div className="left">
      <div>
        <h3>Last Modified</h3>
        <div>
          <RadioFacet filter={recencyFilter} name="all" />
          <label>All</label>
        </div>
        <div>
          <RadioFacet filter={recencyFilter} name="last7" />
          <label>Last 7 Days</label>
        </div>
        <div>
          <RadioFacet filter={recencyFilter} name="last30" />
          <label>Last 30 Days</label>
        </div>
        <div>
          <RadioFacet filter={recencyFilter} name="last90" />
          <label>Last 90 Days</label>
        </div>
      </div>
      <div>
        <h3>Category</h3>
        <div>
          <CheckboxFacet filter={categoryFilter} name="blog" />
          <label>Blog</label>
        </div>
        <div>
          <CheckboxFacet filter={categoryFilter} name="faq" />
          <label>FAQ</label>
        </div>
        <div>
          <CheckboxFacet filter={categoryFilter} name="other" />
          <label>Other</label>
        </div>
      </div>
    </div>
    <div className="right">
      <AutocompleteInput pipeline={pipeline} values={values} />
      <Response pipeline={pipeline}>
        <Summary values={values} pipeline={pipeline} />
        <Results pipeline={pipeline} />
        <Paginator values={values} pipeline={pipeline} />
      </Response>
    </div>
  </div>;

export default App;
