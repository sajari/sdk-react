import React from "react";
import PropTypes from "prop-types";

import { Filter, selectionUpdatedEvent } from "../../controllers";

class CheckboxFacet extends React.Component {
  /**
   * propTypes
   * @property {Filter} filter
   * @property {string} name
   */
  static get propTypes() {
    return {
      filter: PropTypes.instanceOf(Filter).isRequired,
      name: PropTypes.string.isRequired
    };
  }

  render() {
    return <InputFacet type="checkbox" {...this.props} />;
  }
}

class RadioFacet extends React.Component {
  /**
   * propTypes
   * @property {Filter} filter
   * @property {string} name
   */
  static get propTypes() {
    return {
      filter: PropTypes.instanceOf(Filter).isRequired,
      name: PropTypes.string.isRequired
    };
  }

  render() {
    return <InputFacet type="radio" {...this.props} />;
  }
}

class InputFacet extends React.Component {
  /**
   * propTypes
   * @property {Filter} filter
   * @property {string} name
   */
  static get propTypes() {
    return {
      filter: PropTypes.instanceOf(Filter).isRequired,
      name: PropTypes.string.isRequired,
      children: PropTypes.node
    };
  }

  constructor(props) {
    super(props);

    this.state = { active: props.filter.isSet(props.name) };
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
    this.setState({ active: this.props.filter.isSet(this.props.name) });
  };

  handleChange = () => {
    this.props.filter.set(this.props.name, !this.state.active);
  };

  render() {
    const { filter, name, children, ...rest } = this.props;
    return (
      <input
        onChange={this.handleChange}
        checked={this.state.active}
        {...rest}
      />
    );
  }
}

export { CheckboxFacet, RadioFacet };
