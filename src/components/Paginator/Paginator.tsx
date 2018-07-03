import { css } from "emotion";
import * as React from "react";

import { Consumer } from "../context";
import { PaginateFn } from "../context/pipeline/context";
import { pageNumbers } from "./utils";

import { Container, PageButton, PageNumber } from "./styled";

export interface PaginatorProps {
  styles?: {
    container?: React.CSSProperties;
    controls?: React.CSSProperties;
    number?: React.CSSProperties;
  };
}

export class Paginator extends React.Component<PaginatorProps> {
  public render() {
    const { styles = {} } = this.props;
    return (
      <Consumer>
        {({ search: { response, config }, paginate }) => {
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

          const page = queryValues.get(config.pageParam)
            ? parseInt(queryValues.get(config.pageParam) as string, 10)
            : 1;
          const resultsPerPage = queryValues.get(config.resultsPerPageParam)
            ? parseInt(
                queryValues.get(config.resultsPerPageParam) as string,
                10
              )
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
            <Container
              aria-label="Pagination Navigation"
              styles={styles.container}
            >
              {page !== 1 && (
                <PageButton
                  isDisabled={page === 1}
                  onClick={this.prevPage(paginate, page)}
                  aria-label="Goto Previous Page"
                  styles={styles.controls}
                >
                  &lt;
                </PageButton>
              )}
              <ul
                className={css({
                  display: "inline-flex",
                  listStyle: "none",
                  margin: 0,
                  padding: 0
                })}
              >
                {pageNumbers(page, totalPages).map((pageNumber: number) => (
                  <li key={pageNumber}>
                    <PageNumber
                      isCurrent={page === pageNumber}
                      onClick={this.setPage(paginate, pageNumber)}
                      aria-label={
                        page === pageNumber
                          ? `Current Page, Page ${pageNumber}`
                          : `Page ${pageNumber}`
                      }
                      aria-current={page === pageNumber ? true : undefined}
                      styles={styles.number}
                    >
                      {pageNumber}
                    </PageNumber>
                  </li>
                ))}
              </ul>
              {page !== totalPages && (
                <PageButton
                  isDisabled={page === totalPages}
                  onClick={this.nextPage(paginate, page, totalPages)}
                  aria-label="Goto Next Page"
                  styles={styles.controls}
                >
                  &gt;
                </PageButton>
              )}
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
