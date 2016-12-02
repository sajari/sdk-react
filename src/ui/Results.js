import React from 'react'
import { connect } from 'react-redux'

import { REQUEST_SUCCEEDED } from '../api/constants/RequestState'
import { resultClicked } from './actions/Analytics'

import { WrappedPaginator as Paginator } from './Paginator'

const tokenUrl = 'https://www.sajari.com/token/'

/**
 * TokenLink renders an 'a' element that switches to using a token when clicked
 */
class tokenLink extends React.Component {
  constructor(props) {
    super(props)
    this.state = { clicked: false }
    this.click = this.click.bind(this)
  }

  click() {
    this.setState({ clicked: true })
    this.props.resultClicked(this.props.url)
  }

  render() {
    const url = this.state.clicked ? (tokenUrl + this.props.token) : this.props.url
    return (
      <a href={url} onMouseDown={this.click}>
        {this.props.text}
      </a>
    )
  }
}

const TokenLink = connect(
  null,
  dispatch => ({
    resultClicked: url => dispatch(resultClicked(url)),
  })
)(tokenLink)

TokenLink.propTypes = {
  text: React.PropTypes.string.isRequired,
  url: React.PropTypes.string.isRequired,
}

const Title = ({ title, url, token }) => (
  <h2 className='sj-result-title'>
    <TokenLink token={token} url={url} text={title} />
  </h2>
)

const Description = ({ description }) => (
  <p className='sj-result-description'>{description}</p>
)

const Url = ({ url, token }) => (
  <p className='sj-result-url'><TokenLink token={token} url={url} text={url} /></p>
)

const Result = ({ title, description, url, token}) => (
  <div className='sj-result'>
    <Title title={title} url={url} token={token} />
    <Description description={description} />
    <Url url={url} token={token} />
  </div>
)

const ResultSummary = ({ body, completion, count, total, queryTime, page }) => {
  let pageNumber = ""
  if (page && page > 1) {
    pageNumber = `Page ${page} of `
  }

  const resultsFor = completion || body

  if (resultsFor) {
    return <div id='sj-result-summary'>{`${pageNumber}${total} results for `}&quot;<strong>{resultsFor}</strong>&quot;{` (${queryTime})`}</div>
  }
  return <div id='sj-result-summary' />
}

class results extends React.Component {
  shouldComponentUpdate(nextProps) {
    return nextProps.status === REQUEST_SUCCEEDED
  }

  render() {
    const { results, body, completion, namespace, status, data } = this.props

    if (status !== REQUEST_SUCCEEDED) {
      return <p>{status}</p>
    }

    const summaryProps = {
      body,
      completion,
      count: data.searchResponse.results.length,
      queryTime: data.searchResponse.time,
      total: data.searchResponse.totalResults
    }

    return (
      <div id='sj-results'>
        <ResultSummary {...summaryProps} />
        {data.searchResponse.results.map(r => (
          <Result key={r.values._id} {...r.values} {...r.tokens.click} />
        ))}
        <Paginator />
      </div>
    )
  }
}

results.defaultProps = {
  namespace: 'default'
}

const Results = connect(
  ({ search }) => ({ body: search.body, completion: search.completion }),
)(results)


export { Results, Result, ResultSummary, Title, Description, Url, TokenLink }
