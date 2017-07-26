import React from "react";
import PropTypes from "prop-types";

import { Filter } from "../../controllers";

class CheckboxFacet extends React.Component {
  /**
   * propTypes
   * @property {Filter} filter
   * @property {string} name
   */
  static get propTypes() {
    return {
      filter: PropTypes.oneOfType([PropTypes.instanceOf(Filter)]).isRequired,
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
      filter: PropTypes.oneOfType([PropTypes.instanceOf(Filter)]).isRequired,
      name: PropTypes.string.isRequired
    };
  }

  render() {
    return <InputFacet type="radio" {...this.props} />;
  }
}

class SelectFacet extends React.Component {
  /**
   * propTypes
   * @property {Filter} filter
   * @property {string} name
   * @property {Object} options
   */
  static get propTypes() {
    return {
      filter: PropTypes.oneOfType([PropTypes.instanceOf(Filter)]).isRequired,
      name: PropTypes.string.isRequired,
      options: PropTypes.object.isRequired
    };
  }

  constructor(props) {
    super(props);

    this.state = { active: props.filter.isSet(props.name) };
  }

  componentDidMount() {
    this.unregister = this.props.filter.register(this.filterChanged);
  }

  componentWillUnmount() {
    this.unregister();
  }

  filterChanged = filter => {
    this.setState({ active: filter.get() });
  };

  handleChange = e => {
    filter.set(e.target.value, true);
  };

  render() {
    const { filter, name, options, ...other } = this.props;

    const optionsRendered = Object.keys(options).map(o => {
      return (
        <option value={o} key={o}>
          {options[o]}
        </option>
      );
    });
    return (
      <select value={this.state.active} onChange={this.handleChange}>
        {optionsRendered}
      </select>
    );
  }
}

class InputFacet extends React.Component {
  constructor(props) {
    super(props);

    this.state = { active: props.filter.isSet(props.name) };
  }

  componentDidMount() {
    this.unregister = this.props.filter.register(this.filterChanged);
  }

  componentWillUnmount() {
    this.unregister();
  }

  filterChanged = filter => {
    this.setState({ active: filter.isSet(this.props.name) });
  };

  handleChange = () => {
    this.props.filter.set(this.props.name, !this.state.active);
  };

  render() {
    const { filter, name, children, ...other } = this.props;
    return (
      <input
        onChange={this.handleChange}
        checked={this.state.active}
        {...other}
      />
    );
  }
}

export { CheckboxFacet, RadioFacet, SelectFacet };
