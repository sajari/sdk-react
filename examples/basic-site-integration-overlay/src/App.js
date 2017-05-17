import React from "react";

import { Overlay as OverlayFrame, Close } from "sajari-react/ui/Overlay";
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

let performedInitialSearch = false;

class SearchBox extends React.Component {
  componentDidMount() {
    _state.setProject(this.props.config.project);
    _state.setCollection(this.props.config.collection);
    _state.setPipeline(this.props.config.pipeline);

    if (this.props.config.values) {
      if (this.props.config.values.q && !performedInitialSearch) {
        // If there is a query and we haven't performed the page load search
        // - perform it now.
        _state.setValues(this.props.config.values, true);
        performedInitialSearch = true;
      } else {
        // If we've already performed the page load search
        // - Don't prefil the query text and don't search on open.
        _state.setValues(
          {
            ...this.props.config.values,
            q: undefined
          },
          false
        );
      }
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
    <Response className="sj-search-response">
      {tabs}
      <Summary />
      <Results showImages={config.showImages} />
      <Paginator />
    </Response>
  );
};

class Overlay extends React.Component {
  componentDidMount() {
    document.addEventListener("keydown", e => {
      // Check for escape key
      if (e.keyCode === 27) {
        this.props.closeOverlay();
      }
    });
  }

  render() {
    const { config, closeOverlay } = this.props;
    return (
      <OverlayFrame>
        <div className="sj-logo" onClick={closeOverlay} />
        <SearchBox config={config} />
        <Close onClick={closeOverlay} />
        <SearchResponse config={config} />
      </OverlayFrame>
    );
  }
}

export default Overlay;
