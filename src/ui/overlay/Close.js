import React from "react";
import PropTypes from "prop-types";

/**
 * @typedef {Object} CloseProps
 * @property {function(event: Event, closeOverlay: Function)} onClick A function to call before closing the overlay.
 * @property {function()} closeOverlay Called when the user clicks the html element.
 */

/**
 * Close renders a close button. Indended for use with the Overlay.
 * @param {CloseProps} props
 * @returns {React.Component}
 */
const Close = ({ onClick, closeOverlay }) =>
  <div
    className="sj-overlay-close"
    onClick={onClick ? e => onClick(e, closeOverlay) : closeOverlay}
  >
    <div className="sj-close">×</div>
    <div className="sj-esc">ESC</div>
  </div>;

Close.propTypes = {
  onClick: PropTypes.func,
  closeOverlay: PropTypes.func.isRequired
};

export default Close;
