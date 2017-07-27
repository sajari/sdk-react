import React from "react";
import ReactDOM from "react-dom";

import { Analytics } from "sajari-react/analytics";
import {
  Filter,
  CombineFilters,
  valuesChangedEvent,
  initWebsiteTracking
} from "sajari-react/controllers";

import loaded from "./loaded";
import Overlay from "./Overlay";
import InPage from "./InPage";
import SearchResponse from "./SearchResponse";

import {
  initialiseResources,
  pipeline,
  values,
  tracking,
  client
} from "./resources";

import "sajari-react/ui/overlay/Overlay.css";
import "sajari-react/ui/text/AutocompleteInput.css";
import "sajari-react/ui/facets/Tabs.css";
import "sajari-react/ui/results/Results.css";
import "sajari-react/ui/results/Paginator.css";

const ESCAPE_KEY_CODE = 27;

let disableTabFacetSearch = false;

let filter;
let tabsFilter;
let initialFilter;

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
      controls.show();
    };
    const hide = () => {
      document.getElementsByTagName("body")[0].style.overflow = "";
      values.set({ q: undefined, "q.override": undefined });
      pipeline.clearResults();
      if (config.tabFilters.defaultTab) {
        disableTabFacetSearch = true;
        tabsFilter.set(config.tabFilters.defaultTab);
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
    <Overlay
      config={config}
      setOverlayControls={setOverlayControls}
      tabsFilter={tabsFilter}
    />,
    overlayContainer
  );
};

const initInPage = (config, tabsFilter) => {
  ReactDOM.render(<InPage config={config} />, config.attachSearchBox);
  ReactDOM.render(
    <SearchResponse config={config} tabsFilter={tabsFilter} />,
    config.attachSearchResponse
  );
};

const initInterface = () => {
  if (!checkConfig()) {
    return;
  }

  const config = window._sjui.config;

  const noOverlay = () => error("no overlay exists");
  window._sjui.overlay = { show: noOverlay, hide: noOverlay };

  initialiseResources(config.project, config.collection, config.pipeline);

  let analytics;
  if (!config.disableGA) {
    analytics = new Analytics(pipeline, tracking);
  }

  initWebsiteTracking(values, tracking);

  window._sjui.controllers = {
    analytics,
    client,
    values,
    pipeline,
    tracking,
    filter
  };

  if (config.tabFilters && config.tabFilters.defaultTab) {
    const opts = {};
    config.tabFilters.tabs.forEach(t => {
      opts[t.title] = t.filter;
    });
    tabsFilter = new Filter(opts, [config.tabFilters.defaultTab]);
    tabsFilter.listen(() => {
      // Perform a search when the tabs change
      if (!disableTabFacetSearch) {
        pipeline.search(values, tracking);
      }
    });

    values.listen(valuesChangedEvent, changes => {
      // If the query is empty, reset the tab back to the default if it's not already
      if (
        !values.get().q &&
        tabsFilter.get() !== config.tabFilters.defaultTab
      ) {
        disableTabFacetSearch = true;
        tabsFilter.set(config.tabFilters.defaultTab);
        disableTabFacetSearch = false;
      }
    });
  }

  const queryValues = combinedValues(config, true);
  if (queryValues.filter) {
    initialFilter = new Filter(
      {
        initialFilter: queryValues.filter
      },
      "initialFilter"
    );
    delete queryValues.filter;
  }
  values.set(queryValues);

  filter = new CombineFilters([tabsFilter, initialFilter].filter(Boolean));
  values.set({ filter: () => filter.filter() });

  const query = Boolean(queryValues.q);
  if (query) {
    pipeline.search(values, tracking);
  }

  if (config.overlay) {
    initOverlay(config);
    if (query) {
      window._sjui.overlay.show();
    }
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
