import * as React from "react";
import { trimPrefix } from "./shared/utils";
import { CSSObject } from "@emotion/core";

interface TypeaheadProps {
  inputValue: string;
  completion?: string;
  styles?: CSSObject;
}

const typeaheadStyles: CSSObject = {
  color: "#bebebe",
  display: "inline",
  fontSize: "1em",
  marginLeft: -2,
  position: "relative"
};

export function Typeahead({ inputValue, completion, styles }: TypeaheadProps) {
  let typeaheadValue = "";
  if (completion) {
    typeaheadValue = trimPrefix(completion, inputValue);
  }

  return (
    <div css={[typeaheadStyles, styles]} className="sj-input__typeahead">
      {typeaheadValue}
    </div>
  );
}
