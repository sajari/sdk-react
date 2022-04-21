import * as React from 'react';

import { render } from '../../test/utils';
import Tabs, { Tab, TabList, TabPanel, TabPanels } from '..';

describe('Tabs', () => {
  it('Should call the onChange handler', () => {
    const setTabIndex = jest.fn();
    const { getAllByRole } = render(
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
      </Tabs>,
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
      </Tabs>,
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

  it('can add custom data-* attributes', () => {
    const { getByTestId } = render(
      <Tabs data-testid="tabs" data-active="false">
        <TabList>
          <Tab data-testid="tab" data-active="false">
            Red
          </Tab>
        </TabList>
      </Tabs>,
    );
    const tabs = getByTestId('tabs');
    expect(tabs).toBeVisible();
    expect(tabs).toHaveAttribute('data-active', 'false');

    const tab = getByTestId('tab');
    expect(tab).toBeVisible();
    expect(tab).toHaveAttribute('data-active', 'false');
  });
});
