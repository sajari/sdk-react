import * as React from "react";

import { Consumer } from "../context";
import { PaginateFn } from "../context/pipeline/context";
import { pageNumbers } from "./utils";

import { Container, PageButton, PageNumber } from "./styled";

export class Paginator extends React.Component {
  public render() {
    return (
      <Consumer>
        {({ search: { response }, paginate }) => {
          if (
            response === null ||
            response === undefined ||
            response.isEmpty() ||
            response.isError()
          ) {
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
            <Container>
              <PageButton
                isDisabled={page === 1}
                onClick={this.prevPage(paginate, page)}
              >
                &lt;
              </PageButton>
              {pageNumbers(page, totalPages).map(pageNumber => (
                <PageNumber
                  key={pageNumber}
                  isCurrent={page === pageNumber}
                  onClick={this.setPage(paginate, pageNumber)}
                >
                  {pageNumber}
                </PageNumber>
              ))}
              <PageButton
                isDisabled={page === totalPages}
                onClick={this.nextPage(paginate, page, totalPages)}
              >
                &gt;
              </PageButton>
            </Container>
          );
        }}
      </Consumer>
    );
  }

  private prevPage = (paginate: PaginateFn, page: number) => () => {
    if (page === 1) {
      return;
    }

    this.setPage(paginate, page - 1)();
  };

  private nextPage = (
    paginate: PaginateFn,
    page: number,
    totalPages: number
  ) => () => {
    if (page === totalPages) {
      return;
    }

    this.setPage(paginate, page + 1)();
  };

  private setPage = (paginate: PaginateFn, page: number) => () => {
    window.scrollTo(0, 0);
    paginate(page);
  };
}
