import React from 'react';

import ResultsPerPage from '../api-components/ResultsPerPage.js';

class ResultsPerPageSelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      maxResults: 10,
    };

    this.onMaxResultsChange = this.onMaxResultsChange.bind(this);
  }

  onMaxResultsChange(evt) {
    this.setState({ maxResults: Number(evt.target.value) });
  }

  render() {
    const { options, namespace, ...others } = this.props;

    const optionElements = options.map((n) => (
      <option key={n} value={n}>{n}</option>
    ));

    return (
      <select
        value={this.state.maxResults}
        onChange={this.onMaxResultsChange}
      >
        {optionElements}
        <ResultsPerPage
          {...others}
          namespace={namespace}
          maxResults={this.state.maxResults}
        />
      </select>
    );
  }
}

ResultsPerPageSelect.propTypes = {
  options: React.PropTypes.arrayOf(React.PropTypes.number).isRequired,
  namespace: React.PropTypes.string,
};

ResultsPerPageSelect.defaultProps = {
  options: [5, 10, 20, 50],
  namespace: 'default',
};

export default ResultsPerPageSelect;
