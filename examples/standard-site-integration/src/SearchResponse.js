import React from "react";

import {
  Summary,
  Results,
  Paginator,
  ImageResult,
  Result
} from "sajari-react/ui/results";
import { TabsFacet } from "sajari-react/ui/facets";
import { responseUpdatedEvent } from "sajari-react/controllers";

import { values, pipeline, tracking } from "./resources";

class SearchResponse extends React.Component {
  constructor(props) {
    super(props);

    this.state = { response: pipeline.getResponse() };
  }

  componentDidMount() {
    this.removeResponseListener = pipeline.listen(
      responseUpdatedEvent,
      this.responseUpdated
    );
  }

  componentWillUnmount() {
    this.removeResponseListener();
  }

  responseUpdated = () => {
    this.setState({ response: pipeline.getResponse() });
  };

  render() {
    const { config, tabsFilter } = this.props;
    const { response } = this.state;

    if (response.isEmpty() || !response.getQueryValues().q) {
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
