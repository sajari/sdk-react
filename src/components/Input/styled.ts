import idx from "idx";
import * as React from "react";
import {
  IStyledProps,
  ITheme,
  override,
  strip,
  styled,
  StyledComponent
} from "../styles";

// @ts-ignore: module missing definition file
import AutosizeInput from "react-input-autosize";

const clean = strip([]);

export const Container = styled("div")({
  width: "100%"
});

export const InputContainer = styled("div")({
  border: "1px solid #ddd",
  padding: "0.25rem 0.5rem"
});

export const Input = styled(AutosizeInput)({
  "& input:focus, & input:active": {
    outline: "none"
  }
});

export const inputResetStyles = {
  container: { background: "none", padding: 0 },
  input: {
    border: "none",
    borderRadius: 0,
    padding: 0,
    fontFamily: "inherit",
    fontSize: "inherit",
    textRendering: "optimizeLegibility",
    color: "#666"
  }
};

export interface ISuggestionsContainerProps {
  position: {
    top: number;
    left: number;
    height: number;
    width: number;
  };
}

export const SuggestionsContainer = styled<ISuggestionsContainerProps, "div">(
  "div"
)(
  {
    border: "1px solid #ddd",
    borderTop: "none",
    position: "absolute",
    boxSizing: "border-box",
    cursor: "pointer"
  },
  ({ position: { width, top, left, height } }) => ({
    width,
    top: top + height,
    left
  })
);

export interface ISuggestionProps {
  isHighlighted: boolean;
  isSelected: boolean;
}

export const Suggestion = styled<ISuggestionProps, "div">("div")(
  {
    fontSize: "1.1rem",
    padding: "0.5rem",
    color: "#666"
  },
  props => ({
    backgroundColor: props.isHighlighted ? "#ddd" : "#fff",
    fontWeight: props.isSelected ? "bold" : "normal"
  })
);

export const Typeahead = styled("span")({
  display: "inline",
  marginLeft: -1,
  color: "#bebebe"
});
