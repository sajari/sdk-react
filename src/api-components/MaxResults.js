import React from 'react';

import Base from './Base.js';
import Components from '../constants/QueryComponentConstants.js';

const MaxResults = props => {
  const { maxResults, ...others } = props;
  return (
    <Base
      {...others}
      runDefault='all'
      componentName={Components.MAXRESULTS}
      data={maxResults}
    />
  );
};

MaxResults.propTypes = {
  maxResults: React.PropTypes.number.isRequired,
};

export default MaxResults;
