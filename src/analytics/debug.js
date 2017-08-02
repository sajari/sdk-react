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

  pageClosed = () => {
    console.log("DebugAnalytics: pageClosed");
  };

  bodyReset = () => {
    console.log("DebugAnalytics: bodyReset");
  };

  resultClicked = () => {
    console.log("DebugAnalytics: resultClicked");
  };
}
