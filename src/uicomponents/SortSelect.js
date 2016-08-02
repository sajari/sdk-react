import React from "react";

import Sort from "../components/Sort.js";

export default class SortSelect extends React.Component {
  static propTypes = {options: React.PropTypes.arrayOf(React.PropTypes.object).isRequired};

  constructor(props) {
    super(props);
    this.state = {
      sort: 0,
    };

    this.onSortChange = this.onSortChange.bind(this);
  }

  onSortChange(evt) {
    this.setState({sort: Number(evt.target.value)});
  }

  render() {
    const options = this.props.options.map((n, i) => {
      return <option key={i} value={i}>{`${n.field} ${n.ord}`}</option>;
    });
    return (
      <div>
        <label>Sort</label>
        <select value={this.state.sort} onChange={this.onSortChange}>
          {options}
        </select>
        <Sort
          field={this.props.options[this.state.sort].field}
          ord={this.props.options[this.state.sort].ord}
        />
      </div>
    );
  }
}
