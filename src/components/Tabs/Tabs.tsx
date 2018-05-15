import * as React from "react";
import { Filter } from "../../controllers";
import { FilterProvider, IFilterContext } from "../context/filter";

import { Container, TabsContainer } from "./styled";
import { Tab } from "./Tab";

export interface ITabsProps {
  filter: Filter;
  tabs: Array<{ name: string; display: string }>;
}

export const Tabs: React.SFC<ITabsProps> = ({ filter, tabs }) => (
  <Container>
    <FilterProvider filter={filter}>
      <TabsContainer>
        {tabs.map(tab => <Tab key={tab.name} title={tab.display} />)}
      </TabsContainer>
    </FilterProvider>
  </Container>
);
