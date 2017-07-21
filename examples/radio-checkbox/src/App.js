import React from "react";

import { Client, Tracking } from "sajari";

import {
  Filter,
  multiFacet,
  singleFacet,
  Pipeline
} from "sajari-react/controllers";
import { Debug, Input } from "sajari-react/ui/facets";
import Values from "sajari-react/controllers/values";
import { Response, Results, Summary, Paginator } from "sajari-react/ui/results";

const project = "sajariptyltd";
const collection = "sajari-com";
const pipelineName = "website";

const values = new Values();
const client = new Client(project, collection);

const tracking = new Tracking();
const pipeline = new Pipeline(client, pipelineName, values, tracking);

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
  pipeline.search();
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
  pipeline.search();
});

const App = () =>
  <div className="App">
    <div>
      <Input.SelectFacet
        fb={recencyFacet}
        name="foo"
        options={{
          All: "all",
          "Last 7 Days": "last7",
          "Last 30 Days": "last30"
        }}
      />
      <h3>Recency</h3>
      <div>
        <Input.RadioFacet fb={recencyFacet} name="last7" />
        <label>Last 7 Days</label>
      </div>
      <div>
        <Input.RadioFacet fb={recencyFacet} name="last30" />
        <label>Last 30 Days</label>
      </div>
      <div>
        <Input.RadioFacet fb={recencyFacet} name="all" />
        <label>All</label>
      </div>
      <Debug.DebugFacet fb={recencyFacet} />
    </div>
    <div>
      <h3>Category</h3>
      <div>
        <Input.CheckboxFacet fb={categoryFacet} name="articles" />
        <label>Articles</label>
      </div>
      <div>
        <Input.CheckboxFacet fb={categoryFacet} name="blog" />
        <label>Blog</label>
      </div>
      <div>
        <Input.CheckboxFacet fb={categoryFacet} name="faq" />
        <label>Faq</label>
      </div>
      <Debug.DebugFacet fb={categoryFacet} />
    </div>
    <Response pipeline={pipeline}>
      <Summary values={values} />
      <Results />
      <Paginator values={values} pipeline={pipeline} />
    </Response>
  </div>;

export default App;
