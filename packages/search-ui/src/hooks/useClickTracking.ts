import { ClickTracking, PosNegTracking, Token } from '@sajari/react-hooks';
import { isEmpty, isFunction, isString, isValidURL, noop } from '@sajari/react-sdk-utils';

import { ResultValues } from '../Results/types';

interface UseClickTrackingParams {
  token: Token | undefined;
  tracking: ClickTracking | PosNegTracking | undefined;
  values: ResultValues;
  onClick?: (url: string) => void;
}

function useClickTracking(params: UseClickTrackingParams) {
  const { onClick, token, tracking, values } = params;
  const { url } = values;

  if (!tracking) {
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
    if (isFunction(onClick)) {
      onClick(url);
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

export default useClickTracking;
