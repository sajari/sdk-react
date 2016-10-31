import React from 'react';
import { sort } from 'sajari';

import Base from './Base.js';
import Components from '../constants/QueryComponentConstants.js';

const Sort = props => {
  const { field, order, ...others } = props;
  return (
    <Base
      {...others}
      runDefault='update'
      componentName={Components.SORT}
      data={sort(field)}
    />
  );
};

Sort.propTypes = {
  field: React.PropTypes.string.isRequired,
};

export default Sort;
