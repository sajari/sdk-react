import { useContext } from '../ContextProvider';

function useAutocomplete() {
  // TODO: might not make sense to return the last response from this hook?
  const {
    autocomplete: { response, suggestions, search, completion, searching, redirects },
  } = useContext();

  return {
    response,
    suggestions,
    search,
    completion,
    searching,
    redirects,
  };
}

export default useAutocomplete;
