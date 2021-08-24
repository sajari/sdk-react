import { ClickTracking, PosNegTracking, ResultClickedFn, Token } from '@sajari/react-hooks';
import { isFunction, noop } from '@sajari/react-sdk-utils';
import { PosNegLocalStorageManager } from '@sajari/sdk-js';

import { ResultValues } from '../Results/types';

export interface UsePosNegTrackingParams {
  token: Token | undefined;
  tracking: ClickTracking | PosNegTracking | undefined;
  values: ResultValues;
  onClick?: ResultClickedFn;
  posNegLocalStorageManager: PosNegLocalStorageManager;
}

function usePosNegTracking(params: UsePosNegTrackingParams) {
  const { onClick, token, tracking, values, posNegLocalStorageManager } = params;

  if (!tracking || !(tracking instanceof PosNegTracking)) {
    return {
      onClick: noop,
    };
  }

  const posToken = token && 'pos' in token ? token.pos : undefined;
  const fieldValue = Object.keys(values).includes(tracking.field) && values[tracking.field];
  const onClickHandler = () => {
    if (posToken) {
      if (isFunction(onClick)) {
        onClick({ token: posToken, values });
      }
      // Typescript doesn't track that token is _definetly_ a PosNegToken at this point so we have to reiterate this check
      if (fieldValue && token && 'pos' in token) {
        posNegLocalStorageManager.add(fieldValue, token);
      }
    }
  };

  return {
    onClick: onClickHandler,
  };
}

export default usePosNegTracking;
