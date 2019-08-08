/** @jsx jsx */ jsx;
import { css, jsx } from "@emotion/core";
import { CSSObject } from "@emotion/core";
import * as React from "react";
import { trimPrefix } from "./shared/utils";

interface TypeaheadProps {
  inputValue: string;
  completion?: string;
  styles?: CSSObject;
}

const typeaheadStyles: CSSObject = {
  color: "#bebebe",
  fontSize: "1em",
  position: "absolute",
  width: "100%",
  overflow: "hiddden",
  left: 0,
  top: "50%",
  transform: "translateY(-50%)",
  pointerEvents: "none",
  span: {
    opacity: 0
  }
};

export function Typeahead({ inputValue, completion, styles }: TypeaheadProps) {
  let typeaheadValue = "";
  let hiddenText = "";
  if (completion) {
    typeaheadValue = trimPrefix(completion, inputValue);
    hiddenText = completion.substring(
      0,
      completion.length - typeaheadValue.length
    );
  }

  return (
    <div css={[typeaheadStyles, styles]} className="sj-input__typeahead">
      <span>{hiddenText}</span>
      {typeaheadValue}
    </div>
  );
}
