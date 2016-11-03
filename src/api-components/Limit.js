import React from 'react';

import Base from './Base.js';
import Components from '../constants/QueryComponentConstants.js';

const Limit = props => {
  const { limit, ...others } = props;
  return (
    <Base
      {...others}
      runDefault='all'
      componentName={Components.LIMIT}
      data={limit}
    />
  );
};

Limit.propTypes = {
  limit: React.PropTypes.number,
};

Limit.defaultProps = {
  limit: 10,
};

export default Limit
