import React from 'react'
import ReactDOM from 'react-dom'

import { SingleApp, SplitAppSearch, SplitAppResponse } from './App'

function sjsi(config) {
  if (!config) {
    console.error('global value "_sjsi" not found, please check the code snippet for your Sajari search interface')
    return
  }

  if (config.attachTarget) {
    ReactDOM.render(
      <SingleApp config={config}/>,
      config.attachTarget
    );
    return;
  }

  if (config.attachSplitSearchBox && config.attachSplitResponse) {
    ReactDOM.render(
      <SplitAppSearch config={config}/>,
      config.attachSplitSearchBox
    );

    ReactDOM.render(
      <SplitAppResponse config={config}/>,
      config.attachSplitResponse
    );
    return
  }
}

sjsi(window._sjsi)
