import React from 'react'
import { connect } from 'react-redux'

import { Run } from '../api'
import { setTab } from './actions/Tabs'


class tabs extends React.Component {
  constructor(props) {
    super(props)
    this.state = { count: 0 }
  }

  render() {
    const { tab, tabs, setTab, onChange, ...others } = this.props
    return (
      <div id='sj-overlay-filters-tabs'>
        {tabs.map((Tab) => (
          <div
            key={Tab.name}
            className={`sj-overlay-filter-tab${Tab.name === tab ? ' sj-overlay-filter-tab-active' : ''}`}
            onClick={() => {
                this.setState({ count: this.state.count + 1 })
                setTab(Tab.name)
                if (onChange) { onChange(Tab.name) }
              }
            }
          >
            <Tab.tab active={Tab.name === tab} />
            {Tab.name === tab && this.state.count > 0 ? <Run key={Tab.name} runOnMount runOnUnmount={false} {...others} /> : null}
          </div>
        ))}
      </div>
    )
  }
}

const Tabs = connect(
  ({ tabs }) => ({ tab: tabs.tab }),
  dispatch => ({ setTab: name => dispatch(setTab(name)) }),
)(tabs)

export default Tabs
