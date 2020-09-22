import React from "react";

export const SpinnerIcon = (props: any) => (
  <svg viewBox="0 0 16 16" height="16" width="16" {...props}>
    <g>
      <path
        fill-opacity=".2"
        d="M8 0a8 8 0 100 16A8 8 0 008 0zm0 2a6 6 0 110 12A6 6 0 018 2z"
      />
      <path d="M8 0a8 8 0 018 8h-2a6 6 0 00-6-6z" />
      <animateTransform
        attributeName="transform"
        attributeType="XML"
        type="rotate"
        from="0 8 8"
        to="360 8 8"
        dur="0.5s"
        repeatCount="indefinite"
      />
    </g>
  </svg>
);

export const EmptyMicIcon = (props: any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    width="16"
    height="16"
    {...props}
  >
    <g className="nc-icon-wrapper">
      <path d="M8,10c2.2,0,4-1.8,4-4V4c0-2.2-1.8-4-4-4S4,1.8,4,4v2C4,8.2,5.8,10,8,10z M6,4c0-1.1,0.9-2,2-2s2,0.9,2,2v2 c0,1.1-0.9,2-2,2S6,7.1,6,6V4z" />{" "}
      <path
        data-color="color-2"
        d="M15.9,7.1C16,6.6,15.6,6.1,15.1,6c-0.5-0.1-1.1,0.3-1.1,0.8C13.5,9.8,11,12,8,12 S2.5,9.8,2.1,6.9C2,6.3,1.5,5.9,0.9,6C0.4,6.1,0,6.6,0.1,7.1c0.5,3.6,3.4,6.3,6.9,6.8V16h2v-2.1C12.5,13.5,15.4,10.7,15.9,7.1z"
      />
    </g>
  </svg>
);

export const MicIcon = (props: any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    width="16"
    height="16"
    {...props}
  >
    <g className="nc-icon-wrapper">
      <path d="M8,10c2.2,0,4-1.8,4-4V4c0-2.2-1.8-4-4-4C5.8,0,4,1.8,4,4v2C4,8.2,5.8,10,8,10z" />{" "}
      <path
        data-color="color-2"
        d="M15.9,7.1C16,6.6,15.6,6.1,15.1,6c-0.5-0.1-1.1,0.3-1.1,0.8C13.5,9.8,11,12,8,12 S2.5,9.8,2.1,6.9C2,6.3,1.5,5.9,0.9,6C0.4,6.1,0,6.6,0.1,7.1c0.5,3.6,3.4,6.3,6.9,6.8V16h2v-2.1C12.5,13.5,15.4,10.7,15.9,7.1z"
      />
    </g>
  </svg>
);

export const SearchIcon = (props: any) => {
  return (
    <svg viewBox="0 0 16 16" width="16" height="16" {...props}>
      <path d="M12.7 11.3c.9-1.2 1.4-2.6 1.4-4.2 0-3.9-3.1-7.1-7-7.1S0 3.2 0 7.1c0 3.9 3.2 7.1 7.1 7.1 1.6 0 3.1-.5 4.2-1.4l3 3c.2.2.5.3.7.3s.5-.1.7-.3c.4-.4.4-1 0-1.4l-3-3.1zm-5.6.8c-2.8 0-5.1-2.2-5.1-5S4.3 2 7.1 2s5.1 2.3 5.1 5.1-2.3 5-5.1 5z" />
    </svg>
  );
};
