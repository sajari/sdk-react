import { ClickTracking, PosNegTracking, ResultClickedFn, Token } from '@sajari/react-hooks';
import { isEmpty, isFunction, isString, isValidURL, noop } from '@sajari/react-sdk-utils';

import { ResultValues } from '../Results/types';

export interface ApplyClickTrackingParams {
  token: Token | undefined;
  tracking: ClickTracking | PosNegTracking | undefined;
  values: ResultValues;
  onClick?: ResultClickedFn;
}

function applyClickTracking(params: ApplyClickTrackingParams) {
  const { onClick, token, tracking, values } = params;
  const { url } = values;

  if (!tracking || tracking instanceof PosNegTracking) {
    return {
      href: url,
      onClick: noop,
    };
  }

  // Get the click token from the response
  const clickToken = token && 'click' in token ? token.click : undefined;
  // Determine if the field used for the token is a valid URL (then it can redirect)
  const useToken =
    !isEmpty(clickToken) && Object.keys(values).includes(tracking.field) && isValidURL(values[tracking.field]);
  // Determine href to use for links
  const href = useToken ? clickToken : url;

  const onClickHandler = () => {
    if (isFunction(onClick) && clickToken) {
      onClick({ token: clickToken, values });
    }

    // Fire the click token using sendBeacon if we didn't use it for the href
    if (!useToken && isString(clickToken) && isFunction(navigator?.sendBeacon)) {
      navigator.sendBeacon(clickToken);
    }
  };

  return {
    href,
    onClick: onClickHandler,
  };
}

export default applyClickTracking;
