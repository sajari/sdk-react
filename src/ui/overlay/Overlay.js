import React from "react";

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

export default Overlay;
