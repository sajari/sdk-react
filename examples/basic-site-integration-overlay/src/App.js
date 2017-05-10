import React from "react";

import { connect } from "react-redux";

import { Overlay as OverlayFrame, Close } from "sajari-react/ui/Overlay";
import { setActive } from "sajari-react/ui/actions/Overlay";
import AutocompleteInput from "sajari-react/pipeline/AutocompleteInput";
import {
  Response,
  Summary,
  Results,
  Paginator
} from "sajari-react/pipeline/Response";
import Tabs from "sajari-react/pipeline/Tabs";
import Analytics from "sajari-react/pipeline/analytics";

import { State } from "sajari-react/pipeline/state";

import "./styles.css";

const _state = State.default();

const SearchInterface = ({ config }) => (
  <div>
    <div className="sj-logo"/>
    <SearchBox config={config} />
    <Close />
    <SearchResponse config={config} />
  </div>
);

class SearchBox extends React.Component {
  componentDidMount() {
    _state.setProject(this.props.config.project);
    _state.setCollection(this.props.config.collection);
    _state.setPipeline(this.props.config.pipeline);

    if (this.props.config.values) {
      _state.setValues(this.props.config.values, !!this.props.config.values.q);
    }

    if (!this.props.config.disableGA) {
      new Analytics("default");
    }
  }

  render() {
    const { searchBoxPlaceHolder } = this.props.config;
    return <AutocompleteInput placeHolder={searchBoxPlaceHolder} />;
  }
}

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

  return (
    <Response>
      {tabs}
      <Summary />
      <Results showImages={config.showImages} />
      <Paginator />
    </Response>
  );
};

class overlay extends React.Component {
  componentDidMount() {
    document.addEventListener("keydown", e => {
      // Check for escape key
      if (e.keyCode === 27) {
        this.props.closeOverlay();
      }
    });
  }

  render() {
    return (
      <OverlayFrame>
        <SearchInterface config={this.props.config} />
      </OverlayFrame>
    );
  }
}

const Overlay = connect(null, dispatch => ({
  closeOverlay: () => dispatch(setActive(false))
}))(overlay);

export default Overlay;
