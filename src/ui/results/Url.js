import React from "react";
import PropTypes from "prop-types";

import TokenLink from "./TokenLink";

/**
 * @typedef {Object} UrlProps
 * @property {string} url URL to use.
 * @property {string} token Token to use for tracking link.
 * @property {function()} resultClicked Function to run when the link has been clicked.
 */

/**
 * Renders a Url
 * @param {UrlProps} props
 * @returns {React.Component}
 */
const Url = ({ url, token, resultClicked }) =>
  <p className="sj-result-url">
    <TokenLink
      token={token}
      url={url}
      text={url}
      resultClicked={resultClicked}
    />
  </p>;

Url.propTypes = {
  url: PropTypes.string,
  token: PropTypes.token,
  resultClicked: PropTypes.func
};

export default Url;
