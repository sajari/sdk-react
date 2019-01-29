import { css, cx } from "emotion";
import * as React from "react";

import { PaginateFn } from "../context/pipeline/context";
import { pageNumbers } from "./utils";

import { PaginatorContainer } from "./Container";
import { LeftChevron, RightChevron } from "./icons";
import { Container, PageButton, PageNumber } from "./styled";
import withGetStyles, {
  WrapperComponentProps,
  DefaultStyleProps
} from "../../shared/withGetStyles";
import { Theme } from "../styles/theme";

export interface PaginatorProps {
  windowSize?: number;

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

const defaultStyles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  controls: (props: StyleProps) => ({
    backgroundColor: "transparent",
    border: "none",
    cursor: "pointer",
    display: ["inline-block", "-moz-inline-stack"],
    fontSize: "1em",
    fontWeight: "bold",
    padding: 10,
    userSelect: "none",
    width: 44,
    height: 44,
    textAlign: "center",
    lineHeight: 0,
    color: props.isDisabled ? "#aaa" : "#777"
  }),
  number: ({ isCurrent, theme }: StyleProps) => {
    return {
      cursor: "pointer",
      display: ["inline-block", "-moz-inline-stack"],
      fontWeight: "bold",
      padding: 10,
      userSelect: "none",
      width: 44,
      height: 44,
      textAlign: "center"
    };
  }
};

interface StyleProps {
  isDisabled?: boolean;
  isCurrent?: boolean;
  theme?: Theme;
}

export function Paginator(
  props: WrapperComponentProps<PaginatorProps, StyleProps>
) {
  const {
    windowSize = 5,
    styles = {},
    PreviousButtonRenderer = PreviousPageButton,
    NextButtonRenderer = NextPageButton,
    PageNumberRenderer = DefaultPageNumber,
    getStyles
  } = props;
  return (
    <PaginatorContainer>
      {({ page, totalPages, paginate }) => {
        return (
          <nav
            aria-label="Pagination Navigation"
            // styles={styles.container}
            className={cx(
              "sj-paginator",
              css(getStyles("title")),
              props.className
            )}
          >
            {page !== 1 && (
              <PreviousButtonRenderer
                // isDisabled={page === 1}
                onClick={prevPage(paginate, page)}
                className={css(
                  getStyles("controls", { isDisabled: page === 1 })
                )}
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
                onClick={nextPage(paginate, page, totalPages)}
                className={css(
                  getStyles("controls", { isDisabled: page === totalPages })
                )}
              />
            )}
          </nav>
        );
      }}
    </PaginatorContainer>
  );
}

export default withGetStyles<PaginatorProps, StyleProps>(
  Paginator,
  defaultStyles as DefaultStyleProps<StyleProps>
);

interface PageButtonProps {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  className: string;
}

function PreviousPageButton(props: PageButtonProps) {
  return (
    <button
      onClick={props.onClick}
      aria-label="Goto Previous Page"
      className={"sj-paginator__page-button " + props.className}
    >
      <LeftChevron />
    </button>
  );
}

function NextPageButton(props: PageButtonProps) {
  return (
    <button
      onClick={props.onClick}
      aria-label="Goto Next Page"
      className={"sj-paginator__page-button " + props.className}
    >
      <RightChevron />
    </button>
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
    paginate(page);
  };
}
