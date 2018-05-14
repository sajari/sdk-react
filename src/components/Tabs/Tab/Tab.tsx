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
          onClick={() => set(title, !isSelected)}
        >
          {title}
        </div>
      );
    }}
  </FilterConsumer>
);
