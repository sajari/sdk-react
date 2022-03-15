import { ActivePromotion, Aggregates, Banner, Redirects, RequestError, Result } from '@sajari/sdk-js';

export type ResponseMap = Map<
  string,
  number | string | Aggregates | Result[] | Redirects | ActivePromotion[] | Banner[]
>;

export class Response {
  private error: RequestError | null;

  private queryValues?: Map<string, string>;

  private response?: ResponseMap;

  private values?: Map<string, string>;

  /**
   * Constructs a Response object.
   * @param error
   * @param queryValues
   * @param response
   * @param values
   */
  constructor(
    error: RequestError | null,
    queryValues?: Map<string, string>,
    response?: ResponseMap,
    values?: Map<string, string>,
  ) {
    this.error = error;
    this.queryValues = queryValues;
    this.response = response;
    this.values = values;
  }

  /**
   * Is this response empty?
   */
  public isEmpty(): boolean {
    return (
      this.error === null && this.response === undefined && this.values === undefined && this.queryValues === undefined
    );
  }

  /**
   * Is this response an error?
   */
  public isError(): boolean {
    return this.error !== null;
  }

  /**
   * The error associated with this response.
   */
  public getError(): RequestError | null {
    return this.error;
  }

  /**
   * Return the query values used in the search which created this response.
   */
  public getQueryValues(): Map<string, string> | undefined {
    return this.queryValues;
  }

  /**
   * Returns the response, which includes results and aggregates etc.
   */
  public getResponse(): ResponseMap | undefined {
    return this.response;
  }

  /**
   * Return the pipeline values returned by the search.
   */
  public getValues(): Map<string, string> | undefined {
    return this.values;
  }

  /**
   * Return results from the response.
   */
  public getResults(): Result[] | undefined {
    return this.response?.get('results') as Result[] | undefined;
  }

  /**
   * Return redirects form the response.
   */
  public getRedirects(): Redirects | undefined {
    return this.response?.get('redirects') as Redirects | undefined;
  }

  /**
   * Return the active promotions from the response.
   */
  public getActivePromotions(): ActivePromotion[] | undefined {
    return this.response?.get('activePromotions') as ActivePromotion[] | undefined;
  }

  /**
   * Return the total number of results.
   */
  public getTotalResults(): number | undefined {
    return this.response?.get('totalResults') as number | undefined;
  }

  /**
   * Return time from the response.
   */
  public getTime(): number | undefined {
    return this.response?.get('time') as number | undefined;
  }

  /**
   * Return queryId from the response.
   */
  public getQueryId(): string | undefined {
    return this.response?.get('queryId') as string | undefined;
  }

  /**
   * Return the aggregates in the response.
   */
  public getAggregates(): Aggregates | undefined {
    return this.response?.get('aggregates') as Aggregates | undefined;
  }

  /**
   * Return the aggregateFilters in the response.
   */
  public getAggregateFilters(): Aggregates | undefined {
    return this.response?.get('aggregateFilters') as Aggregates | undefined;
  }

  /**
   * Return the featureScoreWeight in the response.
   */
  public getFeatureScoreWeight(): number | undefined {
    return this.response?.get('featureScoreWeight') as number | undefined;
  }

  public getBanners(): Banner[] | undefined {
    return this.response?.get('banners') as Banner[] | undefined;
  }
}
