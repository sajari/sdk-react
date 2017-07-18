import React from 'react'

import { filter, pipeline } from "./resources";

class Tabs extends React.Component {
  constructor(props) {
    super(props);
    this.state = { selected: this.props.defaultTab };

    const existingFilter = filter.getFilter("tab");
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
    filter.setFilter("tab", filterValue);
    pipeline.search();
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

export default Tabs;
