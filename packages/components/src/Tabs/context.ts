import { createContext } from '../utils/react-helpers';
import { TabsContextOptions } from './types';

const [TabContextProvider, useTabContext] = createContext<TabsContextOptions>({
  strict: true,
  name: 'TabsContext',
});

export default TabContextProvider;
export { useTabContext };
