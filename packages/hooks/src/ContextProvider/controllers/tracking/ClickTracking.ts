import { isEmpty, isFunction, isString, isValidURL } from '@sajari/react-sdk-utils';
import { DefaultSession, InteractiveSession, Token, TrackingType } from '@sajari/sdk-js';

import { ResultValues } from '../../types';
import { Tracking } from './Tracking';
import { getTrackingData } from './utils';

export class ClickTracking extends Tracking {
  /**
   * Construct a ClickTracking instance.
   * @param field Field to use for click token generation.
   * @param qParam Value to use for full-text query param.
   * @param metadata Metadata fields.
   */
  constructor(field = 'url', qParam = 'q', metadata: Record<string, string> = {}) {
    super(field);

    this.clientTracking = new InteractiveSession(
      qParam,
      new DefaultSession(TrackingType.Click, this.field, { ...getTrackingData(), ...metadata }),
    );
  }

  private extractValues(values: ResultValues, token?: Token): { useToken: boolean; clickToken?: string; href: string } {
    // Get the click token from the response
    const clickToken = token && 'click' in token ? token.click : undefined;
    // Determine if the field used for the token is a valid URL (then it can redirect)
    const useToken = !isEmpty(clickToken) && Object.keys(values).includes(this.field) && isValidURL(values[this.field]);
    // Determine href to use for links
    const href = useToken ? clickToken : values.url;

    return { useToken, clickToken, href };
  }

  public onResultClick(values: ResultValues, token?: Token) {
    const { useToken, clickToken } = this.extractValues(values, token);

    if (clickToken) {
      this.handleResultClicked({ token: clickToken, values });
    }

    // Fire the click token using sendBeacon if we didn't use it for the href
    if (!useToken && isString(clickToken) && isFunction(navigator?.sendBeacon)) {
      navigator.sendBeacon(clickToken);
    }
  }

  public getResultHref(values: ResultValues, token?: Token) {
    return this.extractValues(values, token).href;
  }
}
