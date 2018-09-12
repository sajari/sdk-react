import * as React from "react";
import { cx, css } from "emotion";
import { ControllerStateAndHelpers } from "downshift";

export interface DropdownProps {
  downshift: ControllerStateAndHelpers<any>;
  styles?: React.CSSProperties;
}

export class Dropdown extends React.Component<DropdownProps> {
  public render() {
    const { downshift, styles, children } = this.props;
    return (
      <div className={container}>
        <div className={content}>
          <ul
            {...downshift.getMenuProps({
              className: cx(
                listStyles,
                downshift.isOpen && listIsOpen,
                styles && css(styles as any)
              )
            })}
          >
            {children}
          </ul>
        </div>
      </div>
    );
  }
}

// 10 million seems like a big enough z-index to be able to be above any
// potential content that it is overlaying
const DropdownZIndex = 10000000;

const container = css({
  boxSizing: "border-box",
  position: "relative",
  width: "100%",
  zIndex: DropdownZIndex
});

const content = css({
  boxSizing: "border-box",
  position: "absolute",
  width: "100%"
});

const listStyles = css({
  marginTop: 0,
  marginBottom: 0,
  paddingLeft: 0,
  backgroundColor: "#fff"
});

const listIsOpen = css({
  boxShadow: "0 3px 8px 0 rgba(0,0,0,0.16), 0 0 0 1px rgba(0,0,0,0.08)",
  boxSizing: "border-box",
  cursor: "default"
});
