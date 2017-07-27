import React from "react";

import {
  Summary,
  Results,
  Paginator,
  ImageResult,
  Result
} from "sajari-react/ui/results";
import { TabsFacet } from "sajari-react/ui/facets";
import {
  resultsReceivedEvent,
  errorReceivedEvent
} from "sajari-react/controllers";

import { values, pipeline, tracking } from "./resources";

class SearchResponse extends React.Component {
  constructor(props) {
    super(props);

    this.state = { results: pipeline.getResults() || {} };
  }

  componentDidMount() {
    this.removeErrorListener = pipeline.listen(
      errorReceivedEvent,
      this.resultsChanged
    );
    this.removeResultsListener = pipeline.listen(
      resultsReceivedEvent,
      this.resultsChanged
    );
  }

  componentWillUnmount() {
    this.removeErrorListener();
    this.removeResultsListener();
  }

  resultsChanged = () => {
    this.setState({ results: pipeline.getResults() || {} });
  };

  render() {
    const { config, tabsFilter } = this.props;
    const { results } = this.state;

    if ((!results.time && !pipeline.getError()) || !values.get().q) {
      return null;
    }

    let tabs = null;
    if (config.tabFilters) {
      const tabsFacetMap = config.tabFilters.tabs.map(t => ({
        name: t.title,
        displayText: t.title
      }));
      tabs = <TabsFacet tabs={tabsFacetMap} filter={tabsFilter} />;
    }

    const resultsConfig = config.results || {};
    const resultRenderer = resultsConfig.showImages ? ImageResult : Result;
    return (
      <div className="sj-pipeline-response">
        {tabs}
        <Summary values={values} pipeline={pipeline} tracking={tracking} />
        <Results
          ResultRenderer={resultRenderer}
          values={values}
          pipeline={pipeline}
        />
        <Paginator values={values} pipeline={pipeline} tracking={tracking} />
      </div>
    );
  }
}

export default SearchResponse;
