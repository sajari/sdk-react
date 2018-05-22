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
import { IIconProps, SearchIcon as Icon } from "./SeachIcon";

export const Container = styled<IStyledProps<HTMLDivElement>, "div">("div")(
  {
    width: "100%",
    marginBottom: "1rem"
  },
  override
);

export interface IInputContainerProps extends IStyledProps<HTMLFormElement> {
  isDropdownOpen: boolean;
}

export const InputContainer = styled<IInputContainerProps, "form">("form")(
  {
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
      : {},
  override
);

export const SearchContainer = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  width: "100%"
});

const searchIconSize = "1.5rem";

export const InputInnerContainer = styled<IStyledProps<HTMLDivElement>, "div">(
  "div"
)(
  {
    minWidth: `calc(100% - ${searchIconSize})`,
    overflow: "auto"
  },
  override
);

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
    color: "currentcolor",
    backgroundColor: "transparent"
  }
};

export interface ISearchButtonProps extends IStyledProps<HTMLButtonElement> {}

export const SearchButton = styled<ISearchButtonProps, "button">("button")(
  {
    minWidth: searchIconSize,
    minHeight: searchIconSize,
    width: searchIconSize,
    height: searchIconSize,

    padding: 0,
    border: "none",
    background: "transparent",
    color: "grey",

    cursor: "pointer",

    "&:focus, &:active": {
      outline: "none"
    }
  },
  ({ theme }) => ({
    "&:hover": {
      // @ts-ignore
      color: idx(theme, _ => _.colors.brand.primary) || "grey"
    }
  }),
  override
);

export const SearchIcon = styled(Icon)({
  minWidth: searchIconSize,
  minHeight: searchIconSize,
  width: searchIconSize,
  height: searchIconSize
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
  }),
  override
);

export const Typeahead = styled<IStyledProps<HTMLSpanElement>, "span">("span")(
  {
    position: "relative",
    zIndex: -1,
    display: "inline",
    marginLeft: -2,
    color: "#bebebe",
    fontSize: "1rem"
  },
  override
);
