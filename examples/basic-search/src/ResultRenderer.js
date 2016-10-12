import React, { Component } from 'react'
import './ResultRenderer.css'

const Result = ({ values }) => {
  const valueList = []

  // eslint-disable-next-line guard-for-in
  for (let key in values) {
    valueList.push([key, String(values[key])])
  }

  const renderedValues = valueList.map(([k, v]) => (
    <p key={k}>
      <strong>{k}</strong>
      <span>{v}</span>
    </p>
  ))

  return (
    <div className='result'>
      {renderedValues}
    </div>
  )
}

class ResultRenderer extends Component {
  render() {
    const results = this.props.results
    if (!results || !results.default) {
      return null
    }

    const renderedResults = this.props.results.default.results.map(r => (
      <Result
        key={r.values['_id']}
        {...r}
      />
    ))

    return (
      <div className='results'>
        {renderedResults}
      </div>
    )
  }
}

export default ResultRenderer
