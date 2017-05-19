import React from 'react'

import { State, RESULTS_CHANGED, RESULT_CLICKED, VALUES_CHANGED } from './state'

import { Results as RawResults } from 'sajari-react/ui/Results'

class Response extends React.Component {
  constructor(props) {
    super(props)
    this.state = this._state().getResults() || {};
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
    this.setState(
      this._state().getValues().q
        ? this._state().getResults() || {}
        : { time: null }
    );
  }

  render() {
    const { children, Placeholder } = this.props;

    const error = this._state().getError();

    const time = this.state.time;

    let values = this._state().getValues();
    if (!time && !error) {
      return Placeholder ? <Placeholder /> : null;
    }

    return (
      <div className="sj-pipeline-response">
        {React.Children.map(children, c => {
          if (c === null) {
            return c
          }
          return React.cloneElement(c, {
            ...this.state,
            error
          });
        })}
      </div>
    );
  }
}

class Results extends React.Component {
  render() {
    if (this.props.results || this.props.error) {
      const resultClicked = url => State.ns(this.props.namespace).notify(RESULT_CLICKED, url);
      return (
        <RawResults
          data={{ searchResponse: this.props }}
          resultClicked={resultClicked}
          showImages={this.props.showImages}
        />
      );
    }
    return null;
  }
}

Results.defaultProps = {
  namespace: 'default'
}

Response.defaultProps = {
  namespace: 'default',
}

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
    let values = this._state().getValues();
    const { time, totalResults, error } = this.props;
    const text = values["q.used"] || values["q"]

    if (error) {
      return null;
    }

    const page = parseInt(values.page, 10);
    const pageNumber = page && page > 1 ? `Page ${page} of ` : "";
    const runOverride = e => {
      e.preventDefault();
      this._state().setValues({ q: values["q"], "q.override": "true" }, true);
    };
    const override = values["q.used"] && values["q.used"] !== values["q"]
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

RawPaginator.propTypes = {
  resultsPerPage: React.PropTypes.number.isRequired,
  page: React.PropTypes.number.isRequired,
  totalResults: React.PropTypes.number.isRequired
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
