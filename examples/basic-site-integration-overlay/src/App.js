import React from "react";

import Analytics from "sajari-react/pipeline/analytics";

import { State } from "sajari-react/pipeline/state";

import Overlay from "./Overlay";
import InPage from "./InPage";

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
  componentDidMount() {
    const config = this.props.config;

    _state.setProject(config.project);
    _state.setCollection(config.collection);
    _state.setPipeline(config.pipeline);

    let fields = "title,description,url";
    if (config.showImages) {
      fields += ",image";
    }
    _state.setValues({ fields });

    let valuesFromParams = {};
    if (config.setValuesFromParams) {
      Object.keys(config.setValuesFromParams).forEach(k => {
        valuesFromParams[k] = getUrlParam(config.setValuesFromParams[k]);
      });
    }

    const userValues = config.values;

    const combinedValues = { ...userValues, ...valuesFromParams };

    // Perform a search on load if there is a query param supplied
    const performSearch = Boolean(combinedValues.q);
    _state.setValues(combinedValues, performSearch);

    if (!config.disableGA) {
      new Analytics("default");
    }
  }

  render() {
    const config = this.props.config;
    const isOverlay = config.overlay;

    return isOverlay ? <Overlay config={config} /> : <InPage config={config} />;
  }
}

export default App;
