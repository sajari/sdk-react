export class Response {
  private error?: Error;
  private queryValues?: Map<string, string>;
  private response?: Map<string, string | { [k: string]: string }>;
  private values?: Map<string, string>;

  /**
   * Constructs a Response object.
   * @param error
   * @param queryValues
   * @param response
   * @param values
   */
  constructor(
    error?: Error,
    queryValues?: Map<string, string>,
    response?: Map<string, string | { [k: string]: string }>,
    values?: Map<string, string>
  ) {
    this.error = error;
    this.queryValues = queryValues;
    this.response = response;
    this.values = values;
  }

  /**
   * Is this response empty?
   */
  isEmpty(): boolean {
    return (
      this.error === undefined &&
      this.response === undefined &&
      this.values === undefined &&
      this.queryValues === undefined
    );
  }

  /**
   * Is this response an error?
   */
  isError(): boolean {
    return this.error !== undefined;
  }

  /**
   * The error associated with this response.
   */
  getError(): Error | null {
    if (this.error === undefined) return null;
    return this.error;
  }

  /**
   * Return the query values used in the search which created this response.
   * @return {Object|undefined}
   */
  getQueryValues() {
    return this.queryValues;
  }

  /**
   * Returns the response, which includes results and aggregates etc.
   * @return {Object|undefined}
   */
  getResponse() {
    return this.response;
  }

  /**
   * Return the pipeline values returned by the search.
   * @return {Object|undefined}
   */
  getValues() {
    return this.values;
  }

  /**
   * Return results from the response.
   */
  getResults(): { [k: string]: any } | undefined {
    return this.response !== undefined
      ? (this.response.get("results") as { [k: string]: any })
      : undefined;
  }

  /**
   * Return the total number of results.
   */
  public getTotalResults(): number | undefined {
    return this.response !== undefined
      ? parseInt(this.response.get("totalResults") as string, 10)
      : undefined;
  }

  /**
   * Return time from the response.
   */
  public getTime(): string | undefined {
    return this.response !== undefined
      ? (this.response.get("time") as string)
      : undefined;
  }

  /**
   * Return the aggregates in the response.
   */
  public getAggregates(): { [k: string]: any } | undefined {
    if (this.response === undefined) {
      return undefined;
    }

    const aggregates = this.response.get("aggregates");
    if (aggregates === undefined) {
      return undefined;
    }
    return aggregates as { [k: string]: any };
  }
}
