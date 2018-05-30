import * as React from "react";
import { Filter } from "../../controllers";
import { FilterContext, FilterProvider } from "../context/filter";

import { Container, TabsContainer } from "./styled";
import { Tab } from "./Tab";

export interface TabsProps {
  filter: Filter;
  tabs: Array<{ name: string; display: string }>;
}

export const Tabs: React.SFC<TabsProps> = ({ filter, tabs }) => (
  <FilterProvider filter={filter}>
    <Container>
      <TabsContainer>
        {tabs.map(tab => <Tab key={tab.name} title={tab.display} />)}
      </TabsContainer>
    </Container>
  </FilterProvider>
);
