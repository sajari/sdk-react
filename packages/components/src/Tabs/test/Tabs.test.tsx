import { ThemeProvider } from '@sajari/react-sdk-utils';
import { render } from '@testing-library/react';
import React from 'react';

import Tabs, { Tab, TabList, TabPanel, TabPanels } from '..';

describe('Tabs', () => {
  it('Should call the onChange handler', () => {
    const setTabIndex = jest.fn();
    const { getAllByRole } = render(
      <ThemeProvider>
        <Tabs onChange={setTabIndex}>
          <TabList>
            <Tab>Red</Tab>
            <Tab>Green</Tab>
            <Tab>Blue</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>The Primary Colors</TabPanel>
            <TabPanel>Are 1, 2, 3</TabPanel>
            <TabPanel>Red, green and blue.</TabPanel>
          </TabPanels>
        </Tabs>
      </ThemeProvider>,
    );
    const tabs = getAllByRole('tab');
    tabs[2].click();
    expect(setTabIndex).toHaveBeenCalledWith(2);
    tabs[0].click();
    expect(setTabIndex).toHaveBeenCalledWith(0);
    tabs[1].click();
    expect(setTabIndex).toHaveBeenCalledWith(1);
  });

  it('Should hide/unhide the active/inactive tabs', () => {
    const setTabIndex = jest.fn();
    const { getAllByRole } = render(
      <ThemeProvider>
        <Tabs onChange={setTabIndex}>
          <TabList>
            <Tab>Red</Tab>
            <Tab>Green</Tab>
            <Tab>Blue</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>The Primary Colors</TabPanel>
            <TabPanel>Are 1, 2, 3</TabPanel>
            <TabPanel>Red, green and blue.</TabPanel>
          </TabPanels>
        </Tabs>
      </ThemeProvider>,
    );
    const tabs = getAllByRole('tab');
    const tabPanels = getAllByRole('tabpanel', { hidden: true });
    expect(tabs).toHaveLength(3);
    expect(tabPanels).toHaveLength(3);
    expect(tabs[0].tabIndex).toBe(0);
    expect(tabPanels[0].textContent).toBe('The Primary Colors');
    tabs[1].click();
    expect(tabs[1].tabIndex).toBe(0);
    expect(tabPanels[1].textContent).toBe('Are 1, 2, 3');
  });
});
