import React from "react";
import ReactDOM from "react-dom";

import Analytics from "sajari-react/analytics/analytics";
import SingleFacet from "sajari-react/controllers/singleFacet";

import loaded from "./loaded";
import Overlay from "./Overlay";
import InPage from "./InPage";
import SearchResponse from "./SearchResponse";

import { initialiseResources, pipeline, values, filter, tracking, client } from "./resources";

import "./styles.css";

const ESCAPE_KEY_CODE = 27;

let disableTabFacetSearch = false;

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

const initOverlay = (config, tabsFacet) => {
  const setOverlayControls = controls => {
    const show = () => {
      document.getElementsByTagName("body")[0].style.overflow = "hidden";
      controls.show();
    };
    const hide = () => {
      document.getElementsByTagName("body")[0].style.overflow = "";
      values.set({ q: undefined, "q.override": undefined });
      pipeline.clearResults();
      if (config.tabFilters.defaultTab) {
        disableTabFacetSearch = true;
        tabsFacet.set(config.tabFilters.defaultTab);
        disableTabFacetSearch = false;
      }
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
    <Overlay config={config} setOverlayControls={setOverlayControls} tabsFacet={tabsFacet} />,
    overlayContainer
  );

  const queryValues = combinedValues(config, true);
  if (queryValues.filter) {
    filter.setFilter("initialValues", queryValues.filter);
    delete queryValues.filter;
  }
  values.set(queryValues);

  const query = Boolean(queryValues.q);
  if (query) {
    pipeline.search(values, tracking);
    window._sjui.overlay.show();
  }
};

const initInPage = (config, tabsFacet) => {
  ReactDOM.render(<InPage config={config} />, config.attachSearchBox);
  ReactDOM.render(
    <SearchResponse config={config} tabsFacet={tabsFacet} />,
    config.attachSearchResponse
  );

  const queryValues = combinedValues(config, true);
  if (queryValues.filter) {
    filter.setFilter("initialValues", queryValues.filter);
    delete queryValues.filter;
  }
  values.set(queryValues);

  const query = Boolean(queryValues.q);
  if (query) {
    pipeline.search(values, tracking);
  }
};

const initInterface = () => {
  if (!checkConfig()) {
    return;
  }

  const config = window._sjui.config;

  const noOverlay = () => error("no overlay exists");
  window._sjui.overlay = { show: noOverlay, hide: noOverlay };

  initialiseResources(config.project, config.collection, config.pipeline)

  let analytics;
  if (!config.disableGA) {
    analytics = new Analytics(pipeline);
  }

  window._sjui.state = { analytics, client, values, pipeline, tracking, filter };

  let tabsFacet;
  if (config.tabFilters && config.tabFilters.defaultTab) {
    const facetOptions = {};
    config.tabFilters.tabs.forEach(t => {
      facetOptions[t.title] = t.filter;
    });
    tabsFacet = new SingleFacet(facetOptions, config.tabFilters.defaultTab);
    tabsFacet.register(() => {
      filter.setFilter("tab", tabsFacet.filter());
      if (!disableTabFacetSearch) {
        pipeline.search(values, tracking);
      }
    });
  }

  if (config.overlay) {
    initOverlay(config, tabsFacet);
    return;
  }
  if (config.attachSearchBox && config.attachSearchResponse) {
    initInPage(config, tabsFacet);
    return;
  }
  error(
    "no render mode found, need to specify either overlay or attachSearchBox and attachSearchResponse in config"
  );
};

loaded(window, initInterface);
