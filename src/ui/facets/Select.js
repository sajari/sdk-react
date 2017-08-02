import React from "react";
import PropTypes from "prop-types";

import { Filter, selectionUpdatedEvent } from "../../controllers";

class SelectFacet extends React.Component {
  /**
   * propTypes
   * @property {Filter} filter
   * @property {Object} options
   */
  static get propTypes() {
    return {
      filter: PropTypes.instanceOf(Filter).isRequired,
      options: PropTypes.object.isRequired
    };
  }

  constructor(props) {
    super(props);

    this.state = { current: props.filter.get() };
  }

  componentDidMount() {
    this.unregister = this.props.filter.listen(
      selectionUpdatedEvent,
      this.selectionUpdated
    );
  }

  componentWillUnmount() {
    this.unregister();
  }

  selectionUpdated = () => {
    this.setState({ current: this.props.filter.get() });
  };

  handleChange = e => {
    this.props.filter.set(e.target.value, true);
  };

  render() {
    const { options } = this.props;

    const optionsRendered = Object.keys(options).map(o => {
      return (
        <option value={o} key={o}>
          {options[o]}
        </option>
      );
    });

    return (
      <select
        value={
          this.state.current.length > 0 ? this.state.current[0] : undefined
        }
        onChange={this.handleChange}
      >
        {optionsRendered}
      </select>
    );
  }
}

export default SelectFacet;
