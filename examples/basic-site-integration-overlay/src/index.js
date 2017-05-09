import React from "react";
import ReactDOM from "react-dom";

import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";

import overlay from "sajari-react/ui/reducers/Overlay";
import { setActive } from "sajari-react/ui/actions/Overlay";

import loaded from "./loaded";

import App from "./App";

function sjsi(config) {
  if (!config) {
    console.error(
      'global value "_sjsi" not found, please check the code snippet for your Sajari search interface'
    );
    return;
  }

  // Store to hold overlay state
  const store = createStore(combineReducers({ overlay }));

  // Set a global function which client code can call to launch the overlay
  window.launchSajariSearchInterface = () => {
    store.dispatch(setActive(true));
  };

  // If there is a query param supplied, launch the interface
  if (config.values.q) {
    store.dispatch(setActive(true));
  }

  // Create a container to render the overlay into
  const overlayContainer = document.createElement("div");
  overlayContainer.id = "sj-overlay-holder";
  document.body.appendChild(overlayContainer);

  ReactDOM.render(
    <Provider store={store}>
      <App config={config} />
    </Provider>,
    overlayContainer
  );
}

loaded(window, () => sjsi(window._sjsi));
