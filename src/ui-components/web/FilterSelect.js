import React from 'react';
import { fieldFilter } from 'sajari';

import Filter from '../api-components/Filter.js';

function defaultOption() {
  return <option key={-1} value={-1} />;
}

class FilterSelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = { filter: -1 };
    this.onFilterChange = this.onFilterChange.bind(this);
  }

  onFilterChange(evt) {
    this.setState({ filter: Number(evt.target.value) });
  }

  render() {
    const { namespace, ...others } = this.props;

    const options = [defaultOption()].concat(
      this.props.options.map((n, i) => (
        <option key={i} value={i}>{n.value}</option>
      ))
    );

    const filter = this.state.filter >= 0 ? (
      <Filter
        {...others}
        namesapce={namespace}
        data={fieldFilter(
          this.props.options[this.state.filter].field,
          this.props.options[this.state.filter].op,
          this.props.options[this.state.filter].value
        )}
      />
    ) : null;

    return (
      <select value={this.state.filter} onChange={this.onFilterChange}>
        {options}
        {filter}
      </select>
    );
  }
}

FilterSelect.propTypes = {
  options: React.PropTypes.arrayOf(React.PropTypes.shape({
    field: React.PropTypes.string,
    op: React.PropTypes.string,
    value: React.PropTypes.string,
  })).isRequired,
  namespace: React.PropTypes.string,
};

export default FilterSelect;
