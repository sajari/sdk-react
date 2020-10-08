import React from 'react';
// import { ReactComponent as Check } from './check.svg';

// Workout to pass the build as we will need to setup a plugin for svg import
const Check = (props: any) => (
  <svg viewBox="0 0 16 16" width="1em" height="1em" {...props}>
    <path d="M14.3 2.3L5 11.6 1.7 8.3c-.4-.4-1-.4-1.4 0s-.4 1 0 1.4l4 4c.2.2.4.3.7.3s.5-.1.7-.3l10-10c.4-.4.4-1 0-1.4s-1-.4-1.4 0z" />
  </svg>
);

export { Check };
