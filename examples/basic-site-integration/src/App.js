import React from 'react'
import { connect } from 'react-redux'

import Pipeline from 'sajari-react/pipeline/Pipeline'
import Value from 'sajari-react/pipeline/Value'
import Response from 'sajari-react/pipeline/Response'
import { RegisterNamespace } from 'sajari-react/api'
import { Title, Description, Url } from 'sajari-react/ui/Results'
import { REQUEST_IN_PROGRESS, REQUEST_SUCCEEDED } from 'sajari-react/api/constants/RequestState'
import { makePipelineSearchRequest } from 'sajari-react/api/actions/pipeline'
import PipelineInput from 'sajari-react/pipeline/PipelineInput'

import './searchBox.css'

class Result extends React.Component {
  render() {
    const { title, description, url, token } = this.props;
    return (
      <div className='sj-search-result'>
        <Title title={title} url={url} token={token}/>
        <Description description={description}/>
        <Url url={url} token={token}/>
      </div>
    );
  }
}

class Results extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.data) {
      this.setState({ data: nextProps.data });
    }
  }

  render() {
    const { status, data } = this.props;

    let res = data ? data.searchResponse : null;

    if (status === REQUEST_IN_PROGRESS) {
      if (this.state.data) {
        res = this.state.data.searchResponse;
      } else {
        return <div />;
      }
    }

    if (!res) {
      return <div className='sj-result-list' />;
    }

    const results = res.results.map(r => (
      <Result
        key={r.values._id}
        title={r.values.title}
        description={r.values.description}
        url={r.values.url}
        token={r.tokens.click.token}
      />
    ));
    return <div className='sj-result-list'>{results}</div>;
  }
}

class summary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: null, q: '' };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.data) {
      this.setState({ data: nextProps.data });
    }
    if (nextProps.status === REQUEST_SUCCEEDED) {
      this.setState({ q: nextProps.q })
    }
  }

  render() {
    const { status, data } = this.props;
    const { q } = this.state;
    let res = data ? data.searchResponse : null;
    if (status === REQUEST_IN_PROGRESS) {
      if (this.state.data) {
        res = this.state.data.searchResponse;
      } else {
        return <div />;
      }
    }
    if (!res) {
      return <div className='sj-result-summary' />;
    }

    return <div className='sj-result-summary'>{`${res.totalResults} results for `}&quot;<strong>{q}</strong>&quot;{` (${res.time})`}</div>;
  }
}

const Summary = connect(
  ({ pipelines }, { pipeline }) => {
    let q = ''
    try {
      q = pipelines.pipelineValue[`default|${pipeline}`].q
    } catch (e) {}
    return { q }
  }
)(summary)

class app extends React.Component {
  componentDidMount() {
    if (!this.props.config.searchBox) {
      this.props.search()
    }
  }

  render() {
    const { project, collection, pipeline, values, searchBox } = this.props.config

    const renderedValues = Object.keys(values).filter(v => searchBox ? v !== 'q' : v).map(k => (
      <Value key={k} pipeline={pipeline} name={k} value={values[k]}/>
    ))

    return (
      <div>
        <RegisterNamespace project={project} collection={collection}/>
        <Pipeline name={pipeline}/>
        {searchBox ? <PipelineInput pipeline={pipeline} initialValue={values.q} /> : null}
        {renderedValues}
        <Response pipeline={pipeline}>
          <Summary pipeline={pipeline} />
          <Results/>
        </Response>
      </div>
    )
  }
}

const App = connect(
  null,
  (dispatch, props) => ({
    search: () => dispatch(makePipelineSearchRequest('default', props.config.pipeline))
  })
)(app)

export default App
