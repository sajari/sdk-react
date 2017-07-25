import React from "react";
import PropTypes from "prop-types";

import { Filter } from "../../controllers/filter";

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
    this.onUpdate = this.onUpdate.bind(this);
  }

  componentDidMount() {
    this.unregister = this.props.filter.register(this.onUpdate);
  }

  componentWillUnmount() {
    this.unregister();
  }

  onUpdate(filter) {
    this.setState({ active: filter.get() });
  }

  render() {
    const { filter, name, options, ...other } = this.props;
    const onClick = e => {
      filter.set(e.target.value, true);
    };
    const optionsRendered = Object.keys(options).map(o => {
      return (
        <option value={o} key={o}>
          {options[o]}
        </option>
      );
    });
    return (
      <select value={this.state.active} onChange={onClick}>
        {optionsRendered}
      </select>
    );
  }
}

class InputFacet extends React.Component {
  constructor(props) {
    super(props);
    this.state = { active: props.filter.isSet(props.name) };
    this.onUpdate = this.onUpdate.bind(this);
  }

  componentDidMount() {
    this.unregister = this.props.filter.register(this.onUpdate);
  }

  componentWillUnmount() {
    this.unregister();
  }

  onUpdate(filter) {
    this.setState({ active: filter.isSet(this.props.name) });
  }

  render() {
    const { filter, name, children, ...other } = this.props;
    const toggle = () => {
      filter.set(name, !this.state.active);
    };
    return <input onChange={toggle} checked={this.state.active} {...other} />;
  }
}

export { CheckboxFacet, RadioFacet, SelectFacet };
