import React from 'react'

import { REQUEST_SUCCEEDED, REQUEST_IN_PROGRESS } from '../api/constants/RequestState'
import { resultClicked } from './actions/Analytics'

// import { WrappedPaginator as Paginator } from './Paginator'

const tokenUrl = 'https://www.sajari.com/token/'

/**
 * TokenLink renders an 'a' element that switches to using a token when clicked
 */
class TokenLink extends React.Component {
  constructor(props) {
    super(props)
    this.state = { clicked: false }
    this.click = this.click.bind(this)
  }

  click() {
    this.setState({ clicked: true })
    if (this.props.resultClicked) {
      this.props.resultClicked(this.props.url)
    }
  }

  render() {
    const { token, url, text, children } = this.props;
    const { clicked } = this.state;
    const urlWithToken = clicked && token ? (tokenUrl + token) : url;
    return (
      <a href={urlWithToken} onMouseDown={this.click}>
        {text}
        {children}
      </a>
    )
  }
}

const Title = ({ title, url, token, resultClicked }) => (
  <h3 className='sj-result-title'>
    <TokenLink token={token} url={url} text={title} resultClicked={resultClicked} />
  </h3>
)

const Description = ({ description }) => (
  <p className='sj-result-description'>{description}</p>
)

const Url = ({ url, token, resultClicked }) => (
  <p className='sj-result-url'><TokenLink token={token} url={url} text={url} resultClicked={resultClicked} /></p>
)

class Image extends React.Component {
  constructor(props) {
    super(props)
    this.state = {show: true}
  }

  render() {
    const onError = () => this.setState({ show: false })
    return (
      <img
        className='sj-result-image'
        style={this.state.show ? undefined : { display: 'none' }}
        onError={onError}
        src={this.props.url}
        alt={this.props.title}
      />
    )
  }
}

const Result = ({ title, description, url, token, showImage, image, resultClicked }) => (
  <div className='sj-result'>
    {showImage && image ? (
      <div className="sj-result-image-container">
        <TokenLink token={token} url={url}>
          <Image url={image} title={title} />
        </TokenLink>
      </div>
    ) : null}
    <div className="sj-result-text">
      <Title title={title} url={url} token={token} resultClicked={resultClicked} />
      <Description description={description} />
      <Url url={url} token={token} resultClicked={resultClicked} />
    </div>
  </div>
)

class Results extends React.Component {
  shouldComponentUpdate(nextProps) {
    return nextProps.status !== REQUEST_IN_PROGRESS
  }

  render() {
    const { data, resultClicked, showImages } = this.props

    const error = data && data.searchResponse && data.searchResponse.error
    if (error) {
      return (
        <div className='sj-result-error'>
          An error occured while searching.
        </div>
      )
    }

    if (!data || !data.searchResponse || !data.searchResponse.results) {
      return <div className='sj-result-list' />
    }

    const results = data.searchResponse.results.map((r, index) => {
      const token = r.tokens && r.tokens.click && r.tokens.click.token;

      return (
        <Result
          key={r.values._id || ""+index+r.values.url}
          title={r.values.title}
          description={r.values.description}
          url={r.values.url}
          image={r.values.image}
          showImage={showImages}
          token={token}
          resultClicked={resultClicked}
        />
      );
    });
    return <div className='sj-result-list'>{results}</div>
  }
}

export { Results, Result, Title, Description, Url, TokenLink, Image }
