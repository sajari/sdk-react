import React from "react";

import {
  Response,
  Summary,
  Results,
  Paginator
} from "sajari-react/pipeline/Response";
import Tabs from "sajari-react/pipeline/Tabs";

import { values, pipeline, filter } from "./resources";

const Placeholder = ({ renderPlaceholder }) => {
  if (renderPlaceholder) {
    return <div id="sj-results-placeholder">{renderPlaceholder(React)}</div>;
  }
  return <div id="sj-results-placeholder" />;
};

const SearchResponse = ({ config }) => {
  let tabs = null;
  if (config.tabFilters) {
    tabs = (
      <Tabs
        defaultTab={config.tabFilters.defaultTab}
        tabs={config.tabFilters.tabs}
        values={values}
        pipeline={pipeline}
        filter={filter}
      />
    );
  }

  const results = config.results || {};

  const placeholder = () =>
    <Placeholder renderPlaceholder={results.renderPlaceholder} />;

  return (
    <Response Placeholder={placeholder} pipeline={pipeline}>
      {tabs}
      <Summary values={values} pipeline={pipeline} />
      <Results showImages={results.showImages} values={values} pipeline={pipeline} />
      <Paginator values={values} pipeline={pipeline} />
    </Response>
  );
};

export default SearchResponse;
