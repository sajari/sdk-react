/** @jsx jsx */ jsx;
import { jsx } from "@emotion/core";
import classnames from "classnames";
import * as React from "react";
import { FilterConsumer } from "../../context/filter";

import { CSSObject } from "@emotion/css";
import { Container } from "./styled";

const ReturnKeyCode = 13;
const SpaceKeyCode = 32;

export interface TabProps {
  name: string;
  title: string;
  styles?: CSSObject;
}

export const Tab: React.SFC<TabProps> = ({ name, title, styles = {} }) => (
  <FilterConsumer>
    {({ selected, set }) => {
      const isSelected = selected.includes(name);
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
              setFilter(set, name, !isSelected)();
            }
          }}
          isSelected={isSelected}
          onClick={setFilter(set, name, !isSelected)}
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
