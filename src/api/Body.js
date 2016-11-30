import React from 'react';

import { body as bodyBuilder } from 'sajari';

import Base from './Base.js';
import Components from '../constants/QueryComponentConstants.js';

const Body = props => {
  const { body, weight, ...others } = props;
  return (
    <Base
      {...others}
      componentName={Components.BODY}
      data={bodyBuilder(body, weight)}
    />
  );
};

Body.propTypes = {
  body: React.PropTypes.string.isRequired,
  weight: React.PropTypes.number,
};

Body.defaultProps = {
  body: '',
  weight: 1,
};

export default Body;
