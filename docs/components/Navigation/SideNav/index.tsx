import { Box, BoxProps, Heading, HeadingProps } from '@sajari-ui/core';
import * as React from 'react';

import { classes, components, searchComponents, hooks, tracking } from '../../menu-items';
import { SideNavLink, stringToUrl } from '../NavLink';
import { SideNavGroup } from './Group';

const topNavLinks = [
  ['Getting Started', '/'],
  ['Components'],
  ['Hooks'],
  ['Search UI'],
  ['Tracking'],
  ['Localization'],
  ['Server Side Rendering', '/ssr'],
  ['Styling'],
  ['Upgrading'],
];

export const SideNavContent = () => (
  <Box space="space-y-10" margin="mb-10">
    <Box>
      {topNavLinks.map(([name, link]) => (
        <SideNavLink key={link || name} href={link || stringToUrl(name)}>
          {name}
        </SideNavLink>
      ))}
    </Box>

    <SideNavGroup title="Classes" links={classes} />
    <SideNavGroup title="Components" links={components} />
    <SideNavGroup title="Hooks" links={hooks} />
    <SideNavGroup title="Search UI" links={searchComponents} />
    <SideNavGroup title="Tracking" links={tracking} />
  </Box>
);

const SideNav = (props: BoxProps) => (
  <Box position="fixed" offset={['inset-x-0', 'top-0']} display={['hidden', 'md:block']} height="h-full" width="w-72">
    <Box
      margin="mt-16"
      position="relative"
      overflow="overflow-y-auto"
      borderWidth="border-r"
      borderColor="border-gray-200"
      {...props}
    >
      <Box as="nav" height="h-(screen-16)" aria-label="Main navigation" fontSize="text-sm" padding="p-6">
        <SideNavContent />
      </Box>
    </Box>
  </Box>
);

export default SideNav;
