import React from "react";

import { Pipeline, Values, valuesUpdatedEvent } from "sajari-react/controllers";
import { AutocompleteInput } from "sajari-react/ui/text";
import {
  Response,
  Results,
  Summary,
  Paginator,
  Result,
  Title,
  Description,
  URL
} from "sajari-react/ui/results";

import "sajari-react/ui/text/AutocompleteInput.css";
import "sajari-react/ui/results/Paginator.css";
import "sajari-react/ui/results/Results.css";

const pipeline = new Pipeline("sajariptyltd", "sajari-com", "website");

// Set the "fields" value to fetch the dir1 field in results.
const values = new Values({ fields: "title,description,url,dir1" });
values.listen(valuesUpdatedEvent, (changes, set) => {
  if (!changes.page) {
    set({ page: "1" });
  }
});

// BlogPostResult will be rendered for blog posts.
const BlogPostResult = ({ values, token, onResultClicked }) =>
  <div className="sj-result blog-post">
    <div className="sj-result-text">
      <div className="label">Blog Post</div>
      <Title
        title={values.title}
        url={values.url}
        token={token}
        resultClicked={onResultClicked}
      />
      <Description description={values.description} />
      <URL url={values.url} token={token} resultClicked={onResultClicked} />
    </div>
  </div>;

// CustomResult chooses between BlogPostResult and the default Result renderer.
const CustomResult = ({ values, token, onResultClicked }) => {
  if (values.dir1 === "blog") {
    return (
      <BlogPostResult
        values={values}
        token={token}
        onResultClicked={onResultClicked}
      />
    );
  }
  return (
    <Result values={values} token={token} onResultClicked={onResultClicked} />
  );
};

const App = () =>
  <div className="searchApp">
    <AutocompleteInput values={values} pipeline={pipeline} />
    <Response pipeline={pipeline} className="sj-pipeline-response">
      <Summary values={values} pipeline={pipeline} />
      <Results pipeline={pipeline} ResultRenderer={CustomResult} />
      <Paginator values={values} pipeline={pipeline} />
    </Response>
  </div>;

export default App;
