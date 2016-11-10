import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'

import { ResultInjector, Run } from 'sajari-react/api-components'
import { Body } from 'sajari-react'

import { connect } from 'react-redux'

import { disableOverlay, setCompletion } from './actions'

/**
 * Add styling that can't be done in react inline styles (animation)
 */
const overlayStyleSheet = document.createElement('style')
overlayStyleSheet.textContent = '@keyframes rolldown{0%{opacity:0;height:20%}100%{opacity:1;height:100%}}'
document.head.appendChild(overlayStyleSheet)

const sjOverlayStyle = {
  position: 'fixed',
  top: '0',
  bottom: '0',
  left: '0',
  overflowX: 'hidden',
  overflowY: 'auto',
  width: '100%',
  height: '100%',
  zIndex: '1000000',
  animationName: 'rolldown',
  animationDuration: '0.4s',
}

const sjOverlaySearchModalStyle = {
  zoom: '1',
  position: 'relative',
  backgroundColor: 'white',
  height: '100%',
}

const sjOverlayCloseStyle = {
  position: 'absolute',
  top: '0',
  right: '0',
  zIndex: '1',
  cursor: 'pointer',
}

const sjOverlaySearchModalInputHolderStyle = (above700) => ({
  padding: '0.9em 0',
  marginLeft: above700 ? '126px' : null,
  paddingTop: above700 ? '0.9em' : '4em',
  marginRight: above700 ? null : null,
  width: above700 ? '100%' : '100%',
  height: '100%',
})

const sjOverlaySearchModalInputHolderInnerStyle = {
  position: 'relative',
  left: '0px',
  height: '100%',
}

const sjOverlaySearchBarAutocompleteStyle = {
  border: '1px solid #D9D9D9',
  color: '#bebebe',
}

const sjOverlaySearchBarInputStyle = {
  border: '1px solid transparent',
  position: 'absolute',
  background: 'transparent',
  color: '#666',
  top: '0',
  left: '0',
}

const sjOverlaySearchBarInputCommon = above700 => ({
  width: above700 ? '500px' : '94%',
  fontSize: '20px',
  padding: '0.4em',
  borderBottomLeftRadius: '2px',
  borderTopLeftRadius: '2px',
  borderBottomRightRadius: '0',
  borderTopRightRadius: '0',
  outline: 'none',
  letterSpacing: '0.6px',
  marginTop: 'auto',
  marginBottom: 'auto',
  marginLeft: above700 ? null : '3%',
  lineHeight: '24px',
  textRendering: 'optimizeLegibility',
  borderRadius: '0',
})

const sjOverlaySearchResultsStyle = {
  position: 'relative',
  width: '100%',
  overflowX: 'hidden',
}

const sjOverlayLogoStyle = (above700) => ({
  position: 'absolute',
  paddingLeft: above700 ? '13px' : '0',
  paddingTop: '6px',
  width: above700 ? '100px' : '100%',
  textAlign: 'center',
})

const sjOverlayLogoImageStyle = {
  height: '54px',
  width: '54px',
  cursor: 'pointer',
}

const sjOverlayHeaderStyle = {
  backgroundColor: '#f1f1f1',
}

const sjOverlayFiltersStyle = {
  backgroundColor: '#fff',
  borderTop: '1px solid #ebebeb',
  borderBottom: '1px solid #ebebeb',
  color: '#777',
}

const sjOverlayFiltersTabsStyle = (above700) => ({
  paddingLeft: above700 ? '126px' : '3%',
})

const sjOverlayFiltersTabStyle = {
  fontSize: '13px',
  height: '54px',
  lineHeight: '54px',
  cursor: 'pointer',
  margin: '0 .2em',
  padding: '0 .6em',
  userSelect: 'none',
  whiteSpace: 'nowrap',
  float: 'left',
}

const sjOverlayFiltersTabActiveStyle = {
  color: '#4285f4',
  borderBottom: '3px solid #4285f4',
}

const sjOverlaySearchResultStyle = (above700) => ({
  paddingLeft: above700 ? '126px' : '3%',
})

class searchInput extends Component {
  constructor(props) {
    super(props)
    this.state = { text: '', completion: '' }
    this.updateText = this.updateText.bind(this)
  }

  componentDidMount() {
    findDOMNode(this.refs.searchInput).focus()
  }

  updateText(e) {
    const text = e.target.value
    // const completion = text + [...text].reverse().join('')
    this.setState({ text })
  }

  render() {
    const { text } = this.state
    const { completion } = this.props
    return (
      <div style={sjOverlaySearchModalInputHolderStyle(this.props.above700)}>
        <div style={sjOverlaySearchModalInputHolderInnerStyle}>
          <Body text={text} run='MOUNT_UPDATE' minLength={2}/>
          <input
            type="search"
            style={{ ...sjOverlaySearchBarInputCommon(this.props.above700), ...sjOverlaySearchBarAutocompleteStyle }}
            value={completion}
          />
          <input
            type="search"
            ref='searchInput'
            style={{ ...sjOverlaySearchBarInputCommon(this.props.above700), ...sjOverlaySearchBarInputStyle }}
            value={text}
            onChange={this.updateText}
            onKeyDown={e => {
              /* If Tab or Right Arrow keys pressed apply completion */
              if (e.keyCode === 9 || e.keyCode === 39) {
                e.preventDefault()
                this.setState({ text: completion })
              }
            }}
          />
        </div>
      </div>
    )
  }
}

const SearchInput = connect(({ completion }) => ({ completion }))(searchInput)

class tabs extends Component {
  constructor(props) {
    super(props)
    this.state = { active: 0, count: 0 }
  }

  render() {
    const { above700, tabs } = this.props
    const { active, count } = this.state
    return (
      <div id='sj-overlay-filters-tabs' style={sjOverlayFiltersTabsStyle(above700)}>
        {tabs.map((Tab, i) => (
          <div
            key={i}
            className='sj-overlay-filter-tab'
            style={{ ...sjOverlayFiltersTabStyle, ...(i === active ? sjOverlayFiltersTabActiveStyle : {}) }}
            onClick={() => this.setState({ active: i, count: count + 1 })}
          >
            <Tab active={i === active}/>
          </div>
        ))}
        {count > 1 ? (
          <Run key={count} runOnUnmount={false}/>
        ) : null}
        <div style={{ clear: 'both '}}/>
      </div>
    )
  }
}

const tabsStateToProps = (state, props) => ({
  completion: state.completion,
})

const Tabs = connect(tabsStateToProps)(tabs)

const resultAStyle = {
  textDecoration: 'none',
}

const resultPStyle = {
  color: '#666',
}

const Result = ({ title, description, url, above700 }) => (
  <div className='sj-overlay-result' style={sjOverlaySearchResultStyle(above700)}>
    <h2><a href={url} style={resultAStyle}>{title}</a></h2>
    <p style={resultPStyle}>{description}</p>
  </div>
)

class resultList extends Component {
  componentWillReceiveProps(nextProps) {
    try {
      nextProps.setCompletion(nextProps.results.default.response.searchRequest.indexQuery.body[0].text)
    } catch (e) {
      nextProps.setCompletion('')
    }
  }

  render() {
    const { results, above700 } = this.props
    if (!results || !results.default) {
      return <div id='sj-overlay-results' style={sjOverlaySearchResultsStyle}/>
    }

    return (
      <div id='sj-overlay-results' style={sjOverlaySearchResultsStyle}>
        {results.default.results.map(r => (
          <Result key={r.values._id} above700={above700} {...r.values}/>
        ))}
      </div>
    )
  }
}

const resultListDispatchToProps = (dispatch, props) => ({
  setCompletion: completion => dispatch(setCompletion(completion)),
})

const ResultList = connect(null, resultListDispatchToProps)(resultList)

class overlay extends Component {
  constructor(props) {
    super(props)
    this.state = { above700: window.innerWidth >= 700 }
    this.mediaQueryChanged = this.mediaQueryChanged.bind(this)
  }

  componentWillMount() {
    const mql = window.matchMedia('(min-width: 700px)')
    mql.addListener(this.mediaQueryChanged)
    this.setState({ mql })
  }

  componentWillUnmount() {
    this.state.mql.removeListener(this.mediaQueryChanged)
  }

  mediaQueryChanged() {
    this.setState({ above700: this.state.mql.matches })
  }

  render() {
    const { active, disableOverlay, tabs } = this.props
    const { above700 } = this.state

    if (!active) {
      return null
    }
    return (
      <div id='sj-overlay' style={{ ...sjOverlayStyle, display: (active ? 'block' : 'none') }}>
        <div id='sj-overlay-search-modal' style={sjOverlaySearchModalStyle}>
          <div id='sj-overlay-close' style={sjOverlayCloseStyle} onClick={disableOverlay}>x</div>
          <div id='sj-overlay-header' style={sjOverlayHeaderStyle}>
            <div id='sj-overlay-logo' style={sjOverlayLogoStyle(above700)}>
              <img id='sj-overlay-logo-image' style={sjOverlayLogoImageStyle} src='https://www.sajari.com/img/sajari-100x100-flat.png' alt='logo' onClick={disableOverlay}/>
            </div>
            <SearchInput above700={above700}/>
          </div>
          <div id='sj-overlay-filters' style={sjOverlayFiltersStyle}>
            <Tabs tabs={tabs} above700={above700}/>
          </div>
          <ResultInjector>
            <ResultList above700={above700}/>
          </ResultInjector>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, props) => ({
  active: state.overlayActive,
})

const mapDispatchToProps = (dispatch, props) => ({
  disableOverlay: () => dispatch(disableOverlay())
})

const Overlay = connect(mapStateToProps, mapDispatchToProps)(overlay)

export default Overlay
