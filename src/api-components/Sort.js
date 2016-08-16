import React from 'react';
import { sort } from 'sajari';

import Base from './Base.js';
import Components from '../constants/Components.js';

const Sort = props => {
  const { field, ord, ...others } = props;
  return (
    <Base
      {...others}
      runDefault='update'
      componentName={Components.SORT}
      data={sort(field, ord)}
    />
  );
};

Sort.propTypes = {
  field: React.PropTypes.string.isRequired,
  ord: React.PropTypes.string.isRequired,
};

export default Sort;
