import React from 'react'

import AutocompleteInput from 'sajari-react/pipeline/AutocompleteInput'
import { Response,  Summary, Results, Paginator } from 'sajari-react/pipeline/Response'
import Analytics from 'sajari-react/pipeline/analytics'

import State from 'sajari-react/pipeline/state'

import './styles.css'

const _state = State.default();

class SingleApp extends React.Component {
  componentDidMount() {
    _state.setProject(this.props.config.project);
    _state.setCollection(this.props.config.collection);
    _state.setPipeline(this.props.config.pipeline);

    if (this.props.config.values) {
      _state.setValues(this.props.config.values, !!this.props.config.values.q);
    }

    if (!this.props.config.disableGA) {
      new Analytics(_state);
    }
  }

  render() {
    const { searchBox, searchBoxPlaceHolder } = this.props.config

    return (
      <div>
        {searchBox ? <AutocompleteInput placeHolder={searchBoxPlaceHolder} /> : null}
        <Response>
          <Summary />
          <Results />
          <Paginator />
        </Response>
      </div>
    )
  }
}

class SplitAppSearch extends React.Component {
  componentDidMount() {
    _state.setProject(this.props.config.project);
    _state.setCollection(this.props.config.collection);
    _state.setPipeline(this.props.config.pipeline);

    if (this.props.config.values) {
      _state.setValues(this.props.config.values, !!this.props.config.values.q);
    }

    if (!this.props.config.disableGA) {
      new Analytics(_state);
    }
  }

  render() {
    const { searchBoxPlaceHolder } = this.props.config
    
    return <AutocompleteInput placeHolder={searchBoxPlaceHolder} />
  }
}

const SplitAppResponse = () => (
  <Response>
    <Summary />
    <Results />
    <Paginator />
  </Response>
)

export { SingleApp, SplitAppSearch, SplitAppResponse }
