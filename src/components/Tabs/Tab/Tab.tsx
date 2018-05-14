import * as React from "react";
import { FilterConsumer, IFilterContext } from "../../context/filter";

export interface ITabProps {
  title: string;
}

export const Tab: React.SFC<ITabProps> = ({ title }) => (
  <FilterConsumer>
    {({ selected, set }) => {
      const isSelected = selected.includes(title);
      return (
        <div
          style={{ color: isSelected ? "blue" : "inherit" }}
          onClick={setFilter(set)(title, !isSelected)}
        >
          {title}
        </div>
      );
    }}
  </FilterConsumer>
);

const setFilter = (set: (name: string, value: boolean) => void) => (
  name: string,
  value: boolean
) => (event: any) => set(name, value);
