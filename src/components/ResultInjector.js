import React from "react";

import ResultStore from "../stores/ResultStore.js";

export default class ResultInjector extends React.Component {
  constructor(props) {
    super(props);
    this._resultsUpdated = this._resultsUpdated.bind(this);
    this.state = {};
  }

  componentDidMount() {
    ResultStore.addChangeListener(this._resultsUpdated);
  }

  componentWillUnmount() {
    ResultStore.removeChangeListener(this._resultsUpdated);
  }

  _resultsUpdated() {
    this.setState({
      results: ResultStore.getResults().toJS(),
      response: ResultStore.getResponse().toJS(),
      fuzzy: ResultStore.getFuzzy(),
      aggregates: ResultStore.getAggregates(),
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
