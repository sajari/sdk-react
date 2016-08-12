import React from "react";

import MaxResults from "../components/MaxResults.js";

export default class MaxResultsSelect extends React.Component {
  static propTypes = {options: React.PropTypes.arrayOf(React.PropTypes.number).isRequired};

  constructor(props) {
    super(props);
    this.state = {
      maxResults: 10,
    };

    this.onMaxResultsChange = this.onMaxResultsChange.bind(this);
  }

  onMaxResultsChange(evt) {
    this.setState({maxResults: Number(evt.target.value)});
  }

  render() {
    const options = this.props.options.map((n) => {
      return <option key={n} value={n}>{n}</option>;
    });

    return (
      <div>
        <select value={this.state.maxResults} onChange={this.onMaxResultsChange}>
          {options}
        </select>
        <MaxResults maxResults={this.state.maxResults} />
      </div>
    );
  }
}
