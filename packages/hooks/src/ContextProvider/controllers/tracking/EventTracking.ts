import { Banner, Client, DefaultSession, RedirectTarget, SearchIOAnalytics, TrackingType } from '@sajari/sdk-js';

import { ResultClickedFn, ResultValues } from '../../types';
import { Response } from '../Response';
import { Tracking } from './Tracking';
import { getTrackingData } from './utils';

export class EventTracking extends Tracking {
  public searchIOAnalytics: SearchIOAnalytics;

  private searchIOAnalyticsEndpoint?: string;

  /**
   * Construct a EventTracking instance.
   * @param field Field to use for event tracking.
   * @param metadata Metadata fields.
   */
  constructor(field = '_id', metadata = {}, searchIOAnalytics?: string | SearchIOAnalytics) {
    super(field);

    if (searchIOAnalytics instanceof SearchIOAnalytics) {
      this.searchIOAnalytics = searchIOAnalytics;
    } else {
      this.searchIOAnalyticsEndpoint = searchIOAnalytics;
    }
    this.clientTracking = new DefaultSession(TrackingType.Event, this.field, { ...getTrackingData(), ...metadata });
  }

  public bootstrap(client: Client, handleResultClicked: ResultClickedFn) {
    super.bootstrap(client, handleResultClicked);
    this.searchIOAnalytics =
      this.searchIOAnalytics ??
      new SearchIOAnalytics(client.project, client.collection, this.searchIOAnalyticsEndpoint);
  }

  public onQueryResponse(response: Response): void {
    const queryId = response.getQueryId();
    if (queryId) {
      this.searchIOAnalytics.updateQueryId(queryId);
    }
  }

  public onResultClick(values: ResultValues) {
    if (Object.keys(values).includes(this.field)) {
      this.searchIOAnalytics.track('click', values[this.field], this.getMetadata());
    }
    this.handleResultClicked({ values });
  }

  public onPromotionClick({ id }: Banner) {
    if (id) {
      this.searchIOAnalytics.track('promotion_click', id, this.getMetadata());
    }
  }

  public onRedirect(redirect: RedirectTarget) {
    this.searchIOAnalytics.track('redirect', redirect.id, this.getMetadata());
  }
}
