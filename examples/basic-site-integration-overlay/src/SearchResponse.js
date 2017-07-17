import React from "react";

import {
  // Response,
  Summary,
  Results,
  Paginator
} from "sajari-react/pipeline/Response";
import Tabs from "sajari-react/pipeline/Tabs";

import { Response } from "./Response";

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
      />
    );
  }

  const results = config.results || {};

  const placeholder = () =>
    <Placeholder renderPlaceholder={results.renderPlaceholder} />;

  return (
    <Response Placeholder={placeholder}>
      {tabs}
      <Summary />
      <Results showImages={results.showImages} />
      <Paginator />
    </Response>
  );
};

export default SearchResponse;
