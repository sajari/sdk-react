import * as React from "react";
import {
  StyledProps,
  StyledComponent,
  Theme,
  styled,
  override
} from "../../../styles";

export const SuggestionsContainer = styled("div")({
  borderBottomLeftRadius: 2,
  borderBottomRightRadius: 2,
  boxSizing: "border-box",
  boxShadow: "0 3px 8px 0 rgba(0,0,0,0.16), 0 0 0 1px rgba(0,0,0,0.08)",
  cursor: "default"
});

export interface SuggestionProps {
  isHighlighted: boolean;
}

export const Suggestion = styled<SuggestionProps, "div">("div")(
  {
    color: "#666",
    fontSize: "1em",
    padding: "0.25em 0.5em"
  },
  props => ({
    backgroundColor: props.isHighlighted ? "#eaeaea" : "#fff"
  }),
  override
);
