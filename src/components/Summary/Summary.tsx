import * as React from "react";

import { Consumer, IContext } from "../context";
import { SearchFn } from "../context/context";
import { formatQueryTime } from "./utils";

export class Summary extends React.Component {
  public render() {
    return (
      <Consumer>
        {({ search, response, query, config }) => {
          if (response === null || response.isEmpty() || response.isError()) {
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
            <div>
              <span>
                {`${pageNumber}${totalResults} results for `}
                "<strong>{text}</strong>"{" "}
              </span>
              <span>{`(${responseTime}) `}</span>
              <Override
                responseQuery={responseValues.get(config.qParam) as string}
                query={query}
                search={search}
              />
            </div>
          );
        }}
      </Consumer>
    );
  }
}

class Override extends React.PureComponent<{
  responseQuery: string;
  query: string;
  search: SearchFn;
}> {
  public render() {
    const { responseQuery, query } = this.props;

    if (!responseQuery || responseQuery.toLowerCase() === query.toLowerCase()) {
      return null;
    }

    return (
      <span>
        {`search instead for `}
        <a onClick={this.click} href="">
          {query}
        </a>
      </span>
    );
  }

  private click = (event: any) => {
    const { search, query } = this.props;

    event.preventDefault();
    search(query, true);
  };
}
