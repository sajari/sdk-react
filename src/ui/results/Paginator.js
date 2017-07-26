import React from "react";
import PropTypes from "prop-types";

import { Tracking } from "sajari";

import { Pipeline, Values } from "../../controllers";

const pageNumbers = (page, totalPages) => {
  const pages = [];

  let i = 2;
  while (i >= 0) {
    if (page - i > 0) {
      pages.push(page - i);
    }
    i--;
  }

  i = 1;
  while (pages.length < 5 && page + i <= totalPages) {
    pages.push(page + i);
    i++;
  }

  i = 3;
  while (pages.length < 5 && page - i > 0) {
    pages.unshift(page - i);
    i++;
  }
  return pages;
};

const RawPaginator = ({
  resultsPerPage,
  page,
  totalResults,
  setPage,
  pageFn
}) => {
  if (totalResults <= resultsPerPage) {
    return null;
  }

  const totalPages = Math.ceil(totalResults / resultsPerPage);
  if (totalPages === 0) {
    return null;
  }

  const pages = pageNumbers(page, totalPages).map(p =>
    <Page key={p} page={p} currentPage={page} setPage={setPage}>
      {p}
    </Page>
  );

  const prevPage = () => {
    if (page === 1) {
      return;
    }
    setPage(page - 1);
  };

  const nextPage = () => {
    if (page === totalPages) {
      return;
    }
    setPage(page + 1);
  };

  return (
    <div className="sj-paginator">
      <div className={page === 1 ? "disabled" : undefined} onClick={prevPage}>
        &lt;
      </div>
      {pages}
      <div
        className={page === totalPages ? "disabled" : undefined}
        onClick={nextPage}
      >
        &gt;
      </div>
    </div>
  );
};

const Page = ({ currentPage, page, setPage, children }) =>
  <div
    className={currentPage === page ? "current" : null}
    onClick={() => setPage(page)}
  >
    {children}
  </div>;

class Paginator extends React.Component {
  /**
   * propTypes
   * @property {error} [string] Error from search. Usually supplied by Response.
   * @property {Values} values Values object.
   * @property {Pipeline} pipeline Pipeline object.
   * @property {Sajari.Tracking} tracking Tracking object from the sajari package.
   * @property {string} totalResults Number of results. Usually supplied by Response.
   */
  static get propTypes() {
    return {
      error: PropTypes.string,
      values: PropTypes.instanceOf(Values).isRequired,
      pipeline: PropTypes.instanceOf(Pipeline).isRequired,
      tracking: PropTypes.instanceOf(Tracking).isRequired,
      totalResults: PropTypes.string
    };
  }

  render() {
    if (this.props.error) {
      return null;
    }

    const setPage = page => {
      window.scrollTo(0, 0);
      this.props.values.set({ page: String(page) });
      this.props.pipeline.search(this.props.values, this.props.tracking);
    };
    const queryValues = this.props.values.get();

    const page = queryValues.page ? parseInt(queryValues.page, 10) : 1;
    const resultsPerPage = queryValues.resultsPerPage
      ? parseInt(queryValues.resultsPerPage, 10)
      : 10;
    const totalResultsInt = parseInt(this.props.totalResults, 10);

    return (
      <RawPaginator
        setPage={setPage}
        page={page}
        resultsPerPage={resultsPerPage}
        totalResults={totalResultsInt}
      />
    );
  }
}

export default Paginator;
