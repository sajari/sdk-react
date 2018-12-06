import { css, cx } from "emotion";
import * as React from "react";

import { PaginateFn } from "../context/pipeline/context";
import { pageNumbers } from "./utils";

import { LeftChevron, RightChevron } from "./icons";
import { Container, PageButton, PageNumber } from "./styled";
import { PaginatorContainer } from "./Container";

export interface PaginatorProps {
  className?: string;
  styles?: {
    container?: React.CSSProperties;
    controls?: React.CSSProperties;
    number?: (isCurrent: boolean) => React.CSSProperties;
  };

  PreviousButtonRenderer?: React.ComponentType<PageButtonProps>;
  NextButtonRenderer?: React.ComponentType<PageButtonProps>;
  PageNumberRenderer?: React.ComponentType<PageNumberProps>;
}

export function Paginator(props: PaginatorProps) {
  const {
    styles = {},
    PreviousButtonRenderer = PreviousPageButton,
    NextButtonRenderer = NextPageButton,
    PageNumberRenderer = DefaultPageNumber
  } = props;
  return (
    <PaginatorContainer>
      {({ page, totalPages, paginate }) => {
        return (
          <Container
            className={cx("sj-paginator", props.className)}
            aria-label="Pagination Navigation"
            styles={styles.container}
          >
            {page !== 1 && (
              <PreviousButtonRenderer
                isDisabled={page === 1}
                onClick={prevPage(paginate, page)}
                styles={styles.controls}
              />
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
                  <PageNumberRenderer
                    pageNumber={pageNumber}
                    isCurrent={page === pageNumber}
                    onClick={setPage(paginate, pageNumber)}
                    styles={styles.number}
                  />
                </li>
              ))}
            </ul>
            {page !== totalPages && (
              <NextButtonRenderer
                isDisabled={page === totalPages}
                onClick={nextPage(paginate, page, totalPages)}
                styles={styles.controls}
              />
            )}
          </Container>
        );
      }}
    </PaginatorContainer>
  );
}

interface PageButtonProps {
  isDisabled: boolean;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  styles?: React.CSSProperties;
}

function PreviousPageButton(props: PageButtonProps) {
  return (
    <PageButton
      isDisabled={props.isDisabled}
      onClick={props.onClick}
      aria-label="Goto Previous Page"
      className="sj-paginator__page-button"
      styles={props.styles}
    >
      <LeftChevron />
    </PageButton>
  );
}

function NextPageButton(props: PageButtonProps) {
  return (
    <PageButton
      isDisabled={props.isDisabled}
      onClick={props.onClick}
      aria-label="Goto Next Page"
      className="sj-paginator__page-button"
      styles={props.styles}
    >
      <RightChevron />
    </PageButton>
  );
}

export interface PageNumberProps {
  pageNumber: number;
  onClick: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  isCurrent: boolean;
  styles?: (isCurrent: boolean) => React.CSSProperties;
}

function DefaultPageNumber(props: PageNumberProps) {
  return (
    <PageNumber
      className={cx(
        "sj-paginator__page-number",
        props.isCurrent && "sj-paginator__page-number--current",
        props.styles && css(props.styles(props.isCurrent) as any)
      )}
      isCurrent={props.isCurrent}
      onClick={props.onClick}
      aria-label={
        props.isCurrent
          ? `Current Page, Page ${props.pageNumber}`
          : `Page ${props.pageNumber}`
      }
      aria-current={props.isCurrent ? true : undefined}
    >
      {props.pageNumber}
    </PageNumber>
  );
}

function prevPage(paginate: PaginateFn, page: number) {
  return function closure() {
    if (page === 1) {
      return;
    }

    setPage(paginate, page - 1)();
  };
}

function nextPage(paginate: PaginateFn, page: number, totalPages: number) {
  return function closure() {
    if (page === totalPages) {
      return;
    }

    setPage(paginate, page + 1)();
  };
}

function setPage(paginate: PaginateFn, page: number) {
  return function closure() {
    window.scrollTo(0, 0);
    paginate(page);
  };
}
