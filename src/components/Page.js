import React from 'react';

import Base from './Base.js';
import Components from '../constants/Components.js';

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

export default Page;
