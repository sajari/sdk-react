import { ClickTracking, EventTracking, PosNegTracking, ResultClickedFn, SearchIOAnalytics } from '@sajari/react-hooks';
import { isEmptyObject, isFunction, noop } from '@sajari/react-sdk-utils';

import { ResultValues } from '../Results/types';

export interface ApplyEventTrackingParams {
  tracking?: ClickTracking | PosNegTracking | EventTracking;
  values: ResultValues;
  onClick?: ResultClickedFn;
  searchIOAnalytics: SearchIOAnalytics;
}

function applyEventTracking(params: ApplyEventTrackingParams) {
  const { onClick, tracking, values, searchIOAnalytics } = params;

  if (!tracking || !(tracking instanceof EventTracking)) {
    return {
      onClick: noop,
    };
  }

  const fieldValue = Object.keys(values).includes(tracking.field) && values[tracking.field];
  const onClickHandler = () => {
    if (isFunction(onClick)) {
      onClick({ values });
    }
    if (fieldValue) {
      const metadata = tracking.next({}).data;
      searchIOAnalytics.track('click', fieldValue, !isEmptyObject(metadata) ? metadata : undefined);
    }
  };

  return {
    onClick: onClickHandler,
  };
}

export default applyEventTracking;
