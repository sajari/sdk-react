import React from 'react'

import AutocompleteInput from 'sajari-react/pipeline/AutocompleteInput'
import { Response,  Summary, Results, Paginator } from 'sajari-react/pipeline/Response'
import Tabs from 'sajari-react/pipeline/Tabs'
import Analytics from 'sajari-react/pipeline/analytics'


import { State } from 'sajari-react/pipeline/state'

import './styles.css'

const _state = State.default();

const SearchInterface = ({config}) => (
  <div>
    <SearchBox config={config} />
    <SearchResponse config={config} />
  </div>
)

class SearchBox extends React.Component {
  componentDidMount() {
    _state.setProject(this.props.config.project);
    _state.setCollection(this.props.config.collection);
    _state.setPipeline(this.props.config.pipeline);

    const tabValues = {};
    if (this.props.config.tabFilters) {
      this.props.config.tabFilters.tabs.forEach(t => {
        if (t.title === this.props.config.tabFilters.defaultTab) {
          tabValues.filter = t.filter;
        }
      });
    }

    const stateValues = {
      ...this.props.config.values,
      ...tabValues
    };

    _state.setValues(stateValues, Boolean(stateValues.q));

    if (!this.props.config.disableGA) {
      new Analytics("default");
    }
  }

  render() {
    const { searchBoxPlaceHolder } = this.props.config
    return <AutocompleteInput placeHolder={searchBoxPlaceHolder} />
  }
}

const SearchResponse = ({ config }) => {
  let tabs = null;
  if (config.tabFilters) {
    tabs = <Tabs defaultTab={config.tabFilters.defaultTab} tabs={config.tabFilters.tabs} />
  }

  return (
    <Response>
      {tabs}
      <Summary />
      <Results showImages={config.showImages} />
      <Paginator />
    </Response>
  );
}

export { SearchInterface, SearchBox, SearchResponse }
