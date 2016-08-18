import React from 'react';

const ResultRenderer = props => {
  const { results, namespace, fields } = props;
  if (!results || !results[namespace].results) {
    return null;
  }
  const resultsArray = results[namespace].results;

  const fieldsToRender = fields.length ? fields : null;

  const renderedResults = resultsArray.map(r => (
    // Fall back to string version of the result if it doesn't have an _id
    // eslint-disable-next-line no-underscore-dangle
    <div key={r.meta._id || JSON.stringify(r)}>

      {/* render fields supplied from props, fallback to rendering all fields */}
      {(fieldsToRender || Object.keys(r.meta)).map(f => (
        <p key={f}>{r.meta[f]}</p>
      ))}
    </div>
  ));

  return (
    <div>
      {renderedResults}
    </div>
  );
};

ResultRenderer.propTypes = {
  fields: React.PropTypes.arrayOf(React.PropTypes.string),
  results: React.PropTypes.object,
  namespace: React.PropTypes.string,
};

ResultRenderer.defaultProps = {
  fields: [],
  namespace: 'default',
};

export default ResultRenderer;
