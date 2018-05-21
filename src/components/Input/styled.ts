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
import { SearchIcon as Icon } from "./SeachIcon";

export const Container = styled("div")({
  width: "100%",
  marginBottom: "1rem"
});

export interface IInputContainerProps {
  isDropdownOpen: boolean;
}

export const InputContainer = styled<IInputContainerProps, "div">("div")(
  {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "3px 9px",
    borderRadius: 2,
    boxShadow: "0 2px 2px 0 rgba(0,0,0,0.16), 0 0 0 1px rgba(0,0,0,0.08)",
    transition: "box-shadow 200ms cubic-bezier(0.4, 0.0, 0.2, 1)",
    "&:hover": {
      boxShadow: "0 3px 8px 0 rgba(0,0,0,0.16), 0 0 0 1px rgba(0,0,0,0.08)"
    }
  },
  ({ isDropdownOpen }) =>
    isDropdownOpen
      ? {
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0
        }
      : {}
);

const searchIconSize = "1.5rem";

export const InputInnerContainer = styled("div")({
  minWidth: `calc(100% - ${searchIconSize})`,
  overflow: "scroll"
});

export const Input = styled(AutosizeInput)({
  "& input:focus, & input:active": {
    outline: "none"
  }
});

export const inputResetStyles = {
  container: {
    background: "none",
    padding: 0,
    maxWidth: `calc(100% - ${searchIconSize})`
  },
  input: {
    height: 34,
    border: "none",
    borderRadius: 0,
    padding: 0,
    fontFamily: "inherit",
    fontSize: "1rem",
    textRendering: "optimizeLegibility",
    color: "#666",
    backgroundColor: "transparent"
  }
};

export const SearchButton = styled("button")({
  minWidth: searchIconSize,
  minHeight: searchIconSize,
  width: searchIconSize,
  height: searchIconSize,

  padding: 0,
  border: "none",
  background: "transparent",

  cursor: "pointer",

  "&:focus, &:active": {
    outline: "none"
  }
});

export const SearchIcon = styled(Icon)({
  minWidth: searchIconSize,
  minHeight: searchIconSize,
  width: searchIconSize,
  height: searchIconSize,
  color: "grey"
});

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
    position: "absolute",
    boxSizing: "border-box",
    cursor: "default",
    boxShadow: "0 3px 8px 0 rgba(0,0,0,0.2), 0 0 0 1px rgba(0,0,0,0.08)",
    borderBottomLeftRadius: 2,
    borderBottomRightRadius: 2
  },
  ({ position: { width, top, left, height } }) => ({
    width,
    top: top + height,
    left
  })
);

export interface ISuggestionProps {
  isHighlighted: boolean;
}

export const Suggestion = styled<ISuggestionProps, "div">("div")(
  {
    fontSize: "1rem",
    padding: "0.25rem 0.5rem",
    color: "#666"
  },
  props => ({
    backgroundColor: props.isHighlighted ? "#eaeaea" : "#fff"
  })
);

export const Typeahead = styled("span")({
  position: "relative",
  zIndex: -1,
  display: "inline",
  marginLeft: -2,
  color: "#bebebe",
  fontSize: "1rem"
});
