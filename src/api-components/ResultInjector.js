import React from 'react';

import ResultStore from '../stores/ResultStore.js';

function resultsForNamespace(ns) {
  const results = ResultStore.getResults(ns);
  const response = ResultStore.getResponse(ns);
  return {
    results: results ? results.toJS() : [],
    response: response ? response.toJS() : {},
    fuzzy: ResultStore.getFuzzy(ns),
    aggregates: ResultStore.getAggregates(ns),
  };
}

class ResultInjector extends React.Component {
  constructor(props) {
    super(props);
    this.resultsUpdated = this.resultsUpdated.bind(this);
  }

  componentDidMount() {
    ResultStore.addChangeListener(this.resultsUpdated);
  }

  componentWillUnmount() {
    ResultStore.removeChangeListener(this.resultsUpdated);
  }

  resultsUpdated() {
    const results = {};
    if (typeof this.props.namespace === 'string') {
      results[this.props.namespace] = resultsForNamespace(this.props.namespace);
    } else if (this.props.namespace instanceof Array) {
      this.props.namespace.forEach(ns => {
        results[ns] = resultsForNamespace(ns);
      });
    }
    this.setState({ results })
  }

  componentWillReceiveProps(nextProps) {
    // If the namespace is a string and is different to the last namespace, clear the stored results
    if (typeof nextProps.namespace === 'string' && nextProps.namespace !== this.props.namespace) {
      this.setState({ results: null })
    }
  }

  render() {
    const results = this.state.results ? this.state.results : null;
    const childrenWithProps = React.Children.map(this.props.children, c => (
      React.cloneElement(c, { results })
    ));
    return (
      <div>
        {childrenWithProps}
      </div>
    );
  }
}

ResultInjector.propTypes = {
  namespace: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.arrayOf(React.PropTypes.string),
  ]),
};

ResultInjector.defaultProps = {
  namespace: 'default',
};

export default ResultInjector;
