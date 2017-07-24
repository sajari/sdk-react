import React from "react";
import PropTypes from "prop-types";

import { Tracking } from "sajari";

import Values from "../../controllers/values";
import Pipeline from "../../controllers/pipeline";
import SingleFacet from "../../controllers/singleFacet";
import MultiFacet from "../../controllers/multiFacet";

class TabsFacet extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="sj-tabs-container">
        <div className="sj-tabs">
          {this.props.tabs.map(t =>
            <Tab key={t.title} title={t.title} fb={this.props.fb} />
          )}
        </div>
      </div>
    );
  }
}

class Tab extends React.Component {
  constructor(props) {
    super(props);

    this.state = { selected: this.props.fb.isSet(this.props.title) };
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    this.unregister = this.props.fb.register(this.onChange);
  }

  componentWillUnmount() {
    this.unregister();
  }

  onChange() {
    this.setState({ selected: this.props.fb.isSet(this.props.title) });
  }

  render() {
    return (
      <div
        key={this.props.title}
        className={`sj-tab${this.state.selected ? " sj-tab-active" : ""}`}
        onClick={() => {
          this.props.fb.set(this.props.title, !this.state.selected);
        }}
      >
        {this.props.title}
      </div>
    );
  }
}

TabsFacet.propTypes = {
  values: PropTypes.instanceOf(Values).isRequired,
  pipeline: PropTypes.instanceOf(Pipeline).isRequired,
  fb: PropTypes.oneOfType([
    PropTypes.instanceOf(SingleFacet),
    PropTypes.instanceOf(MultiFacet)
  ]).isRequired,
  tracking: PropTypes.instanceOf(Tracking).isRequired,
  tabs: PropTypes.array.isRequired,
  defaultTab: PropTypes.string.isRequired
};

export default TabsFacet;
