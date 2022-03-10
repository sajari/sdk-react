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
  };
}

export default useTracking;
export * from './types';
