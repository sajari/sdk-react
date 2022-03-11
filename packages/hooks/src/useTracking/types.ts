import { PosNegLocalStorageManager } from '@sajari/sdk-js';

import { ResultClickedFn } from '../ContextProvider/types';

export interface UseTrackingResult {
  /** The callback when user clicks on some link */
  handleResultClicked: ResultClickedFn;
  /** The method used to process PosNeg token */
  consumeInteractionToken: (
    token: string,
    identifier: string,
    weight: number,
    data?: Record<string, string>,
  ) => Promise<void>;
  posNegLocalStorageManager: PosNegLocalStorageManager;
}
