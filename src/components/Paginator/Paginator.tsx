import { css, cx } from "emotion";
import * as React from "react";

import { PaginateFn } from "../context/pipeline/context";
import { pageNumbers } from "./utils";

import { PaginatorContainer } from "./Container";
import { LeftChevron, RightChevron } from "./icons";
// @ts-ignore: module missing definitions
import chroma from "chroma-js";
import idx from "idx";

import {
  withGetStyles,
  WrapperComponentProps,
  DefaultStyleProps
} from "../../shared/withGetStyles";
import { Theme } from "../styles/theme";
import { withTheme } from "emotion-theming";

export interface PaginatorProps {
  windowSize?: number;
  baseClass?: string;
  className?: string;
  theme?: Theme;
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
    // @ts-ignore: idx
    const themeColor = idx(theme, _ => _.colors.brand.primary);
    const textColor =
      chroma.contrast("#fff", themeColor || "#333") > 4.5 ? "#fff" : "#000";

    return {
      cursor: "pointer",
      display: ["inline-block", "-moz-inline-stack"],
      fontWeight: "bold",
      padding: 10,
      userSelect: "none",
      width: 44,
      height: 44,
      textAlign: "center",
      borderRadius: 5,
      backgroundColor: isCurrent ? themeColor || "#333" : "inherit",
      color: isCurrent ? textColor : "#585858"
    };
  }
};

interface StyleProps {
  isDisabled?: boolean;
  isCurrent?: boolean;
  theme?: Theme;
}

function PaginatorInner(
  props: WrapperComponentProps<PaginatorProps, StyleProps>
) {
  const {
    windowSize = 5,
    PreviousButtonRenderer = PreviousPageButton,
    NextButtonRenderer = NextPageButton,
    PageNumberRenderer = DefaultPageNumber,
    getStyles,
    theme,
    baseClass = "sj-paginator"
  } = props;
  return (
    <PaginatorContainer>
      {({ page, totalPages, paginate }) => {
        return (
          <nav
            aria-label="Pagination Navigation"
            // styles={styles.container}
            className={cx(baseClass, css(getStyles("title")), props.className)}
          >
            {page !== 1 && (
              <PreviousButtonRenderer
                isDisabled={page === 1}
                baseClass={baseClass}
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
                      baseClass={baseClass}
                      pageNumber={pageNumber}
                      isCurrent={page === pageNumber}
                      onClick={setPage(paginate, pageNumber)}
                      className={css(
                        getStyles("number", {
                          isCurrent: page === pageNumber,
                          theme
                        })
                      )}
                    />
                  </li>
                )
              )}
            </ul>
            {page !== totalPages && (
              <NextButtonRenderer
                isDisabled={page === totalPages}
                baseClass={baseClass}
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

export const Paginator = withTheme(
  withGetStyles<PaginatorProps, StyleProps>(
    PaginatorInner,
    defaultStyles as DefaultStyleProps<StyleProps>
  )
);

interface PageButtonProps {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  className: string;
  baseClass: string;
  isDisabled: boolean;
}

function PreviousPageButton(props: PageButtonProps) {
  return (
    <button
      onClick={props.onClick}
      aria-label="Goto Previous Page"
      className={props.baseClass + "__page-button " + props.className}
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
      className={props.baseClass + "__page-button " + props.className}
    >
      <RightChevron />
    </button>
  );
}

export interface PageNumberProps {
  pageNumber: number;
  onClick: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  isCurrent: boolean;
  className: string;
  baseClass: string;
}

function DefaultPageNumber(props: PageNumberProps) {
  return (
    <a
      className={cx(
        props.baseClass + "__page-number",
        props.className,
        props.isCurrent && props.baseClass + "__page-number--current"
      )}
      onClick={props.onClick}
      aria-label={
        props.isCurrent
          ? `Current Page, Page ${props.pageNumber}`
          : `Page ${props.pageNumber}`
      }
      aria-current={props.isCurrent ? true : undefined}
    >
      {props.pageNumber}
    </a>
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
