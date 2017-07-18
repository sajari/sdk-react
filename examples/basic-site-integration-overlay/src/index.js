import React from "react";
import ReactDOM from "react-dom";

import Analytics from "sajari-react/pipeline/analytics";
// import { State } from "sajari-react/pipeline/state";

import loaded from "./loaded";
import Overlay from "./Overlay";
import InPage from "./InPage";
import SearchResponse from "./SearchResponse";
import stateProxy from "./stateProxy";

import { changeEvent } from "sajari-react/state/values";

import { initialiseResources, pipeline, values, filter } from "./resources";

import "./styles.css";

const ESCAPE_KEY_CODE = 27;

// const _state = State.default();

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

const combinedValues = (config, firstTime) => {
  let initialValues = {};
  // Only include initial values the first time App is initialised
  if (config.initialValues && firstTime) {
    initialValues = config.initialValues;
  }

  // const tabValues = {};
  // Set the initial tab filter
  if (config.tabFilters && config.tabFilters.defaultTab) {
    config.tabFilters.tabs.forEach(t => {
      if (t.title === config.tabFilters.defaultTab) {
        filter.setFilter("tab", t.filter);
      }
    });
  }

  const combinedValues = {
    ...initialValues,
    ...config.values
  };
  return combinedValues;
};

const initOverlay = config => {
  const setOverlayControls = controls => {
    const show = () => {
      document.getElementsByTagName("body")[0].style.overflow = "hidden";

      // _state.setValues(combinedValues(config, false));
      controls.show();
    };
    const hide = () => {
      document.getElementsByTagName("body")[0].style.overflow = "";
      // _state.reset();
      values.set({ q: undefined, "q.override": undefined });
      pipeline.clearResults();
      controls.hide();
    };
    window._sjui.overlay.show = show;
    window._sjui.overlay.hide = hide;
    return { show, hide };
  };

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

  ReactDOM.render(
    <Overlay config={config} setOverlayControls={setOverlayControls} />,
    overlayContainer
  );

  const queryValues = combinedValues(config, true);
  if (queryValues.filter) {
    filter.setFilter("dictionary", queryValues.filter);
    delete queryValues.filter;
  }
  values.set(queryValues);

  const query = Boolean(queryValues.q);
  if (query) {
    pipeline.search();
    window._sjui.overlay.show();
  }
};

const initInPage = config => {
  ReactDOM.render(<InPage config={config} />, config.attachSearchBox);
  ReactDOM.render(
    <SearchResponse config={config} />,
    config.attachSearchResponse
  );

  const queryValues = combinedValues(config, true);
  if (queryValues.filter) {
    filter.setFilter("dictionary", queryValues.filter);
    delete queryValues.filter;
  }
  values.set(queryValues);

  const query = Boolean(queryValues.q);
  if (query) {
    pipeline.search();
  }
};

const initInterface = () => {
  if (!checkConfig()) {
    return;
  }

  const config = window._sjui.config;

  const noOverlay = () => error("no overlay exists");
  window._sjui.overlay = { show: noOverlay, hide: noOverlay };

  window._sjui.state = stateProxy;

  initialiseResources(config.project, config.collection, config.pipeline)

  if (!config.disableGA) {
    new Analytics(pipeline, values);
  }

  if (config.tabFilters && config.tabFilters.defaultTab) {
    let defaultTabFilter = "";
    config.tabFilters.tabs.forEach(t => {
      if (t.title === config.tabFilters.defaultTab) {
        defaultTabFilter = t.filter;
      }
    })
    values.listen(changeEvent, (changes, set) => {
      if (!values.get().q && filter.getFilter("tab") !== defaultTabFilter) {
        filter.setFilter("tab", defaultTabFilter);
      }
    });
  }

  if (config.overlay) {
    initOverlay(config);
    return;
  }
  if (config.attachSearchBox && config.attachSearchResponse) {
    initInPage(config);
    return;
  }
  error(
    "no render mode found, need to specify either overlay or attachSearchBox and attachSearchResponse in config"
  );
};

loaded(window, initInterface);
