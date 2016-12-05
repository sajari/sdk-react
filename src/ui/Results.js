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
        {this.props.children}
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

class Image extends React.Component {
  constructor(props) {
    super(props)
    this.state = {show: true}
  }

  render() {
    const onError = () => this.setState({ show: false })
    return <img className='sj-result-image' style={this.state.show ? undefined : { display: 'none' }} onError={onError} src={this.props.url} alt={this.props.title} />
  }
}

Image.propTypes = {
  title: React.PropTypes.string.isRequired,
  url: React.PropTypes.string.isRequired
}

const Result = ({ title, description, url, token, showImage, image }) => (
  <div className='sj-result'>
    {showImage ? (
      <TokenLink token={token} url={url}>
        <Image url={image} title={title} />
      </TokenLink>
    ) : null}
    <Title title={title} url={url} token={token} />
    <Description description={description} />
    <Url url={url} token={token} />
    {showImage ? <div className='sj-result-close'/> : null}
  </div>
)

const ResultSummary = ({ body, completion, total, queryTime, page }) => {
  let pageNumber = ''
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
    return nextProps.status === REQUEST_SUCCEEDED || nextProps.status === undefined
  }

  render() {
    const { body, completion, status, data, page, showImage } = this.props

    if (status !== REQUEST_SUCCEEDED) {
      return <p>{status}</p>
    }

    const summaryProps = {
      body,
      completion,
      page,
      count: data.searchResponse.results.length,
      queryTime: data.searchResponse.time,
      total: data.searchResponse.totalResults
    }

    return (
      <div id='sj-results'>
        <ResultSummary {...summaryProps} />
        {data.searchResponse.results.map(r => (
          <Result key={r.values._id} {...r.values} {...r.tokens.click} showImage={showImage}/>
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
  ({ search }) => ({ body: search.body, completion: search.completion, page: search.page }),
)(results)


export { Results, Result, ResultSummary, Title, Description, Url, TokenLink, Image }
