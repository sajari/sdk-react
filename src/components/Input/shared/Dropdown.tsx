/** @jsx jsx */ jsx;
import { jsx } from "@emotion/core";
import { SearchStateAndHelpers } from "../../Search/Search";
import * as React from "react";
import { CSSObject } from "@emotion/core";

export interface DropdownProps {
  searchProps: SearchStateAndHelpers;
  className?: string;
  styles?: CSSObject;
}

// 10 million seems like a big enough z-index to be able to be above any
// potential content that it is overlaying
const DropdownZIndex = 10000000;

const container: CSSObject = {
  boxSizing: "border-box",
  position: "relative",
  width: "100%",
  zIndex: DropdownZIndex
};

const content: CSSObject = {
  boxSizing: "border-box",
  position: "absolute",
  width: "100%"
};

const listStyles = {
  marginTop: 0,
  marginBottom: 0,
  paddingLeft: 0,
  backgroundColor: "#fff"
};

const listIsOpen = {
  boxShadow: "0 3px 8px 0 rgba(0,0,0,0.16), 0 0 0 1px rgba(0,0,0,0.08)",
  boxSizing: "border-box",
  cursor: "default"
};

export class Dropdown extends React.Component<DropdownProps> {
  public render() {
    const { searchProps, className, styles, children } = this.props;
    return (
      <div css={container}>
        <div css={content}>
          <ul
            {...searchProps.getMenuProps({
              className
            })}
            // an explicit aria-label is defined
            aria-labelledby={undefined}
            css={[listStyles, searchProps.isOpen && listIsOpen, styles]}
          >
            {children}
          </ul>
        </div>
      </div>
    );
  }
}
