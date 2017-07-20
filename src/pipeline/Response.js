import React from 'react'

import { Results as RawResults } from "../ui/results";
import { resultsEvent, errorEvent } from "../controllers/pipeline";

class Response extends React.Component {
  constructor(props) {
    super(props)
    this.state = { results: props.pipeline.getResults() || {} };
    this.onResultsChange = this.onResultsChange.bind(this)
  }

  componentDidMount() {
    this.removeErrorListener = this.props.pipeline.listen(errorEvent, this.onResultsChange);
    this.removeResultsListener = this.props.pipeline.listen(resultsEvent, this.onResultsChange);
  }

  componentWillUnmount() {
    this.removeErrorListener();
    this.removeResultsListener();
  }

  onResultsChange() {
    const response = this.props.pipeline.getResults() || {};
    this.setState({ results: response });
  }

  render() {
    const { children, Placeholder, pipeline } = this.props;
    const results = this.state.results;
    const time = results.time;
    const error = pipeline.getError();

    if (!time && !error) {
      return Placeholder ? <Placeholder /> : null;
    }

    const propsForChildren = { ...results, error, pipeline };
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
  const { results, error, showImages, pipeline } = props;

  if (!results && !error) {
    return null;
  }
  const resultClicked = url => {
    pipeline.emitResultClicked(url);
  };
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
    this.onResultsChange = this.onResultsChange.bind(this)
  }

  componentDidMount() {
    this.removeResultsListener = this.props.pipeline.listen(resultsEvent, this.onResultsChange);
  }

  componentWillUnmount() {
    this.removeResultsListener();
  }

  onResultsChange() {
    this.setState(this.props.pipeline.getResults() || {});
  }

  render() {
    const { time, totalResults, error, values, pipeline } = this.props;
    const queryValues = values.get() || {};
    const responseValues = pipeline.getResponseValues() || {};
    const text = responseValues["q"] || queryValues["q"];

    if (error) {
      return null;
    }

    const page = parseInt(queryValues.page, 10);
    const pageNumber = page && page > 1 ? `Page ${page} of ` : "";
    const runOverride = e => {
      e.preventDefault();
      values.set({ q: queryValues["q"], "q.override": "true" });
      pipeline.search();
    };
    const override = responseValues["q"] &&
      responseValues["q"].toLowerCase() !== queryValues["q"].toLowerCase()
      ? <span className="sj-result-summary-autocomplete-override">
          {`search instead for `}
          <a onClick={runOverride} href=""> {queryValues["q"]} </a>
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

// Summary.defaultProps = {
//   namespace: 'default'
// }


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

    const setPage = (page) => {
      window.scrollTo(0, 0);
      this.props.values.set({ page: String(page) });
      this.props.pipeline.search();
    }
    const queryValues = this.props.values.get();

    const page = queryValues.page ? parseInt(queryValues.page, 10) : 1;
    const resultsPerPage = queryValues.resultsPerPage ? parseInt(queryValues.resultsPerPage, 10) : 10;
    const totalResultsInt = parseInt(this.props.totalResults, 10)

    return <RawPaginator setPage={setPage} page={page} resultsPerPage={resultsPerPage} totalResults={totalResultsInt} />
  }
}

export { Response, Results, Summary, Paginator };
