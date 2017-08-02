import React from "react";
import PropTypes from "prop-types";

import { Pipeline, responseUpdatedEvent, Values } from "../../controllers";

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

const RawPaginator = ({ resultsPerPage, page, totalResults, setPage }) => {
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

RawPaginator.propTypes = {
  resultsPerPage: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  totalResults: PropTypes.number.isRequired,
  setPage: PropTypes.func.isRequired
};

const Page = ({ currentPage, page, setPage, children }) =>
  <div
    className={currentPage === page ? "current" : null}
    onClick={() => setPage(page)}
  >
    {children}
  </div>;

Page.propTypes = {
  currentPage: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  setPage: PropTypes.func.isRequired,
  children: PropTypes.node
};

class Paginator extends React.Component {
  /**
   * propTypes
   * @property {Values} values Values object.
   * @property {Pipeline} pipeline Pipeline object.
   */
  static get propTypes() {
    return {
      values: PropTypes.instanceOf(Values).isRequired,
      pipeline: PropTypes.instanceOf(Pipeline).isRequired
    };
  }

  constructor(props) {
    super(props);

    this.state = { response: props.pipeline.getResponse() };
  }

  componentDidMount() {
    this.removeResponseListener = this.props.pipeline.listen(
      responseUpdatedEvent,
      this.responseUpdated
    );
  }

  componentWillUnmount() {
    this.removeResponseListener();
  }

  responseUpdated = response => {
    this.setState({ response });
  };

  setPage = page => {
    const { values, pipeline } = this.props;
    window.scrollTo(0, 0);
    values.set({ page: String(page) });
    pipeline.search(values.get());
  };

  render() {
    const { response } = this.state;

    if (response.isEmpty() || response.isError()) {
      return null;
    }

    const queryValues = response.getQueryValues();

    const page = queryValues.page ? parseInt(queryValues.page, 10) : 1;
    const resultsPerPage = queryValues.resultsPerPage
      ? parseInt(queryValues.resultsPerPage, 10)
      : 10;

    return (
      <RawPaginator
        setPage={this.setPage}
        page={page}
        resultsPerPage={resultsPerPage}
        totalResults={response.getTotalResults()}
      />
    );
  }
}

export default Paginator;
