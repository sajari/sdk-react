import * as React from "react";
import { Filter } from "../../controllers";
import { FilterContext, FilterProvider } from "../context/filter";

import { Container, TabsContainer } from "./styled";
import { Tab } from "./Tab";

export interface TabsProps {
  filter: Filter;
  tabs: Array<{ name: string; display: string }>;
  styles?: {
    container?: React.CSSProperties;
    tab?: React.CSSProperties;
  };
}

export const Tabs: React.SFC<TabsProps> = ({ filter, tabs, styles = {} }) => (
  <FilterProvider filter={filter}>
    <Container styles={styles.container}>
      <TabsContainer>
        {tabs.map(tab => (
          <Tab key={tab.name} title={tab.display} styles={styles.tab} />
        ))}
      </TabsContainer>
    </Container>
  </FilterProvider>
);
