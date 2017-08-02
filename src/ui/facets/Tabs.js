import React from "react";
import PropTypes from "prop-types";

import { Filter, selectionUpdatedEvent } from "../../controllers";

class TabsFacet extends React.Component {
  /**
   * propTypes
   * @property {Filter} filter
   * @property {Object[]} tabs
   */
  static get propTypes() {
    return {
      filter: PropTypes.instanceOf(Filter).isRequired,
      tabs: PropTypes.array.isRequired
    };
  }

  render() {
    const { tabs, filter } = this.props;
    return (
      <div className="sj-tabs-container">
        <div className="sj-tabs">
          {tabs.map(t =>
            <Tab key={t.name} title={t.displayText} filter={filter} />
          )}
        </div>
      </div>
    );
  }
}

class Tab extends React.Component {
  /**
   * propTypes
   * @property {Filter} filter
   * @property {string} title
   */
  static get propTypes() {
    return {
      filter: PropTypes.instanceOf(Filter).isRequired,
      title: PropTypes.string.isRequired
    };
  }

  constructor(props) {
    super(props);

    this.state = { selected: this.props.filter.isSet(this.props.title) };
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
    this.setState({ selected: this.props.filter.isSet(this.props.title) });
  };

  handleClick = () => {
    this.props.filter.set(this.props.title, !this.state.selected);
  };

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
