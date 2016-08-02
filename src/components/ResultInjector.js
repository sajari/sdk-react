import React from "react";

import ResultStore from "../stores/ResultStore.js";

export default class ResultInjector extends React.Component {
  static propTypes = {
    namespace: React.PropTypes.string,
  }

  constructor(props) {
    super(props);
    this._resultsUpdated = this._resultsUpdated.bind(this);
    this.state = {
      namespace: props.namespace ? props.namespace : "default",
    };
  }

  componentDidMount() {
    ResultStore.addChangeListener(this._resultsUpdated);
  }

  componentWillUnmount() {
    ResultStore.removeChangeListener(this._resultsUpdated);
  }

  _resultsUpdated() {
    this.setState({
      results: ResultStore.getResults(this.state.namespace).toJS(),
      response: ResultStore.getResponse(this.state.namespace).toJS(),
      fuzzy: ResultStore.getFuzzy(this.state.namespace),
      aggregates: ResultStore.getAggregates(this.state.namespace),
    });
  }

  render() {
    const childrenWithProps = React.Children.map(this.props.children, c => {
      return React.cloneElement(c, {
        results: this.state.results,
        response: this.state.response,
        fuzzy: this.state.fuzzy,
        aggregates: this.state.aggregates,
      });
    });
    return (
      <div>
        {childrenWithProps}
      </div>
    );
  }
}
