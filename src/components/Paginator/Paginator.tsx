import * as React from "react";

import { Consumer, IContext } from "../context";
import { PaginateFn } from "../context/context";
import { pageNumbers } from "./utils";

export class Paginator extends React.Component {
  public render() {
    return (
      <Consumer>
        {({ response, paginate }) => {
          if (response === null || response.isEmpty() || response.isError()) {
            return null;
          }

          const queryValues = response.getQueryValues();
          if (queryValues === undefined) {
            return;
          }

          const page = queryValues.get("page")
            ? parseInt(queryValues.get("page") as string, 10)
            : 1;
          const resultsPerPage = queryValues.get("resultsPerPage")
            ? parseInt(queryValues.get("resultsPerPage") as string, 10)
            : 10;
          const totalResults = response.getTotalResults();
          if (totalResults === undefined) {
            return;
          }

          if (totalResults <= resultsPerPage) {
            return null;
          }

          const totalPages = Math.ceil(totalResults / resultsPerPage);
          if (totalPages === 0) {
            return null;
          }

          return (
            <div>
              <div
                style={{ color: page === 1 ? "#aaa" : undefined }}
                onClick={this.prevPage(paginate, page)}
              >
                &lt;
              </div>
              {pageNumbers(page, totalPages).map(pageNumber => (
                <div
                  key={pageNumber}
                  style={{
                    fontWeight: page === pageNumber ? "bold" : "normal"
                  }}
                  onClick={this.setPage(paginate, pageNumber)}
                >
                  {pageNumber}
                </div>
              ))}
              <div
                style={{ color: page === totalPages ? "#aaa" : undefined }}
                onClick={this.nextPage(paginate, page, totalPages)}
              >
                &gt;
              </div>
            </div>
          );
        }}
      </Consumer>
    );
  }

  private prevPage = (paginate: PaginateFn, page: number) => () => {
    if (page === 1) {
      return;
    }

    this.setPage(paginate, page - 1);
  };

  private nextPage = (
    paginate: PaginateFn,
    page: number,
    totalPages: number
  ) => () => {
    if (page === totalPages) {
      return;
    }

    this.setPage(paginate, page + 1);
  };

  private setPage = (paginate: PaginateFn, page: number) => () => {
    window.scrollTo(0, 0);
    paginate(page);
  };
}
