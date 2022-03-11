import { Client, DefaultSession, Token, TrackingType } from '@sajari/sdk-js';

import { ResultClickedFn, ResultValues } from '../../types';
import { Tracking } from './Tracking';
import { getTrackingData } from './utils';

export class PosNegTracking extends Tracking {
  /**
   * Construct a PosNegTracking instance.
   * @param field Field to use for click token generation.
   * @param metadata Metadata fields.
   */
  constructor(field = 'url', metadata = {}) {
    super(field);

    this.clientTracking = new DefaultSession(TrackingType.PosNeg, this.field, { ...getTrackingData(), ...metadata });
  }

  public bootstrap(client: Client, handleResultClicked: ResultClickedFn) {
    super.bootstrap(client, handleResultClicked);
  }

  public onResultClick(values: ResultValues, token?: Token) {
    if (token && 'pos' in token) {
      this.handleResultClicked({ token: token.pos, values });
      if (Object.keys(values).includes(this.field)) {
        this.posNegLocalStorageManager.add(values[this.field], token);
      }
    }
  }
}
