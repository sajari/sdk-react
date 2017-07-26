import React from "react";
import PropTypes from "prop-types";

/**
 * @typedef {Object} LogoProps
 * @property {function()} closeOverlay Called when the user clicks the html element.
 * @property {string} src Source URL of the img element.
 * @property {string} alt Alt text for the img element.
 */

/**
 * Logo renders an img element which closes the overlay when clicked.
 * @param {LogoProps} props
 * @returns {React.Component}
 */
const Logo = ({ closeOverlay, src, alt }) =>
  <div className="sj-overlay-logo">
    <img
      className="sj-overlay-logo-image"
      onClick={closeOverlay}
      src={src}
      alt={alt}
    />
  </div>;

Logo.propTypes = {
  closeOverlay: PropTypes.func,
  src: PropTypes.string,
  alt: PropTypes.string
};

export default Logo;
