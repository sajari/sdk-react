import React, { Component } from "react";

import singleFacetBuilder from "sajari-react/controllers/singleFacetBuilder";
import multiFacetBuilder from "sajari-react/controllers/multiFacetBuilder";

import { CheckboxFacet, RadioFacet } from "sajari-react/ui/facets/Input";
import { DebugFacet } from "sajari-react/ui/facets/Debug";

const recency = {
  last7: "firstseen<='RECENT_TIMESTAMP'",
  all: ""
};
const SFB = new singleFacetBuilder(recency);

const categories = {
  articles: "dir1='article'",
  blog: "dir1='blog'",
  faq: "dir1='faq'"
};
const MFB = new multiFacetBuilder(categories, ["articles", "faq"]);

class App extends Component {
  render() {
    return (
      <div className="App">
        <div>
          <h3>Recency</h3>
          <label>Last 7 Days</label>
          <RadioFacet fb={SFB} name="last7" />
          <br />
          <label>All</label>
          <RadioFacet fb={SFB} name="all" />
          <DebugFacet fb={SFB} />
        </div>
        <div>
          <h3>Category</h3>
          <label>Articles</label>
          <CheckboxFacet fb={MFB} name="articles" />
          <br />
          <label>Blog</label>
          <CheckboxFacet fb={MFB} name="blog" />
          <br />
          <label>Faq</label>
          <CheckboxFacet fb={MFB} name="faq" />
          <DebugFacet fb={MFB} />
        </div>
      </div>
    );
  }
}

export default App;
