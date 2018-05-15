import * as React from "react";
import { FilterConsumer, IFilterContext } from "../../context/filter";

import { Container } from "./styled";

export interface ITabProps {
  title: string;
}

export const Tab: React.SFC<ITabProps> = ({ title }) => (
  <FilterConsumer>
    {({ selected, set }) => {
      const isSelected = selected.includes(title);
      return (
        <Container
          isSelected={isSelected}
          onClick={setFilter(set)(title, !isSelected)}
        >
          {title}
        </Container>
      );
    }}
  </FilterConsumer>
);

const setFilter = (set: (name: string, value: boolean) => void) => (
  name: string,
  value: boolean
) => (event: any) => set(name, value);
