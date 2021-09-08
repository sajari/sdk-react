/* eslint-disable no-console */
import { EVENT_ANALYTICS_BODY_RESET, EVENT_ANALYTICS_PAGE_CLOSED, EVENT_ANALYTICS_RESULT_CLICKED } from '../../events';
import type { Analytics } from './Analytics';

export class DebugAnalytics {
  /**
   *
   * @param {Analytics} analytics Analytics adaptor to listen for events on.
   */
  constructor(analytics: Analytics) {
    analytics.listen(EVENT_ANALYTICS_PAGE_CLOSED, this.pageClosed);
    analytics.listen(EVENT_ANALYTICS_BODY_RESET, this.bodyReset);
    analytics.listen(EVENT_ANALYTICS_RESULT_CLICKED, this.resultClicked);
  }

  public pageClosed = (bodyToSend: string) => {
    console.log('DebugAnalytics: pageClosed, body:', bodyToSend);
  };

  public bodyReset = (bodyToSend: string) => {
    console.log('DebugAnalytics: bodyReset, body:', bodyToSend);
  };

  public resultClicked = (bodyToSend: string) => {
    console.log('DebugAnalytics: resultClicked, body:', bodyToSend);
  };
}
