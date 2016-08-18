import React from 'react';

import Base from './Base.js';
import Components from '../constants/QueryComponentConstants.js';

const Page = props => {
  const { page, ...others } = props;
  return (
    <Base
      {...others}
      runDefault='update'
      componentName={Components.PAGE}
      data={page}
    />
  );
};

Page.propTypes = {
  page: React.PropTypes.number.isRequired,
};

Page.defaultProps = {
  page: 1,
};

export default Page;
