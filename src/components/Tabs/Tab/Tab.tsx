import * as React from "react";
import { FilterConsumer } from "../../context/filter";

import { Container } from "./styled";

export interface TabProps {
  title: string;
  styles?: React.CSSProperties;
}

export const Tab: React.SFC<TabProps> = ({ title, styles = {} }) => (
  <FilterConsumer>
    {({ selected, set }) => {
      const isSelected = selected.includes(title);
      return (
        <Container
          isSelected={isSelected}
          onClick={setFilter(set, title, !isSelected)}
          style={styles}
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
