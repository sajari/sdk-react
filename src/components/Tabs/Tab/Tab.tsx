/** @jsx jsx */ jsx;
import { jsx } from "@emotion/core";
import * as React from "react";
import classnames from "classnames";
import { FilterConsumer } from "../../context/filter";

import { Container } from "./styled";
import { CSSObject } from "@emotion/css";

const ReturnKeyCode = 13;
const SpaceKeyCode = 32;

export interface TabProps {
  title: string;
  styles?: CSSObject;
}

export const Tab: React.SFC<TabProps> = ({ title, styles = {} }) => (
  <FilterConsumer>
    {({ selected, set }) => {
      const isSelected = selected.includes(title);
      return (
        <Container
          className={classnames("sj-tabs__tab", {
            "sj-tabs__tab--selected": isSelected
          })}
          role="button"
          tabIndex={0}
          onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => {
            if (e.keyCode === ReturnKeyCode || e.keyCode === SpaceKeyCode) {
              e.preventDefault();
              setFilter(set, title, !isSelected)();
            }
          }}
          isSelected={isSelected}
          onClick={setFilter(set, title, !isSelected)}
          css={styles}
        >
          {title}
        </Container>
      );
    }}
  </FilterConsumer>
);

type SetFn = (name: string, value: boolean) => void;
const setFilter = (set: SetFn, name: string, value: boolean) => () => {
  if (!value) {
    // make tab act like radio button
    return;
  }

  set(name, value);
};
