import * as React from "react";

export const LeftChevron: React.SFC = props => (
  <svg viewBox="0 0 8 12" fill="none" width="1em" height="1em" {...props}>
    <path
      d="M7.41 1.41L6 0 0 6l6 6 1.41-1.41L2.83 6l4.58-4.59z"
      fill="currentcolor"
    />
  </svg>
);

export const RightChevron: React.SFC = props => (
  <svg viewBox="0 0 8 12" fill="none" width="1em" height="1em" {...props}>
    <path
      d="M2 0L.59 1.41 5.17 6 .59 10.59 2 12l6-6-6-6z"
      fill="currentcolor"
    />
  </svg>
);
