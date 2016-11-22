import React from 'react'
import { connect } from 'react-redux'

const tokenUrl = 'https://www.sajari.com/token/'

/**
 * TokenLink renders an 'a' element that switches to using a token when clicked
 */
class TokenLink extends React.Component {
  constructor(props) {
    super(props)
    this.state = { clicked: false }
  }

  render() {
    const url = this.state.clicked ? (tokenUrl + this.props.token) : this.props.url
    return (
      <a href={url} onMouseDown={() => this.setState({ clicked: true })}>
        {this.props.text}
      </a>
    )
  }
}

TokenLink.propTypes = {
  text: React.PropTypes.string.isRequired,
  url: React.PropTypes.string.isRequired,
}

const Title = ({ title, url, token }) => (
  <h2 className='sj-overlay-result-title'>
    <TokenLink token={token} url={url} text={title} />
  </h2>
)

const Description = ({ description }) => (
  <p className='sj-overlay-result-description'>{description}</p>
)

const Url = ({ url, token }) => (
  <p className='sj-overlay-result-url'><TokenLink token={token} url={url} text={url} /></p>
)

const Result = ({ title, description, url, token}) => (
  <div className='sj-overlay-result'>
    <Title title={title} url={url} token={token} />
    <Description description={description} />
    <Url url={url} token={token} />
  </div>
)

const ResultSummary = ({ body, completion, count, total, queryTime }) => {
  const resultsFor = completion || body
  if (resultsFor) {
    return <div id='sj-overlay-result-summary'>{`${total} results for `}&quot;<strong>{resultsFor}</strong>&quot;{` (${queryTime})`}</div>
  }
  return <div id='sj-overlay-result-summary' />
}

class results extends React.Component {
  render() {
    const { results, body, completion, namespace } = this.props
    if (!results || body === '') {
      return <div id='sj-overlay-results' />
    }

    const nsResults = results[namespace]

    // TODO(tbillington): Remove asap
    if (!nsResults.results) {
      nsResults.results = []
    }
    if (!nsResults.response) {
      nsResults.response = {}
    }


    const summaryProps = {
      body,
      completion,
      count: nsResults.results.length,
      queryTime: nsResults.response.time,
      total: nsResults.response.totalResults
    }

    return (
      <div id='sj-overlay-results'>
        <ResultSummary {...summaryProps} />
        {nsResults.results.map(r => (
          <Result key={r.values._id} {...r.values} {...r.tokens.click} />
        ))}
      </div>
    )
  }
}

results.defaultProps = {
  namespace: 'default'
}

const Results = connect(
  ({ overlay }) => ({body: overlay.body, completion: overlay.completion}),
)(results)

export { Results, Result, ResultSummary, Title, Description, Url, TokenLink }
