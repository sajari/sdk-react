import idx from "idx";
import * as React from "react";
import classnames from "classnames";
// @ts-ignore: module missing defintions
import { LiveMessage } from "react-aria-live";

import { i18n } from "../../i18n";
import { SearchFn } from "../context/pipeline/context";

import { Container, Emphasis, OverrideContainer } from "./styled";
import { SummaryContainer, SummaryContext } from "./SummaryContainer";
import { CSSObject } from "@emotion/css";

export interface SummaryProps {
  showQueryTime?: boolean;
  showQueryOverride?: boolean;
  className?: string;
  styles?: {
    container?: CSSObject;
    searchTerm?: CSSObject;
    override?: OverrideStyles;
  };

  Renderer?: React.ComponentType<SummaryContext & SummaryProps>;
}

export function Summary(props: SummaryProps) {
  const { Renderer = DefaultSummaryRenderer, ...rest } = props;

  return (
    <SummaryContainer>
      {ctx => <Renderer {...ctx} {...rest} />}
    </SummaryContainer>
  );
}

function DefaultSummaryRenderer(props: SummaryContext & SummaryProps) {
  const { showQueryTime = true, showQueryOverride = true, styles = {} } = props;

  const ariaMessage = `${props.pageNumber} ${props.totalResults} ${i18n.t(
    "summary:resultsFor"
  )} "${props.query}"`;

  return (
    <Container
      className={classnames("sj-summary", props.className)}
      styles={idx(styles, _ => _.container)}
    >
      <LiveMessage message={ariaMessage} aria-live="polite" />
      <span className="sj-summary__results-text">
        {`${props.pageNumber} ${props.totalResults} ${i18n.t(
          "summary:resultsFor"
        )} `}
        "
        <Emphasis
          className="sj-summary__search-term"
          styles={styles.searchTerm}
        >
          {props.query}
        </Emphasis>
        "{" "}
      </span>
      {showQueryTime && (
        <span className="sj-summary__query-time">{`(${
          props.responseTime
        }) `}</span>
      )}
      {showQueryOverride && (
        <Override
          className="sj-summary__query-override"
          responseQuery={props.responseQuery}
          query={props.query}
          search={props.search}
          styles={idx(styles, _ => _.override)}
        />
      )}
    </Container>
  );
}

export interface OverrideProps {
  responseQuery: string;
  query: string;
  search: SearchFn;

  className?: string;
  styles?: OverrideStyles | null;
}

export interface OverrideStyles {
  container?: CSSObject;
}

const Override: React.SFC<OverrideProps> = ({
  className,
  responseQuery,
  query,
  search,
  styles
}) => {
  if (!responseQuery || responseQuery.toLowerCase() === query.toLowerCase()) {
    return null;
  }

  if (styles === null || styles === undefined) {
    styles = {};
  }

  return (
    <OverrideContainer
      className={className}
      styles={idx(styles, _ => _.container)}
    >
      {`${i18n.t("summary:searchInsteadFor")} `}
      <a onClick={click({ search, query })} href="">
        {query}
      </a>
    </OverrideContainer>
  );
};

const click = ({ search, query }: { search: SearchFn; query: string }) => (
  event: any
) => {
  event.preventDefault();
  search(query, true);
};
