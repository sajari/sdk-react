import React from "react";
import ReactDOM from "react-dom";

import loaded from "./loaded";

import App from "./App";

const error = message => {
  if (console && console.error) {
    console.error(message);
  }
};

function startInterface(config) {
  if (!config) {
    error(
      'global value "sj" not found, please check the code snippet for your Sajari search interface'
    );
    return;
  }

  let renderTarget = null;
  if (config.overlay) {
    // Create a container to render the overlay into
    const overlayContainer = document.createElement("div");
    overlayContainer.id = "sj-overlay-holder";
    document.body.appendChild(overlayContainer);

    renderTarget = overlayContainer;
  } else if (config.attachSearchBox) {
    renderTarget = config.attachSearchBox;
  } else {
    error(
      "no render mode found, need to specify either overlay or attachSearchBox in config"
    );
    return;
  }

  ReactDOM.render(<App config={config} />, renderTarget);
}

loaded(window, () => startInterface(window.sj.interface.config));
