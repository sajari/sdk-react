import React from "react";
import PropTypes from "prop-types";

import { TokenLink } from "./";

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
const URL = ({ url, token, resultClicked }) => {
  let decodedText;
  try {
    decodedText = decodeURI(url);
  } catch (e) {
    // encoded url was malformed, fall back to displaying the encoded text
    decodedText = url;
  }
  return (
    <p className="sj-result-url">
      <TokenLink
        token={token}
        url={url}
        text={decodedText}
        resultClicked={resultClicked}
      />
    </p>
  );
};

URL.propTypes = {
  url: PropTypes.string,
  token: PropTypes.string,
  resultClicked: PropTypes.func
};

export default URL;
