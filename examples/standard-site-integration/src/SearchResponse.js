import React from "react";

import { Response, Summary, Results, Paginator } from "sajari-react/ui/results";
import { TabsFacet } from "sajari-react/ui/facets";

import { values, pipeline, tracking } from "./resources";

const Placeholder = ({ renderPlaceholder }) => {
  if (renderPlaceholder) {
    return (
      <div id="sj-results-placeholder">
        {renderPlaceholder(React)}
      </div>
    );
  }
  return <div id="sj-results-placeholder" />;
};

const SearchResponse = ({ config, tabsFilter }) => {
  let tabs = null;
  if (config.tabFilters) {
    tabs = <TabsFacet tabs={config.tabFilters.tabs} filter={tabsFilter} />;
  }

  const results = config.results || {};

  const placeholder = () =>
    <Placeholder renderPlaceholder={results.renderPlaceholder} />;

  return (
    <Response Placeholder={placeholder} pipeline={pipeline}>
      {tabs}
      <Summary values={values} pipeline={pipeline} tracking={tracking} />
      <Results
        showImages={results.showImages}
        values={values}
        pipeline={pipeline}
      />
      <Paginator values={values} pipeline={pipeline} tracking={tracking} />
    </Response>
  );
};

export default SearchResponse;
