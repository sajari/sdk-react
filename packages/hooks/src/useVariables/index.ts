import { useContext } from '../ContextProvider';
import { UseVariablesResult } from './types';

function useVariables(): UseVariablesResult {
  const {
    search: { variables },
  } = useContext();
  return { variables };
}

export default useVariables;
export * from './types';
