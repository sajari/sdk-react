import { useContext } from '../ContextProvider';

function useAutocomplete() {
  const {
    instant: { suggestions, search, completion, searching },
  } = useContext();

  return {
    suggestions,
    search,
    completion,
    searching,
  };
}

export default useAutocomplete;
