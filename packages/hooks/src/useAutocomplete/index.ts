import { useContext } from '../SearchContextProvider';

function useAutocomplete() {
  const {
    instant: { suggestions, search, completion },
  } = useContext();

  return {
    suggestions,
    search,
    completion,
  };
}

export default useAutocomplete;
