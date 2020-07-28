import * as React from "react";
import { Filter } from "../../controllers";
import { FilterProvider } from "../context/filter";

import { CSSObject } from "@emotion/css";
import { Container, TabsContainer } from "./styled";
import { Tab } from "./Tab";

export interface TabsProps {
  filter: Filter;
  tabs: Array<{ name: string; display: string }>;
  styles?: {
    container?: CSSObject;
    tab?: CSSObject;
  };
}

export const Tabs: React.SFC<TabsProps> = ({ filter, tabs, styles = {} }) => (
  <FilterProvider filter={filter}>
    <Container className="sj-tabs" styles={styles.container}>
      <TabsContainer>
        {tabs.map(tab => (
          <Tab
            key={tab.name}
            name={tab.name}
            title={tab.display}
            styles={styles.tab}
          />
        ))}
      </TabsContainer>
    </Container>
  </FilterProvider>
);
