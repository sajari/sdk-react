import React from "react";
import PropTypes from "prop-types";

/**
 * @typedef {Object} DescriptionProps
 * @property {string} description Description text to render.
 */

/**
 * Renders a Description.
 * @param {DescriptionProps} props
 * @returns {React.Component}
 */
const Description = ({ description }) =>
  <p className="sj-result-description">
    {description}
  </p>;

Description.propTypes = {
  description: PropTypes.string.isRequired
};

export default Description;
