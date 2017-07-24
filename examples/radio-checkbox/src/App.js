import React from "react";

import { Client, Tracking } from "sajari";

import { Filter, multiFacet, singleFacet, Pipeline } from "sajari-react/controllers";
import { DebugFacet, SelectFacet, RadioFacet, CheckboxFacet } from "sajari-react/ui/facets";
import Values from "sajari-react/controllers/values";
import { Response, Results, Summary, Paginator } from "sajari-react/ui/results";

const project = "sajariptyltd";
const collection = "sajari-com";
const pipelineName = "website";

const values = new Values();
const client = new Client(project, collection);

const tracking = new Tracking();
const pipeline = new Pipeline(client, pipelineName);

const filter = Filter.ANDFilter();
values.set({ filter: () => filter.evaluate() });

const currentUnix = parseInt(String(new Date().getTime() / 1000), 10);
const lastWeek = currentUnix - 7 * 24 * 60 * 60;
const lastMonth = currentUnix - 30 * 24 * 60 * 60;

const recencyFacet = new singleFacet(
  {
    last7: `firstseen>'${lastWeek}'`,
    last30: `firstseen>'${lastMonth}'`,
    all: ""
  },
  "all"
);
filter.setFilter("recency", recencyFacet.filter());
recencyFacet.register(() => {
  filter.setFilter("recency", recencyFacet.filter());
  pipeline.search(values, tracking);
});

const categoryFacet = new multiFacet(
  {
    articles: "dir1='article'",
    blog: "dir1='blog'",
    faq: "dir1='faq'"
  },
  ["articles", "faq"]
);
filter.setFilter("category", categoryFacet.filter());
categoryFacet.register(() => {
  filter.setFilter("category", categoryFacet.filter());
  pipeline.search(values, tracking);
});

const App = () =>
  <div className="App">
    <div>
      <SelectFacet
        fb={recencyFacet}
        name="foo"
        options={{
          all: "All",
          last7: "Last 7 Days",
          last30: "Last 30 Days"
        }}
      />
      <h3>Recency</h3>
      <div>
        <RadioFacet fb={recencyFacet} name="last7" />
        <label>Last 7 Days</label>
      </div>
      <div>
        <RadioFacet fb={recencyFacet} name="last30" />
        <label>Last 30 Days</label>
      </div>
      <div>
        <RadioFacet fb={recencyFacet} name="all" />
        <label>All</label>
      </div>
      <DebugFacet fb={recencyFacet} />
    </div>
    <div>
      <h3>Category</h3>
      <div>
        <CheckboxFacet fb={categoryFacet} name="articles" />
        <label>Articles</label>
      </div>
      <div>
        <CheckboxFacet fb={categoryFacet} name="blog" />
        <label>Blog</label>
      </div>
      <div>
        <CheckboxFacet fb={categoryFacet} name="faq" />
        <label>Faq</label>
      </div>
      <DebugFacet fb={categoryFacet} />
    </div>
    <Response pipeline={pipeline}>
      <Summary values={values} pipeline={pipeline} />
      <Results pipeline={pipeline} />
      <Paginator values={values} pipeline={pipeline} />
    </Response>
  </div>;

export default App;
