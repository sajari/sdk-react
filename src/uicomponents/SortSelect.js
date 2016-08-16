import React from 'react';

import Sort from '../components/Sort.js';

class SortSelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = { sort: 0 };
    this.onSortChange = this.onSortChange.bind(this);
  }

  onSortChange(evt) {
    this.setState({ sort: Number(evt.target.value) });
  }

  render() {
    const { options, ...others } = this.props;

    const optionElements = options.map((n, i) => (
      <option key={i} value={i}>{`${n.field} ${n.ord}`}</option>
    ));

    return (
      <select value={this.state.sort} onChange={this.onSortChange}>
        {optionElements}
        <Sort
          {...others}
          field={options[this.state.sort].field}
          ord={options[this.state.sort].ord}
        />
      </select>
    );
  }
}

SortSelect.propTypes = {
  options: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
};

export default SortSelect;
