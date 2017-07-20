import React from "react";

const Close = ({ onClick, closeOverlay }) =>
  <div
    id="sj-overlay-close"
    onClick={onClick ? e => onClick(e, closeOverlay) : closeOverlay}
  >
    <div className="sj-close">×</div>
    <div className="sj-esc">ESC</div>
  </div>;

export default Close;
