import { css, cx } from "emotion";
import * as React from "react";
import { trimPrefix } from "./shared/utils";

interface TypeaheadProps {
  inputValue: string;
  completion?: string;
  styles?: React.CSSProperties;
}

export function Typeahead({ inputValue, completion, styles }: TypeaheadProps) {
  let typeaheadValue = "";
  if (completion) {
    typeaheadValue = trimPrefix(completion, inputValue);
  }

  return (
    <div className={cx(typeaheadStyles, styles && css(styles as any))}>
      {typeaheadValue}
    </div>
  );
}

const typeaheadStyles = css({
  color: "#bebebe",
  display: "inline",
  fontSize: "1em",
  marginLeft: -2,
  position: "relative"
});
