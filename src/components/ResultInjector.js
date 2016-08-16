import React from 'react';

import ResultStore from '../stores/ResultStore.js';

function resultsForNamespace(ns) {
  const results = ResultStore.getResults(ns);
  return {
    results: results ? results.toJS() : [],
    response: ResultStore.getResponse(ns).toJS(),
    fuzzy: ResultStore.getFuzzy(ns),
    aggregates: ResultStore.getAggregates(ns),
  };
}

export default class ResultInjector extends React.Component {
  static propTypes = {
    namespace: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.arrayOf(React.PropTypes.string)
    ]),
  }

  constructor(props) {
    super(props);
    this.resultsUpdated = this.resultsUpdated.bind(this);
    this.state = {
      namespace: props.namespace || 'default',
    };
  }

  componentDidMount() {
    ResultStore.addChangeListener(this.resultsUpdated);
  }

  componentWillUnmount() {
    ResultStore.removeChangeListener(this.resultsUpdated);
  }

  resultsUpdated() {
    const results = {};
    if (typeof this.state.namespace === 'string') {
      results[this.state.namespace] = resultsForNamespace(this.state.namespace);
    } else if (typeof this.state.namespace === 'object') {
      this.state.namespace.forEach(ns => {
        results[ns] = resultsForNamespace(ns);
      });
    }
    this.setState({
      namespace: this.state.namespace,
      results,
    });
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
