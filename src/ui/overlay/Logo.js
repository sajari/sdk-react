import React from "react";

const Logo = ({ closeOverlay, src, alt, className }) =>
  <div id="sj-overlay-logo">
    <img
      id="sj-overlay-logo-image"
      onClick={closeOverlay}
      src={src}
      alt={alt}
      className={className}
    />
  </div>;

export default Logo;
