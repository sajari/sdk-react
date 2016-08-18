import React from 'react';

import Base from './Base.js';
import Components from '../constants/QueryComponentConstants.js';

const ResultsPerPage = props => {
  const { results, ...others } = props;
  return (
    <Base
      {...others}
      runDefault='all'
      componentName={Components.MAXRESULTS}
      data={results}
    />
  );
};

ResultsPerPage.propTypes = {
  results: React.PropTypes.number.isRequired,
};

ResultsPerPage.defaultProps = {
  results: 10,
};

export default ResultsPerPage;
