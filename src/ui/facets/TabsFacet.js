import React from 'react'
import PropTypes from "prop-types";

import Values from "../../controllers/values";
import Pipeline from "../../controllers/pipeline";
import Filter from "../../controllers/filter";

class TabsFacet extends React.Component {
  constructor(props) {
    super(props);
    this.state = { selected: this.props.defaultTab };

    const existingFilter = props.filter.getFilter("tab");
    if (existingFilter) {
      props.tabs.forEach(t => {
        if (existingFilter === t.filter) {
          this.state = { selected: t.title };
        }
      });
    }
    this.onClickTab = this.onClickTab.bind(this);
  }

  onClickTab(title, filterValue) {
    this.setState({ selected: title });
    this.props.filter.setFilter("tab", filterValue);
    this.props.values.emitChange({});
    this.props.pipeline.search();
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
                this.onClickTab(t.title, t.filter)
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
  filter: PropTypes.instanceOf(Filter).isRequired,
  tabs: PropTypes.object.isRequired,
  defaultTab: PropTypes.string
}

export default TabsFacet;
