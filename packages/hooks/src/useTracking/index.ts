import { useContext } from '../ContextProvider';
import { UseTrackingResult } from './types';

function useTracking(): UseTrackingResult {
  const {
    resultClicked,
    search: { pipeline },
  } = useContext();
  return {
    consumeInteractionToken: pipeline.getClient().interactionConsume,
    handleResultClicked: resultClicked,
    // TODO: Remove in next major version bump
    posNegLocalStorageManager: pipeline.getTracking().posNegLocalStorageManager,
  };
}

export default useTracking;
export * from './types';
