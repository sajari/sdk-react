import React from "react";
import PropTypes from "prop-types";

import { TokenLink, Image, Title, Description, URL } from "./";

/**
 * @typedef {Object} ResultProps
 * @property {Object} values Values of record to be rendered.
 * @property {string} token Token to be used in the url.
 * @property {function()} resultClicked Function to be called when the result is clicked.
 * @property {Number} score Score of the record.
 * @property {Number} indexScore Index score of the record.
 */

/**
 * Renders a Result component.
 * @param {ResultProps} props
 * @returns {React.Component}
 */
const Result = ({ values, token, resultClicked }) =>
  <div className="sj-result">
    <div className="sj-result-text">
      <Title
        title={values.title}
        url={values.url}
        token={token}
        resultClicked={resultClicked}
      />
      <Description description={values.description} />
      <URL url={values.url} token={token} resultClicked={resultClicked} />
    </div>
  </div>;

Result.propTypes = {
  values: PropTypes.object,
  token: PropTypes.string,
  resultClicked: PropTypes.func
};

/**
 * @typedef {Object} ImageResultProps
 * @property {Object} values Values of record to be rendered.
 * @property {string} token Token to be used in the url.
 * @property {function()} resultClicked Function to be called when the result is clicked.
 */

/**
 * Renders an ImageResult component which shows a search result with an image.
 * @param {ResultProps} props
 * @returns {React.Component}
 */
const ImageResult = ({ values, token, resultClicked }) =>
  <div className="sj-result">
    {values.image
      ? <div className="sj-result-image-container">
          <TokenLink token={token} url={values.url}>
            <Image url={values.image} title={values.title} />
          </TokenLink>
        </div>
      : null}
    <div className="sj-result-text">
      <Title
        title={values.title}
        url={values.url}
        token={token}
        resultClicked={resultClicked}
      />
      <Description description={values.description} />
      <URL url={values.url} token={token} resultClicked={resultClicked} />
    </div>
  </div>;

ImageResult.propTypes = {
  values: PropTypes.object,
  token: PropTypes.string,
  resultClicked: PropTypes.func
};

export { Result, ImageResult };
