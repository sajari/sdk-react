/** @jsx jsx */ jsx;
import { jsx } from "@emotion/core";
import * as React from "react";
import classnames from "classnames";
import { FilterConsumer } from "../../context/filter";

import { Container } from "./styled";
import { CSSObject } from "@emotion/css";

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
