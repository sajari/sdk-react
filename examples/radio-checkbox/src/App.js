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
tracking.clickTokens("url");
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
      <h3>Recency</h3>
      <div>
        <label>Last 7 Days</label>
        <Input.RadioFacet fb={recencyFacet} name="last7" />
      </div>
      <div>
        <label>Last 30 Days</label>
        <Input.RadioFacet fb={recencyFacet} name="last30" />
      </div>
      <div>
        <label>All</label>
        <Input.RadioFacet fb={recencyFacet} name="all" />
      </div>
      <Debug.DebugFacet fb={recencyFacet} />
    </div>
    <div>
      <h3>Category</h3>
      <div>
        <label>Articles</label>
        <Input.CheckboxFacet fb={categoryFacet} name="articles" />
      </div>
      <div>
        <label>Blog</label>
        <Input.CheckboxFacet fb={categoryFacet} name="blog" />
      </div>
      <div>
        <label>Faq</label>
        <Input.CheckboxFacet fb={categoryFacet} name="faq" />
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
