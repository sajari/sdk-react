import React from "react";
import PropTypes from "prop-types";

import { Tracking } from "sajari";

import { Values, Pipeline, Filter } from "../../controllers";

class TabsFacet extends React.Component {
  /**
   * propTypes
   * @property {Filter} filter
   * @property {string} name
   */
  static get propTypes() {
    return {
      filter: PropTypes.oneOfType([PropTypes.instanceOf(Filter)]).isRequired,
      tabs: PropTypes.array.isRequired,
    };
  }

  render() {
    return (
      <div className="sj-tabs-container">
        <div className="sj-tabs">
          {this.props.tabs.map(t =>
            <Tab key={t.title} title={t.title} filter={this.props.filter} />
          )}
        </div>
      </div>
    );
  }
}

class Tab extends React.Component {
  constructor(props) {
    super(props);

    this.state = { selected: this.props.filter.isSet(this.props.title) };
  }

  componentDidMount() {
    this.unregister = this.props.filter.register(this.filterChanged);
  }

  componentWillUnmount() {
    this.unregister();
  }

  filterChanged = () => {
    this.setState({ selected: this.props.filter.isSet(this.props.title) });
  }

  handleClick = () => {
    this.props.filter.set(this.props.title, !this.state.selected);
  }

  render() {
    return (
      <div
        key={this.props.title}
        className={`sj-tab${this.state.selected ? " sj-tab-active" : ""}`}
        onClick={this.handleClick}
      >
        {this.props.title}
      </div>
    );
  }
}

export default TabsFacet;
