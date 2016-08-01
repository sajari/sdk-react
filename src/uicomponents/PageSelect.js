import React from "react";

import Page from "../components/Page.js";

export default class PageSelect extends React.Component {
  static propTypes = {options: React.PropTypes.arrayOf(React.PropTypes.number)};

  constructor(props) {
    super(props);
    this.state = {page: 1};

    this.onPageChange = this.onPageChange.bind(this);
  }

  onPageChange(evt) {
    this.setState({
      page: Number(evt.target.value),
    });
  }

  render() {
    const options = this.props.options.map((n) => {
      return <option value={n} key={n}>{n}</option>;
    });
    return (
      <div>
        <label>Page</label>
        <select value={this.state.page} onChange={this.onPageChange}>
          {options}
        </select>
        <Page page={this.state.page} />
      </div>
    );
  }
}
