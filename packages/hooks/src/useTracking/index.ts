import { useContext } from '../ContextProvider';
import { UseTrackingResult } from './types';

function useTracking(): UseTrackingResult {
  const {
    resultClicked,
    search: { pipeline },
  } = useContext();
  const client = pipeline?.getClient();
  return {
    consumeInteractionToken: client?.interactionConsume,
    handleResultClicked: resultClicked,
  };
}

export default useTracking;
export * from './types';
