import React from 'react'
import PropTypes from "prop-types";

import { Tracking } from "sajari";

import Values from "../../controllers/values";
import Pipeline from "../../controllers/pipeline";
import SingleFacet from "../../controllers/singleFacet";
import MultiFacet from "../../controllers/multiFacet";

class TabsFacet extends React.Component {
  constructor(props) {
    super(props);
    if (props.fb.get() !== props.defaultTab) {
      props.fb.set(props.defaultTab);
    }
    this.state = { selected: props.defaultTab };

    this.onClickTab = this.onClickTab.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    this.unregister = this.props.fb.register(this.onChange);
  }

  componentWillUnmount() {
    this.props.fb.set(this.props.defaultTab);
    this.unregister();
  }

  onClickTab(title) {
    this.props.fb.set(title);
    this.props.pipeline.search(this.props.values, this.props.tracking);
  }

  onChange() {
    if (this.props.fb.get() !== this.state.selected) {
      this.setState({ selected: this.props.fb.get() });
    }
  }

  render() {
    return (
      <div className='sj-tabs-container'>
        <div className='sj-tabs'>
          {this.props.tabs.map((t) => (
            <div
              key={t.title}
              className={`sj-tab${t.title === this.state.selected ? ' sj-tab-active' : ''}`}
              onClick={() => {
                this.onClickTab(t.title)
              }}>
              {t.title}
            </div>
          ))}
        </div>
      </div>
    )
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
}

export default TabsFacet;
