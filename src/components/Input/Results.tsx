import { SearchStateAndHelpers } from "../Search/Search";
import * as React from "react";
import { Config, defaultConfig } from "../../config";
import { ResultsContainer } from "../Results/Results";
import { Summary } from "../Summary";
import { Dropdown } from "./shared/Dropdown";
import { CSSObject } from "@emotion/core";

export interface ResultsProps {
  searchProps: SearchStateAndHelpers;
  ResultRenderer: React.ComponentType<ResultRendererProps>;
  config: Config;
  showSummary: boolean;
}

export interface ResultRendererProps {
  values: { [k: string]: string | string[] };
  isHighlighted: boolean;
}

export class Results extends React.Component<ResultsProps> {
  public static defaultProps = {
    ResultRenderer: ResultItem,
    config: defaultConfig,
    showSummary: false
  };

  public render() {
    const { searchProps, showSummary, ResultRenderer } = this.props;
    return (
      <ResultsContainer>
        {({ error, results }) => {
          if (error) {
            return error.message;
          }
          if (results === undefined) {
            return "no results";
          }
          return (
            <Dropdown searchProps={searchProps} className="sj-input__results">
              {searchProps.isOpen && searchProps.inputValue !== "" && (
                <React.Fragment>
                  {showSummary && (
                    <li css={[listItem, resultPadding]}>
                      <Summary
                        showQueryOverride={false}
                        styles={summaryStyles}
                      />
                    </li>
                  )}

                  {results.map((result, idx) => (
                    <li
                      {...searchProps.getItemProps({
                        key: result.key,
                        item: result,
                        index: idx,
                        role: "option"
                      })}
                      css={listItem}
                    >
                      <ResultRenderer
                        values={result.values}
                        isHighlighted={searchProps.highlightedIndex === idx}
                      />
                    </li>
                  ))}

                  {/* <li className={cx(listItem, resultPadding)}>
                      <a
                        href={`/search?${config.qParam}=${
                          searchProps.inputValue
                        }`}
                      >
                        Show more results
                      </a>
                    </li> */}
                </React.Fragment>
              )}
            </Dropdown>
          );
        }}
      </ResultsContainer>
    );
  }
}

function ResultItem({ values, isHighlighted }: ResultRendererProps) {
  const title = values.title;
  const description = values.description;

  return (
    <div css={[resultPadding, isHighlighted && resultHighlighted]}>
      <h3 css={titleCSS}>{title}</h3>
      <p css={descriptionCSS}>{description}</p>
    </div>
  );
}

const listItem = {
  listStyle: "none",
  paddingLeft: 0,
  marginLeft: 0,
  backgroundColor: "#fff",
  cursor: "auto"
};

const resultPadding = { padding: "0.5em 1em" };

const resultHighlighted = {
  backgroundColor: "#eee",
  cursor: "default"
};

const titleCSS: CSSObject = {
  fontSize: "1.1em",
  fontWeight: 400,
  lineHeight: 1.1,
  marginBottom: 0,
  marginTop: 0,
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap"
};

const descriptionCSS: CSSObject = {
  color: "#545454",
  fontSize: "0.85em",
  lineHeight: 1.4,
  marginBottom: 4,
  marginTop: 2,
  overflowWrap: "break-word",
  wordWrap: "break-word"
};

const summaryStyles = {
  container: {
    marginBottom: 0
  }
};
