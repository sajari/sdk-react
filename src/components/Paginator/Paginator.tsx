/** @jsx jsx */ jsx;
import { jsx } from "@emotion/core";
import classnames from "classnames";
import * as React from "react";
import { PaginateFn } from "../context/pipeline/context";
import { pageNumbers } from "./utils";

import { CSSObject } from "@emotion/core";
import { PaginatorContainer } from "./Container";
import { LeftChevron, RightChevron } from "./icons";
import { Container, PageButton, PageNumber } from "./styled";

export interface PaginatorProps {
  windowSize?: number;
  className?: string;
  styles?: {
    container?: CSSObject;
    controls?: CSSObject;
    number?: (isCurrent: boolean) => CSSObject;
  };

  PreviousButtonRenderer?: React.ComponentType<PageButtonProps>;
  NextButtonRenderer?: React.ComponentType<PageButtonProps>;
  PageNumberRenderer?: React.ComponentType<PageNumberProps>;
}

export function Paginator(props: PaginatorProps) {
  const {
    windowSize = 5,
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
            className={"sj-paginator " + (props.className || "")}
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
              css={{
                display: "inline-flex",
                listStyle: "none",
                margin: 0,
                padding: 0
              }}
            >
              {pageNumbers(page, totalPages, windowSize).map(
                (pageNumber: number) => (
                  <li key={pageNumber}>
                    <PageNumberRenderer
                      pageNumber={pageNumber}
                      isCurrent={page === pageNumber}
                      onClick={setPage(paginate, pageNumber)}
                      styles={styles.number}
                    />
                  </li>
                )
              )}
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
  styles?: CSSObject;
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
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  isCurrent: boolean;
  styles?: (isCurrent: boolean) => CSSObject;
}

function DefaultPageNumber(props: PageNumberProps) {
  return (
    <PageNumber
      css={props.styles && (props.styles(props.isCurrent) as any)}
      className={classnames("sj-paginator__page-number", {
        "sj-paginator__page-number--current": props.isCurrent
      })}
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
    paginate(page);
  };
}
