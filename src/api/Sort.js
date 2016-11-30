import React from 'react';

import { sort } from 'sajari';

import Base from './Base.js';
import Components from './constants/QueryComponentConstants.js';

const Sort = props => {
  const { fields, order, ...others } = props;
  return (
    <Base
      {...others}
      runDefault='update'
      componentName={Components.SORT}
      data={fields.map(sort)}
    />
  );
};

Sort.propTypes = {
  field: React.PropTypes.arrayOf(React.PropTypes.string),
};

export default Sort;
