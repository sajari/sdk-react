import React from 'react'
import ReactDOM from 'react-dom'

import { SearchInterface, SearchBox, SearchResponse } from './App'

function sjsi(config) {
  if (!config) {
    console.error('global value "_sjsi" not found, please check the code snippet for your Sajari search interface')
    return
  }

  if (config.attachTarget) {
    ReactDOM.render(
      <SearchInterface config={config}/>,
      config.attachTarget
    );
    return;
  }

  const attachSearchBox = config.attachSearchBox || config.attachSplitSearchBox;
  const attachSearchResponse = config.attachSearchResponse || config.attachSplitResponse;

  if (attachSearchBox && attachSearchResponse) {
    ReactDOM.render(
      <SearchBox config={config}/>,
      attachSearchBox
    );

    ReactDOM.render(
      <SearchResponse config={config}/>,
      attachSearchResponse
    );
    return
  }
}

sjsi(window._sjsi)
