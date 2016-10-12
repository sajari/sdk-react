# Basic Search Example

This example uses [`sajari-react`](https://github.com/sajari/sajari-sdk-react) to perform a basic search.

## Setup

1. Set `project` and `collection` values in [`App.js`](./src/App.js) to reflect your Sajari credentials.
2. Run `npm install` then `npm start` from within the [`examples/basic-search`](./) directory to get your example app up and running.

## Sajari integration

All of the Sajari specific code is contained within [`App.js`](./src/App.js).

1. We register the `project` and `collection` with `RegisterNamespace`.
2. Render `BodyInput` to give us our `input` html element and Sajari search integration.
3. Render [`ResultInjector`](https://github.com/sajari/sajari-sdk-react/blob/master/README.md#resultinjector) to pass results to the [`ResultRenderer`](./src/ResultRenderer.js).
