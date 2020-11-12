import { useContext } from '../SearchContextProvider';
import { UseVariablesResult } from './types';

function useVariables(): UseVariablesResult {
  const {
    search: { variables },
  } = useContext();
  return { variables };
}

export default useVariables;
