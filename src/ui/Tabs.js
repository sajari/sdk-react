import React from 'react'
import { connect } from 'react-redux'

import { setTab } from './actions/Tabs'
import { makeSearchRequest } from '../api/actions/query'


class tabs extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidUpdate() {
    if (this.props.runOnUpdate) {
      this.props.makeSearchRequest()
    }
  }

  render() {
    const { tab, tabs, setTab, onChange } = this.props
    return (
      <div id='sj-tabs-container'>
        <div id='sj-tabs'>
          {tabs.map((Tab) => (
            <div
              key={Tab.name}
              className={`sj-tab${Tab.name === tab ? ' sj-tab-active' : ''}`}
              onClick={() => {
                setTab(Tab.name)
                if (onChange) { onChange(Tab.name) }
              }}>
              <Tab.tab active={Tab.name === tab} />
            </div>
          ))}
        </div>
      </div>
    )
  }
}

const Tabs = connect(
  ({ tabs }) => ({ tab: tabs.tab }),
  (dispatch, props) => ({
    setTab: name => dispatch(setTab(name)),
    makeSearchRequest: () => dispatch(makeSearchRequest(props.namespace)),
  }),
)(tabs)

Tabs.defaultProps = {
  namespace: 'default',
}

export default Tabs
