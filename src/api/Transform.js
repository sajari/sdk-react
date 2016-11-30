import React from 'react';

import { transform as transformBuilder } from 'sajari';

import Base from './Base.js';
import Components from './constants/QueryComponentConstants.js';

const Transform = props => {
  const { transform, ...others } = props;
  return (
    <Base
      {...others}
      runDefault='update'
      componentName={Components.TRANSFORM}
      data={transformBuilder(transform)}
    />
  );
};

Transform.propTypes = {
  transform: React.PropTypes.string.isRequired,
};

export default Transform;
