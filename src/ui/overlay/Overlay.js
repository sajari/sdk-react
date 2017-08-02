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
 * @returns {React.Component}
 */
const Overlay = ({ active, children }) => {
  if (!active) {
    return null;
  }

  return (
    <div className="sj-overlay">
      <div className="sj-overlay-search">
        {children}
      </div>
    </div>
  );
};

Overlay.propTypes = {
  active: PropTypes.bool.isRequired,
  children: PropTypes.node
};

export default Overlay;
