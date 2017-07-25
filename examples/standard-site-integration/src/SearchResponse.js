import React from "react";

import {
  Response,
  Summary,
  Results,
  Paginator
} from "sajari-react/ui/results";
import Tabs from "sajari-react/ui/facets/Tabs";

import { values, pipeline, tracking } from "./resources";

const Placeholder = ({ renderPlaceholder }) => {
  if (renderPlaceholder) {
    return <div id="sj-results-placeholder">{renderPlaceholder(React)}</div>;
  }
  return <div id="sj-results-placeholder" />;
};

const SearchResponse = ({ config, tabsFilter }) => {
  let tabs = null;
  if (config.tabFilters) {
    tabs = (
      <Tabs
        defaultTab={config.tabFilters.defaultTab}
        tabs={config.tabFilters.tabs}
        values={values}
        pipeline={pipeline}
        tracking={tracking}
        filter={tabsFilter}
      />
    );
  }

  const results = config.results || {};

  const placeholder = () =>
    <Placeholder renderPlaceholder={results.renderPlaceholder} />;

  return (
    <Response Placeholder={placeholder} pipeline={pipeline}>
      {tabs}
      <Summary values={values} pipeline={pipeline} tracking={tracking} />
      <Results showImages={results.showImages} values={values} pipeline={pipeline} />
      <Paginator values={values} pipeline={pipeline} tracking={tracking} />
    </Response>
  );
};

export default SearchResponse;
