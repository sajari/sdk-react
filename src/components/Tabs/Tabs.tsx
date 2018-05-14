import * as React from "react";
import { Filter } from "../../controllers";
import { FilterProvider, IFilterContext } from "../context/filter";
import { Tab } from "./Tab";

export interface ITabsProps {
  filter: Filter;
  tabs: Array<{ name: string; display: string }>;
}

export const Tabs: React.SFC<ITabsProps> = ({ filter, tabs }) => (
  <div>
    <FilterProvider filter={filter}>
      <div>{tabs.map(tab => <Tab key={tab.name} title={tab.display} />)}</div>
    </FilterProvider>
  </div>
);
