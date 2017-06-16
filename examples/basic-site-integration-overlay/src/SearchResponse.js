import React from "react";

import {
  Response,
  Summary,
  Results,
  Paginator
} from "sajari-react/pipeline/Response";
import Tabs from "sajari-react/pipeline/Tabs";

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

  const showImages = config.results ? config.results.showImages : false;

  return (
    <Response>
      {tabs}
      <Summary />
      <Results showImages={showImages} />
      <Paginator />
    </Response>
  );
};

export default SearchResponse;
