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

  const noOverlay = () => error("function failed, no overlay exists");
  window._sjui.overlay = { show: noOverlay, hide: noOverlay };
  const setOverlayControls = controls => {
    window._sjui.overlay.show = controls.show;
    window._sjui.overlay.hide = controls.hide;
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
    />,
    renderTarget
  );
}

loaded(window, startInterface);
