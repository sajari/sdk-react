import React from "react";
import PropTypes from "prop-types";

import { TokenLink, Image, Title, Description, URL } from "./";

/**
 * @typedef {Object} ResultProps
 * @property {string} title Title to be rendered.
 * @property {string} description Description to be rendered.
 * @property {string} url URL to be rendered.
 * @property {string} token Token to be used in the url.
 * @property {boolean} showImage Whether to render an image or not.
 * @property {string} image URL of the image to render.
 * @property {function()} resultClicked Function to be called when the result is clicked.
 */

/**
 * Renders a Result component.
 * @param {ResultProps} props
 * @returns {React.Component}
 */
const Result = ({
  title,
  description,
  url,
  token,
  showImage,
  image,
  resultClicked
}) =>
  <div className="sj-result">
    {showImage && image
      ? <div className="sj-result-image-container">
          <TokenLink token={token} url={url}>
            <Image url={image} title={title} />
          </TokenLink>
        </div>
      : null}
    <div className="sj-result-text">
      <Title
        title={title}
        url={url}
        token={token}
        resultClicked={resultClicked}
      />
      <Description description={description} />
      <URL url={url} token={token} resultClicked={resultClicked} />
    </div>
  </div>;

Result.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  url: PropTypes.string,
  token: PropTypes.string,
  showImage: PropTypes.bool,
  image: PropTypes.string,
  resultClicked: PropTypes.func
};

export default Result;
