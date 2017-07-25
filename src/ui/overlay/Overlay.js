import React from "react";
import PropTypes from "prop-types";

/**
 * @typedef {Object} OverlayProps
 * @property {boolean} active Whether to render the overlay or not.
 * @property {Object} children Child React components to render.
 */

/**
 * Renders an overlay html structure.
 * @param {OverlayProps} props
 */
const Overlay = ({ active, children }) => {
  if (!active) {
    return null;
  }

  return (
    <div id="sj-overlay">
      <div id="sj-overlay-search-modal">
        {children}
      </div>
    </div>
  );
};

Overlay.PropTypes = {
  active: PropTypes.bool.isRequired,
  children: PropTypes.children
};

export default Overlay;
