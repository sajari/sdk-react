import * as React from "react";

import { Consumer } from "../context";
import { SearchFn } from "../context/pipeline/context";
import { formatQueryTime } from "./utils";

import { Container, Emphasis } from "./styled";

export class Summary extends React.Component {
  public render() {
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
          const page = parseInt(queryValues.get("page") as string, 10);
          const pageNumber = page && page > 1 ? `Page ${page} of ` : "";
          const totalResults = (response.getTotalResults() as number).toLocaleString();

          const responseTime = formatQueryTime(response.getTime() as string);

          return (
            <Container>
              <span>
                {`${pageNumber}${totalResults} results for `}
                "<Emphasis>{text}</Emphasis>"{" "}
              </span>
              <span>{`(${responseTime}) `}</span>
              <Override
                responseQuery={responseValues.get(config.qParam) as string}
                query={query}
                search={search}
              />
            </Container>
          );
        }}
      </Consumer>
    );
  }
}

export interface IOverrideProps {
  responseQuery: string;
  query: string;
  search: SearchFn;
}

const Override: React.SFC<IOverrideProps> = ({
  responseQuery,
  query,
  search
}) => {
  if (!responseQuery || responseQuery.toLowerCase() === query.toLowerCase()) {
    return null;
  }

  return (
    <span>
      {`search instead for `}
      <a onClick={click({ search, query })} href="">
        {query}
      </a>
    </span>
  );
};

const click = ({ search, query }: { search: SearchFn; query: string }) => (
  event: any
) => {
  event.preventDefault();
  search(query, true);
};
