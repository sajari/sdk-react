import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { InputComposition, ContextProvider } from '@sajari/react-sdk';

const App = () => {
  return (
    <ContextProvider>
      <InputComposition />
    </ContextProvider>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
