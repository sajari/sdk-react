import React from "react";
import ReactDOM from "react-dom";

import loaded from "./loaded";

import App from "./App";

const error = message => {
  if (console && console.error) {
    console.error(message);
  }
};

function startInterface() {
  const config = window._sjui.config;
  if (!config) {
    error(
      'global value "_sjui" not found, please check the code snippet for your Sajari search interface'
    );
    return;
  }
  if (!config.project) {
    error("project value in config not set, must be set");
    return;
  }
  if (!config.collection) {
    error("collection value in config not set, must be set");
    return;
  }
  if (!config.pipeline) {
    error("pipeline value in config not set, must be set");
    return;
  }

  let renderTarget = null;
  if (config.overlay) {
    // Create a container to render the overlay into
    const overlayContainer = document.createElement("div");
    overlayContainer.id = "sj-overlay-holder";
    document.body.appendChild(overlayContainer);

    renderTarget = overlayContainer;
  } else if (config.attachSearchBox && config.attachSearchResponse) {
    renderTarget = config.attachSearchBox;
  } else {
    error(
      "no render mode found, need to specify either overlay or attachSearchBox and attachSearchResponse in config"
    );
    return;
  }

  ReactDOM.render(<App config={config} />, renderTarget);
}

loaded(window, startInterface);
