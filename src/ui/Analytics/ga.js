const url = {

  /**
   * Convert a query string in to an object
   */
  decodeUriArgs : function(queryStr) {
    const args = {}
    const a = queryStr.split('&')
    for (const i in a) {
      if (a.hasOwnProperty(i)) {
        const b = a[i].split('=')
        args[decodeURIComponent(b[0])] = decodeURIComponent(b[1])
      }
    }
    return args
  },

  /**
   * Convert an arguments object in to a query string
   */
  encodeUriArgs : function(args) {
    const queryParts = []
    for (const i in args) {
      queryParts.push(encodeURIComponent(i)+'='+encodeURIComponent(args[i]))
    }
    return queryParts.join('&')
  },

  /**
   * Merges query strings or objects into a single query string. Accepts a variable number of query string/objects
   * to merge. The latter overrides the former.
   */
  mergeQueryStr : function(queryStr1) {
    const args = (typeof queryStr1 === 'string' ? this.decodeUriArgs(queryStr1) : queryStr1)
    for (let i = 1; i < arguments.length; i++) {
      if (arguments[i] !== undefined) {
        const nextArgs = (typeof arguments[i] === 'string' ? this.decodeUriArgs(arguments[i]) : arguments[i])
        for (const a in nextArgs) {
          args[a] = nextArgs[a]
        }
      }
    }
    return this.encodeUriArgs(args)
  },

  /**
   * Takes an existing URL and merges additional data into the query string
   */
  augmentUri : function(uri, args) {
    const m = /^([^\?]+)\?(.+)+$/.exec(uri)
    if (m) {
      return m[1]+'?'+this.mergeQueryStr(m[2], args)
    } else {
      return uri+'?'+this.encodeUriArgs(args)
    }
  },

  /**
   * Get a parameter from the URL
   */
  getURLParameter : function(name) {
    return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,''])[1].replace(/\+/g, '%20'))||null
  }
}

const isFunction = x => typeof x === "function";

class GoogleAnalytics {
  constructor(id, param = 'q') {
    if (id !== undefined) {
      this.id = id;
    } else if (isFunction(window.ga)) {
      this.id = "ga";
    } else if (isFunction(window._ua)) {
      this.id = "_ua";
    } else {
      this.id = null;
    }
    this.param = param;
  }

  sendGAPageView(body) {
    if (
      this.id &&
      typeof window[this.id] === "function" &&
      process.env.NODE_ENV.environment !== 'development'
    ) {
      // Merge the body in with the existing query params in the url
      const pageAddress = url.augmentUri(
        // Take only the portion of the url following the domain
        location.href.substring(location.origin.length),
        { [this.param]: body }
      )
      window[this.id]('send', 'pageview', pageAddress)
    }
  }

  onBodyReset(previousBody) {
    this.sendGAPageView(previousBody)
  }

  onResultClicked(body) {
    this.sendGAPageView(body)
  }

  onPageClose(body) {
    this.sendGAPageView(body)
  }
}

export default GoogleAnalytics
