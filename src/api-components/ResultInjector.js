import React from 'react';

import ResultStore from '../stores/ResultStore.js';

class ResultInjector extends React.Component {
  constructor(props) {
    super(props);
    this.state = { results: null }
    this.resultsUpdated = this.resultsUpdated.bind(this);
  }

  componentDidMount() {
    ResultStore.addChangeListener(this.resultsUpdated);
  }

  componentWillUnmount() {
    ResultStore.removeChangeListener(this.resultsUpdated);
  }

  resultsUpdated() {
    const results = {}
    [].concat(this.props.namespace).forEach(ns => {
      results[ns] = ResultStore.get(ns)
    })
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
