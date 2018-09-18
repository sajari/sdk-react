import { ControllerStateAndHelpers } from "downshift";
import { css, cx } from "emotion";
import * as React from "react";
import { Config, defaultConfig } from "../../config";
import { ResultsContainer } from "../Results/Results";
import { Dropdown } from "./shared/Dropdown";
import { Summary } from "../Summary";

export interface ResultsProps {
  downshift: ControllerStateAndHelpers<any>;
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
    const { downshift, showSummary, ResultRenderer } = this.props;
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
            <Dropdown downshift={downshift}>
              {downshift.isOpen &&
                downshift.inputValue !== "" && (
                  <React.Fragment>
                    {showSummary && (
                      <li className={cx(listItem, resultPadding)}>
                        <Summary
                          showQueryOverride={false}
                          styles={summaryStyles}
                        />
                      </li>
                    )}

                    {results.map((result, idx) => (
                      <li
                        {...downshift.getItemProps({
                          key: result.key,
                          item: result,
                          index: idx,
                          role: "option",
                          className: listItem
                        })}
                      >
                        <ResultRenderer
                          values={result.values}
                          isHighlighted={downshift.highlightedIndex === idx}
                        />
                      </li>
                    ))}

                    {/* <li className={cx(listItem, resultPadding)}>
                      <a
                        href={`/search?${config.qParam}=${
                          downshift.inputValue
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
    <div className={cx(resultPadding, isHighlighted && resultHighlighted)}>
      <h3 className={titleCSS}>{title}</h3>
      <p className={descriptionCSS}>{description}</p>
    </div>
  );
}

const listItem = css({
  listStyle: "none",
  paddingLeft: 0,
  marginLeft: 0,
  backgroundColor: "#fff",
  cursor: "auto"
});

const resultPadding = css({ padding: "0.5em 1em" });

const resultHighlighted = css({
  backgroundColor: "#eee",
  cursor: "default"
});

const titleCSS = css({
  fontSize: "1.1em",
  fontWeight: 400,
  lineHeight: 1.1,
  marginBottom: 0,
  marginTop: 0,
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap"
});

const descriptionCSS = css({
  color: "#545454",
  fontSize: "0.85em",
  lineHeight: 1.4,
  marginBottom: 4,
  marginTop: 2,
  overflowWrap: "break-word",
  wordWrap: "break-word"
});

const summaryStyles = {
  container: {
    marginBottom: 0
  }
};
