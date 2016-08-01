import React from 'react';

import Page from '../components/Page.js';
import RequestStore from '../stores/RequestStore.js';
import pageRange from '../utils/PageRange.js';

// Helper function to change the pointer style depending on whether the button is enabled
function cursorStyle(enabled) {
  return enabled ? {cursor: "pointer"} : {};
}

export default class Pagination extends React.Component {
  constructor(props) {
    super(props);
    this.state = {page: 1};
  }

  setPage(p) {
    if (p === this.state.page) {
      return;
    }
    this.setState({page: p});
  }

  incrementPage(d) {
    this.setState({page: this.state.page + d});
  }

  render() {
    if (!this.props.response) {
      return null;
    }
    const p = this.state.page;
    const lastPage = Math.ceil(Number(this.props.response.totalMatches) / RequestStore.getRequest().max_results);

    const prevActive = p > 1;
    const prevClassName = prevActive ? "" : "disabled";
    const prevButton = (
      <li className={prevClassName} onClick={
        prevActive ? this.incrementPage.bind(this, -1) : null
      } style={cursorStyle(prevActive)}>
        <a aria-label="Previous">
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
    );

    const nextActive = p < lastPage;
    const nextClassName = nextActive ? "" : "disabled";
    const nextButton = (
      <li className={nextClassName} onClick={
        nextActive ? this.incrementPage.bind(this, 1) : null
      } style={cursorStyle(nextActive)}>
        <a aria-label="Next">
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    );

    // The max number of pages to show
    const r = 5;

    let range = pageRange(p, lastPage, r);

    const pages = range.map(n => {
      const active = n === p;
      const className = active ? "active" : "";
      return (
        <li
          onClick={this.setPage.bind(this, n)}
          className={className}
          style={cursorStyle(!active)}
          key={n}
        >
          <a>
            {n}
          </a>
        </li>
      );
    });


    return (
      <div style={{textAlign: "center"}}>
        <ul className="pagination">
          {prevButton}
          {pages}
          {nextButton}
          <Page page={p} />
        </ul>
      </div>
    );
  }
}
