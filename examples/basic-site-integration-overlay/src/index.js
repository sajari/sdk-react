import React from "react";
import ReactDOM from "react-dom";

import Analytics from "sajari-react/pipeline/analytics";
import { State } from "sajari-react/pipeline/state";

import loaded from "./loaded";
import Overlay from "./Overlay";
import InPage from "./InPage";
import SearchResponse from "./SearchResponse";
import stateProxy from "./stateProxy";

import "./styles.css";

const ESCAPE_KEY_CODE = 27;

const _state = State.default();

const error = message => {
  if (console && console.error) {
    console.error(message);
  }
};

const checkConfig = () => {
  const config = window._sjui.config;
  if (!config) {
    error('global value "window._sjui.config" not found');
    return false;
  }
  if (!config.project) {
    error("'project' not set in config");
    return false;
  }
  if (!config.collection) {
    error("'collection' not set in config");
    return false;
  }
  if (!config.pipeline) {
    error("'pipeline' not set in config");
    return false;
  }
  return true;
};

const initialiseStateValues = (config, firstTime) => {
  let initialValues = {};
  // Only include initial values the first time App is initialise0d
  if (config.initialValues && firstTime) {
    initialValues = config.initialValues;
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

  const combinedValues = {
    ...initialValues,
    ...tabValues,
    ...userValues
  };

  const isQueryValueSet = Boolean(combinedValues.q);
  _state.setValues(combinedValues, isQueryValueSet);
};

const initOverlay = config => {
  initialiseStateValues(config, true);

  const setOverlayControls = controls => {
    const show = () => {
      document.getElementsByTagName("body")[0].style.overflow = "hidden";
      initialiseStateValues(config, false);
      controls.show();
    };
    const hide = () => {
      document.getElementsByTagName("body")[0].style.overflow = "";
      _state.reset();
      controls.hide();
    };
    window._sjui.overlay.show = show;
    window._sjui.overlay.hide = hide;
    return { show, hide };
  };

  let renderTarget = null;
  if (config.overlay) {
    // Create a container to render the overlay into
    const overlayContainer = document.createElement("div");
    overlayContainer.id = "sj-overlay-holder";
    document.body.appendChild(overlayContainer);

    // Set up global overlay values
    document.addEventListener("keydown", e => {
      if (e.keyCode === ESCAPE_KEY_CODE) {
        window._sjui.overlay.hide();
      }
    });

    renderTarget = overlayContainer;
  } else if (config.attachSearchBox && config.attachSearchResponse) {
    renderTarget = config.attachSearchBox;
  } else {
    error(
      "no render mode found, need to specify either overlay or attachSearchBox and attachSearchResponse in config"
    );
    return;
  }

  ReactDOM.render(
    <App
      config={config}
      setOverlayControls={setOverlayControls}
      setupInPageResults={setupInPageResults}
    />,
    renderTarget
  );
}

loaded(window, startInterface);
