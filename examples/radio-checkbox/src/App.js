import React from "react";

import { Client, Tracking } from "sajari";

import {
  Filter,
  CombineFilters,
  Pipeline,
  Values
} from "sajari-react/controllers";
import {
  DebugFacet,
  SelectFacet,
  RadioFacet,
  CheckboxFacet
} from "sajari-react/ui/facets";
import { Response, Results, Summary, Paginator } from "sajari-react/ui/results";

const project = "sajariptyltd";
const collection = "sajari-com";
const pipelineName = "website";

const values = new Values();
const client = new Client(project, collection);

const tracking = new Tracking();
const pipeline = new Pipeline(client, pipelineName);

const currentUnix = parseInt(String(new Date().getTime() / 1000), 10);
const day = 24 * 60 * 60;
const lastWeek = currentUnix - 7 * day;
const lastMonth = currentUnix - 30 * day;

const recencyFilter = new Filter(
  {
    last7: `firstseen>'${lastWeek}'`,
    last30: `firstseen>'${lastMonth}'`,
    all: ""
  },
  "all"
);

const categoryFilter = new Filter(
  {
    articles: "dir1='article'",
    blog: "dir1='blog'",
    faq: "dir1='faq'"
  },
  ["articles", "faq"],
  true
);

const filter = CombineFilters([recencyFilter, categoryFilter]);
values.set({ filter: () => filter.filter() });
filter.listen(() => {
  pipeline.search(values, tracking);
});

const App = () =>
  <div className="App">
    <div className="filter">
      <SelectFacet
        filter={recencyFilter}
        options={{
          all: "All",
          last7: "Last 7 Days",
          last30: "Last 30 Days"
        }}
      />
      <h3>Recency</h3>
      <div>
        <RadioFacet filter={recencyFilter} name="last7" />
        <label>Last 7 Days</label>
      </div>
      <div>
        <RadioFacet filter={recencyFilter} name="last30" />
        <label>Last 30 Days</label>
      </div>
      <div>
        <RadioFacet filter={recencyFilter} name="all" />
        <label>All</label>
      </div>
      <div>
        <p>
          <strong>Filter:</strong> <DebugFacet filter={recencyFilter} />
        </p>
      </div>
    </div>
    <div className="filter">
      <h3>Category</h3>
      <div>
        <CheckboxFacet filter={categoryFilter} name="articles" />
        <label>Articles</label>
      </div>
      <div>
        <CheckboxFacet filter={categoryFilter} name="blog" />
        <label>Blog</label>
      </div>
      <div>
        <CheckboxFacet filter={categoryFilter} name="faq" />
        <label>Faq</label>
      </div>
      <div>
        <p>
          <strong>Filter:</strong> <DebugFacet filter={categoryFilter} />
        </p>
      </div>
    </div>
    <div>
      <p>
        <strong>Combined Filter:</strong> <DebugFacet filter={filter} />
      </p>
    </div>
    <Response pipeline={pipeline}>
      <Summary values={values} pipeline={pipeline} tracking={tracking} />
      <Results pipeline={pipeline} />
      <Paginator values={values} pipeline={pipeline} tracking={tracking} />
    </Response>
  </div>;

export default App;
