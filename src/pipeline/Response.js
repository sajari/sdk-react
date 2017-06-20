import React from 'react'

import { State, RESULTS_CHANGED, RESULT_CLICKED, VALUES_CHANGED } from './state'

import { Results as RawResults } from '../ui/Results';

class Response extends React.Component {
  constructor(props) {
    super(props)
    this.state = { results: this._state().getResults() || {} };
    this.onResultsChange = this.onResultsChange.bind(this)
  }

  _state() {
    return State.ns(this.props.namespace);
  }

  componentDidMount() {
    this._state().registerListener(RESULTS_CHANGED, this.onResultsChange);
    this._state().registerListener(VALUES_CHANGED, this.onResultsChange);
  }

  componentWillUnmount() {
    this._state().unregisterListener(RESULTS_CHANGED, this.onResultsChange);
    this._state().unregisterListener(VALUES_CHANGED, this.onResultsChange);
  }

  onResultsChange() {
    this.setState({ results: this._state().getResults() || {} });
  }

  render() {
    const { children, Placeholder } = this.props;
    const results = this.state.results;
    const time = results.time;
    const error = this._state().getError();

    if (!time && !error) {
      return Placeholder ? <Placeholder /> : null;
    }

    const propsForChildren = { ...results, error };
    const childrenWithResults = React.Children.map(children, c => {
      if (React.isValidElement(c)) {
        return React.cloneElement(c, propsForChildren);
      }
      return null;
    });

    return <div className="sj-pipeline-response">{childrenWithResults}</div>;
  }
}

Response.defaultProps = {
  namespace: 'default',
}

const Results = props => {
  const { results, error, namespace = "default", showImages } = props;

  if (!results && !error) {
    return null;
  }
  const resultClicked = url =>
    State.ns(namespace).notify(RESULT_CLICKED, url);
  return (
    <RawResults
      data={{ searchResponse: props }}
      resultClicked={resultClicked}
      showImages={showImages}
    />
  );
};

class Summary extends React.Component {
  constructor(props) {
    super(props)
    this.onValuesChange = this.onValuesChange.bind(this)
    this._state = this._state.bind(this)
  }

  _state() {
    return State.ns(this.props.namespace);
  }

  componentDidMount() {
    this._state().registerListener(RESULTS_CHANGED, this.onValuesChange);
  }

  componentWillUnmount() {
    this._state().unregisterListener(RESULTS_CHANGED, this.onValuesChange);
  }

  onValuesChange() {
    this.setState(this._state().getResults() || {});
  }

  render() {
    const values = this._state().getValues();
    const responseValues = this._state().getResponseValues();
    const { time, totalResults, error } = this.props;
    const text = responseValues["q"] || values["q"];

    if (error) {
      return null;
    }

    const page = parseInt(values.page, 10);
    const pageNumber = page && page > 1 ? `Page ${page} of ` : "";
    const runOverride = e => {
      e.preventDefault();
      this._state().setValues({ q: values["q"], "q.override": "true" }, true);
    };
    const override = responseValues["q"] &&
      responseValues["q"].toLowerCase() !== values["q"].toLowerCase()
      ? <span className="sj-result-summary-autocomplete-override">
          {`search instead for `}
          <a onClick={runOverride} href=""> {values["q"]} </a>
        </span>
      : null;

    return (
      <div className="sj-result-summary">
        <span className="sj-result-summary-text">
          {`${pageNumber}${totalResults} results for `}
          "<strong>{text}</strong>"
          {" "}
        </span>
        <span className="sj-result-summary-query-time">{`(${time}) `}</span>
        {override}
      </div>
    )
  }
}

Summary.defaultProps = {
  namespace: 'default'
}


const pageNumbers = (page, totalPages) => {
  const pages = []

  let i = 2
  while (i >= 0) {
    if (page - i > 0) {
      pages.push(page-i)
    }
    i--
  }

  i = 1
  while (pages.length < 5 && page + i <= totalPages) {
    pages.push(page+i)
    i++
  }

  i = 3
  while (pages.length < 5 && page - i > 0) {
    pages.unshift(page-i)
    i++
  }
  return pages
}

const RawPaginator = ({ resultsPerPage, page, totalResults, setPage, pageFn }) => {
  if (totalResults <= resultsPerPage) {
    return null
  }

  const totalPages = Math.ceil(totalResults/resultsPerPage)
  if (totalPages === 0) {
    return null
  }

  const pages = pageNumbers(page, totalPages).map(p =>
    <Page key={p} page={p} currentPage={page} setPage={setPage}>{p}</Page>
  )

  const prevPage = () => {
    if (page === 1) {
      return
    }
    setPage(page-1)
  }

  const nextPage = () => {
    if (page === totalPages) {
      return
    }
    setPage(page+1)
  }

  return (
    <div className='sj-paginator'>
      <div className={page === 1 ? 'disabled' : undefined} onClick={prevPage}>&lt;</div>
      {pages}
      <div className={page === totalPages ? 'disabled' : undefined} onClick={nextPage}>&gt;</div>
    </div>
  )
}

const Page = ({ currentPage, page, setPage, children }) => (
  <div className={currentPage === page ? 'current' : null} onClick={() => setPage(page)}>{ children }</div>
)

class Paginator extends React.Component {
  render() {
    if (this.props.error) {
      return null;
    }
    const _state = State.ns(this.props.namespace);
    const setPage = (page) => {
      window.scrollTo(0, 0);
      _state.setValues({page: ""+page}, true);
    }
    const values = _state.getValues();

    const page = values.page ? parseInt(values.page, 10) : 1;
    const resultsPerPage = parseInt(values.resultsPerPage, 10)
    const totalResultsInt = parseInt(this.props.totalResults, 10)

    return <RawPaginator setPage={setPage} page={page} resultsPerPage={resultsPerPage} totalResults={totalResultsInt} />
  }
}

Paginator.defaultProps = {
  namespace: 'default'
}

export { Response, Summary, Results, Paginator };
