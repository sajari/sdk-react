import React from "react";
import PropTypes from "prop-types";

import { Filter, selectionUpdatedEvent } from "../../controllers";

class DebugFacet extends React.Component {
  /**
   * propTypes
   * @property {Filter} filter Filter instance to debug.
   */
  static get propTypes() {
    return {
      filter: PropTypes.instanceOf(Filter).isRequired
    };
  }

  constructor(props) {
    super(props);

    this.state = { filter: props.filter.filter() };
  }

  componentDidMount() {
    this.unregister = this.props.filter.listen(
      selectionUpdatedEvent,
      this.filterChanged
    );
  }

  componentWillUnmount() {
    this.unregister();
  }

  filterChanged = () => {
    this.setState({ filter: this.props.filter.filter() });
  };

  render() {
    return (
      <span>
        {this.state.filter || "<empty>"}
      </span>
    );
  }
}

export { DebugFacet };
