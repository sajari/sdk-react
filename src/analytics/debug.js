import {
  Analytics,
  pageClosedAnalyticsEvent,
  bodyResetAnalyticsEvent,
  resultClickedAnalyticsEvent
} from "../controllers";

export default class DebugAnalytics {
  /**
    * 
    * @param {Analytics} analytics Analytics adaptor to listen for events on.
    */
  constructor(analytics) {
    analytics.listen(pageClosedAnalyticsEvent, this.pageClosed);
    analytics.listen(bodyResetAnalyticsEvent, this.bodyReset);
    analytics.listen(resultClickedAnalyticsEvent, this.resultClicked);
  }

  pageClosed = (bodyToSend) => {
    console.log("DebugAnalytics: pageClosed, body:", bodyToSend);
  };

  bodyReset = (bodyToSend) => {
    console.log("DebugAnalytics: bodyReset, body:", bodyToSend);
  };

  resultClicked = (bodyToSend) => {
    console.log("DebugAnalytics: resultClicked, body:", bodyToSend);
  };
}
