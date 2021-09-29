import { useContext } from '../ContextProvider';

function useAutocomplete() {
  const {
    autocomplete: { suggestions, search, completion, searching, redirects },
  } = useContext();

  return {
    suggestions,
    search,
    completion,
    searching,
    redirects,
  };
}

export default useAutocomplete;
