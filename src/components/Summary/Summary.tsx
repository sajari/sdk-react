import { cx } from "emotion";
import idx from "idx";
import * as React from "react";
// @ts-ignore: module missing defintions
import { LiveMessage } from "react-aria-live";

import { i18n } from "../../i18n";
import { Consumer } from "../context";
import { SearchFn } from "../context/pipeline/context";
import { formatQueryTime } from "./utils";

import { Container, Emphasis, OverrideContainer } from "./styled";

export interface SummaryProps {
  showQueryTime?: boolean;
  showQueryOverride?: boolean;
  className?: string;
  styles?: {
    container?: React.CSSProperties;
    searchTerm?: React.CSSProperties;
    override?: OverrideStyles;
  };
}

export class Summary extends React.Component<SummaryProps> {
  public render() {
    const {
      showQueryTime = true,
      showQueryOverride = true,
      styles = {}
    } = this.props;

    return (
      <Consumer>
        {({ search: { response, query, config, search } }) => {
          if (
            response === null ||
            response === undefined ||
            response.isEmpty() ||
            response.isError()
          ) {
            return null;
          }
          const responseValues = response.getValues() as Map<string, string>;
          const queryValues = response.getQueryValues() as Map<string, string>;

          const text = responseValues.get(config.qParam) || query;
          const page = parseInt(
            queryValues.get(config.pageParam) as string,
            10
          );

          const pageNumber =
            page && page > 1
              ? i18n.t("summary:page", { replace: { pageNumber: page } })
              : "";
          const totalResults = (response.getTotalResults() as number).toLocaleString();
          const responseTime = formatQueryTime(response.getTime() as number);

          const ariaMessage = `${pageNumber} ${totalResults} ${i18n.t(
            "summary:resultsFor"
          )} "${text}"`;

          return (
            <Container
              className={cx("sj-summary", this.props.className)}
              styles={idx(styles, _ => _.container)}
            >
              <LiveMessage message={ariaMessage} aria-live="polite" />
              <span className="sj-summary__results-text">
                {`${pageNumber} ${totalResults} ${i18n.t(
                  "summary:resultsFor"
                )} `}
                "
                <Emphasis
                  className="sj-summary__search-term"
                  styles={styles.searchTerm}
                >
                  {text}
                </Emphasis>
                "{" "}
              </span>
              {showQueryTime && (
                <span className="sj-summary__query-time">{`(${responseTime}) `}</span>
              )}
              {showQueryOverride && (
                <Override
                  className="sj-summary__query-override"
                  responseQuery={responseValues.get(config.qParam) as string}
                  query={query}
                  search={search}
                  styles={idx(styles, _ => _.override)}
                />
              )}
            </Container>
          );
        }}
      </Consumer>
    );
  }
}

export interface OverrideProps {
  responseQuery: string;
  query: string;
  search: SearchFn;

  className?: string;
  styles?: OverrideStyles | null;
}

export interface OverrideStyles {
  container?: React.CSSProperties;
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
