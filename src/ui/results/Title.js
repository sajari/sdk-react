import React from "react";
import PropTypes from "prop-types";

import { TokenLink } from "./";

/**
 * @typedef {Object} TitleProps
 * @property {string} title Title text to render.
 * @property {string} url URL to send the user on click.
 * @property {string} [token] Token to use for tracking url.
 * @property {function()} resultClicked Function to run when a result is clicked. Typically for analytics.
 */

/**
 * Renders a Title.
 * @param {TitleProps} props
 * @returns {React.Component}
 */
const Title = ({ title, url, token, resultClicked }) =>
  <h3 className="sj-result-title">
    <TokenLink
      token={token}
      url={url}
      text={title}
      resultClicked={resultClicked}
    />
  </h3>;

Title.propTypes = {
  title: PropTypes.string,
  url: PropTypes.string,
  token: PropTypes.string,
  resultClicked: PropTypes.func
};

export default Title;
