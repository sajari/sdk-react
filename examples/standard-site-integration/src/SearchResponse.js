import React from "react";

import {
  Response,
  Summary,
  Results,
  Paginator,
  ImageResult,
  Result
} from "sajari-react/ui/results";
import { TabsFacet } from "sajari-react/ui/facets";

import { values, pipeline, tracking } from "./resources";

const SearchResponse = ({ config, tabsFilter }) => {
  let tabs = null;
  if (config.tabFilters) {
    tabs = <TabsFacet tabs={config.tabFilters.tabs} filter={tabsFilter} />;
  }

  const results = config.results || {};
  const resultRenderer = results.showImages ? ImageResult : Result;
  return (
    <Response pipeline={pipeline}>
      {tabs}
      <Summary values={values} pipeline={pipeline} tracking={tracking} />
      <Results
        ResultRenderer={resultRenderer}
        values={values}
        pipeline={pipeline}
        tracking={tracking}
      />
      <Paginator values={values} pipeline={pipeline} tracking={tracking} />
    </Response>
  );
};

export default SearchResponse;
