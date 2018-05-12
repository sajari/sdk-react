import { UnlistenFn } from "../listener";
import { Analytics } from "./analytics";

import {
  EVENT_ANALYTICS_PAGE_CLOSED,
  EVENT_ANALYTICS_BODY_RESET,
  EVENT_ANALYTICS_RESULT_CLICKED
} from "../../events";

export class GoogleAnalytics {
  private id: string | null;
  private param: string;

  private unregisterFunctions: Array<UnlistenFn> = [];

  /**
   * Constructs a GoogleAnalytics object.
   * @param {Analytics} analytics The analytics object to attach to.
   * @param {string} [id=undefined] The name of the ga global object. Defaults to "ga" or "_ua" if one isn't supplied.
   * @param {string} [param="q"] The URL parameter to use to indicate a search. Default to "q".
   */
  constructor(
    analytics: Analytics,
    id: string | undefined = undefined,
    param: string = "q"
  ) {
    this.unregisterFunctions.push(
      analytics.listen(EVENT_ANALYTICS_PAGE_CLOSED, this.onPageClose)
    );
    this.unregisterFunctions.push(
      analytics.listen(EVENT_ANALYTICS_BODY_RESET, this.onBodyReset)
    );
    this.unregisterFunctions.push(
      analytics.listen(EVENT_ANALYTICS_RESULT_CLICKED, this.onResultClicked)
    );

    if (id !== undefined) {
      this.id = id;

      // @ts-ignore: checking for the presense of ga
    } else if (isFunction(window.ga)) {
      this.id = "ga";

      // @ts-ignore: checking for the presense of _ua
    } else if (isFunction(window._ua)) {
      this.id = "_ua";
    } else {
      this.id = null;
    }
    this.param = param;
  }

  /**
   * Stops this object listening for events.
   */
  detatch = () => this.unregisterFunctions.forEach((fn) => fn());

  /**
   * Sends a page view event if ga is found on the page and we're not in dev mode.
   */
  sendGAPageView(body: string) {
    // @ts-ignore: window is an object
    if (this.id && isFunction(window[this.id])) {
      // Merge the body in with the existing query params in the url
      const pageAddress = url.augmentUri(
        // Take only the portion of the url following the domain
        location.href.substring(location.origin.length),
        { [this.param]: body }
      );

      // @ts-ignore: window is an object
      window[this.id]("send", "pageview", pageAddress);
    }
  }

  /**
   * Callback for when the body has been reset. Calls sendGAPageView.
   */
  onBodyReset = (body: string) => this.sendGAPageView(body);

  /**
   * Callback for when a result has been clicked. Calls sendGAPageView.
   */
  onResultClicked = (body: string) => this.sendGAPageView(body);

  /**
   * Callback for when the page has been closed. Calls sendGAPageView.
   */
  onPageClose = (body: string) => this.sendGAPageView(body);
}

const url = {
  /**
   * Convert a query string in to an object
   */
  decodeUriArgs: function(queryStr: string) {
    const args = {} as { [k: string]: string };
    const a = queryStr.split("&");
    for (const i in a) {
      if (a.hasOwnProperty(i)) {
        const b = a[i].split("=");
        args[decodeURIComponent(b[0])] = decodeURIComponent(b[1]);
      }
    }
    return args;
  },

  /**
   * Convert an arguments object in to a query string
   */
  encodeUriArgs: function(args: { [k: string]: string }) {
    const queryParts = [];
    for (const i in args) {
      queryParts.push(
        encodeURIComponent(i) + "=" + encodeURIComponent(args[i])
      );
    }
    return queryParts.join("&");
  },

  /**
   * Merges query strings or objects into a single query string. Accepts a variable number of query string/objects
   * to merge. The latter overrides the former.
   */
  mergeQueryStr: function(
    first: string | { [k: string]: string },
    ...rest: Array<string | { [k: string]: string }>
  ) {
    const args = typeof first === "string" ? this.decodeUriArgs(first) : first;
    rest.forEach((arg) => {
      const next = typeof arg === "string" ? this.decodeUriArgs(arg) : arg;
      for (const prop in next) {
        args[prop] = next[prop];
      }
    });
    return this.encodeUriArgs(args);
  },

  /**
   * Takes an existing URL and merges additional data into the query string
   */
  augmentUri: function(uri: string, args: { [k: string]: string }) {
    const m = /^([^?]+)\?(.+)+$/.exec(uri);
    if (m) {
      return m[1] + "?" + this.mergeQueryStr(m[2], args);
    } else {
      return uri + "?" + this.encodeUriArgs(args);
    }
  },

  /**
   * Get a parameter from the URL
   */
  getURLParameter: function(name: string) {
    const value = new RegExp("[?|&]" + name + "=" + "([^&;]+?)(&|#|;|$)").exec(
      location.search
    ) || [undefined, ""];

    return (
      decodeURIComponent((value[1] as string).replace(/\+/g, "%20")) || null
    );
  }
};

const isFunction = (x: any) => typeof x === "function";
