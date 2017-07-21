import React from "react";
import PropTypes from "prop-types";

import Pipeline from "../../controllers/pipeline";

import Result from "./Result";

const Results = props => {
  const { results, error, showImages, pipeline } = props;

  if (!results && !error) {
    return null;
  }
  const resultClicked = url => {
    pipeline.emitResultClicked(url);
  };
  return (
    <ResultsRenderer
      data={{ searchResponse: props }}
      resultClicked={resultClicked}
      showImages={showImages}
    />
  );
};

Results.propTypes = {
  pipeline: PropTypes.instanceOf(Pipeline).isRequired,
  showImages: PropTypes.bool
};

const ResultsRenderer = ({
  data,
  resultClicked,
  showImages,
  ResultRenderer = Result
}) => {
  const error = data && data.searchResponse && data.searchResponse.error;
  if (error) {
    return (
      <div className="sj-result-error">An error occured while searching.</div>
    );
  }

  if (!data || !data.searchResponse || !data.searchResponse.results) {
    return <div className="sj-result-list" />;
  }

  const results = data.searchResponse.results.map((r, index) => {
    const token = r.tokens && r.tokens.click && r.tokens.click.token;

    return (
      <ResultRenderer
        key={r.values._id || "" + index + r.values.url}
        title={r.values.title}
        description={r.values.description}
        url={r.values.url}
        image={r.values.image}
        showImage={showImages}
        token={token}
        resultClicked={resultClicked}
      />
    );
  });
  return (
    <div className="sj-result-list">
      {results}
    </div>
  );
};

export default Results;
