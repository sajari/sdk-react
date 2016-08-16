import React from 'react';

import Base from './Base.js';
import Components from '../constants/Components.js';

const Fields = props => {
  const { fields, ...others } = props;
  return (
    <Base
      {...others}
      runDefault='all'
      componentName={Components.FIELDS}
      data={fields}
    />
  );
};

Fields.propTypes = {
  fields: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
};

export default Fields;
