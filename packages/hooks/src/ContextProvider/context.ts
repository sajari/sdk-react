import { createContext } from '@sajari/react-sdk-utils';

import { Context } from './types';

const [Provider, useContext] = createContext<Context>({
  strict: true,
  name: 'PipelineContext',
});

export { Provider, useContext };
