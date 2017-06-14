import React from "react";

import Analytics from "sajari-react/pipeline/analytics";

import { State } from "sajari-react/pipeline/state";

import Overlay from "./Overlay";
import InPage from "./InPage";

import stateProxy from "./stateProxy";

import "./styles.css";

const _state = State.default();

const getUrlParam = e => {
  const t = new RegExp(
    "[?&]" + e.replace(/[[\]]/g, "\\$&") + "(=([^&#]*)|&|#|$)"
  );
  const a = t.exec(window.location.href);
  return a && a[2] ? decodeURIComponent(a[2].replace(/\+/g, " ")) : "";
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.initialiseValues = this.initialiseValues.bind(this);
  }

  componentDidMount() {
    window._sjui.state = stateProxy;

    this.initialiseValues(true);

    if (!this.props.config.disableGA) {
      new Analytics("default");
    }
  }

  initialiseValues(firstTime) {
    const config = this.props.config;

    _state.setProject(config.project);
    _state.setCollection(config.collection);
    _state.setPipeline(config.pipeline);

    let fields = "title,description,url";
    if (config.showImages) {
      fields += ",image";
    }

    const tabValues = {};
    // Set the initial tab filter
    if (config.tabFilters && config.tabFilters.defaultTab) {
      config.tabFilters.tabs.forEach(t => {
        if (t.title === config.tabFilters.defaultTab) {
          tabValues.filter = t.filter;
        }
      });
    }

    const userValues = config.values;

    // Only include initial values the first time App is initialise0d
    const initialValues = config.initialValues && firstTime
      ? config.initialValues
      : {};

    const combinedValues = {
      fields,
      ...tabValues,
      ...userValues,
      ...initialValues
    };

    // Perform a search on load if there is a query param supplied
    const performSearch = Boolean(combinedValues.q);
    _state.setValues(combinedValues, performSearch);
  }

  render() {
    const config = this.props.config;
    const isOverlay = config.overlay;

    return isOverlay
      ? <Overlay config={config} initialiseValues={this.initialiseValues} />
      : <InPage config={config} />;
  }
}

export default App;
