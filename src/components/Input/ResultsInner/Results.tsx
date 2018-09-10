import * as React from "react";
import { cx, css } from "emotion";
import { ControllerStateAndHelpers } from "downshift";
import { ResultsContainer } from "../../Results/Results";
import { Dropdown } from "../shared/Dropdown";

const listItem = css({
  listStyle: "none",
  paddingLeft: 0,
  marginLeft: 0,
  backgroundColor: "#fff",
  cursor: "auto"
});

const listItemHighlighted = css({
  backgroundColor: "#eee",
  cursor: "default"
});

export interface ResultsProps {
  downshift: ControllerStateAndHelpers<any>;

  ResultRenderer: React.ComponentType<{
    values: { [k: string]: string | string[] };
  }>;
}

export class Results extends React.Component<ResultsProps> {
  static defaultProps = {
    ResultRenderer: ResultItem
  };

  render() {
    const { downshift, ResultRenderer } = this.props;
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
                downshift.inputValue !== "" &&
                results.map((result, idx) => (
                  <li
                    {...downshift.getItemProps({
                      key: result.key,
                      item: result,
                      index: idx,
                      className: cx(
                        listItem,
                        downshift.highlightedIndex === idx &&
                          listItemHighlighted
                      )
                    })}
                  >
                    <ResultRenderer values={result.values} />
                  </li>
                ))}
            </Dropdown>
          );
        }}
      </ResultsContainer>
    );
  }
}

interface ResultItemProps {
  values: { [k: string]: string | string[] };
}

function ResultItem({ values }: ResultItemProps) {
  let title = values["title"];
  let description = values["description"];

  return (
    <div className={css({ padding: "0.5em 1em" })}>
      <h3 className={titleCSS}>{title}</h3>
      <p className={descriptionCSS}>{description}</p>
    </div>
  );
}

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
