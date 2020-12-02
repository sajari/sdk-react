import { Box, BoxProps, Heading, HeadingProps } from '@sajari-ui/core';
import React from 'react';

import { components, searchComponents, hooks, tracking } from '../components';
import { SideNavLink, stringToUrl } from './NavLink';

const topNavLinks = [['Getting Started', '/'], ['Components'], ['Hooks'], ['Search UI'], ['Tracking']];

const NavGroupHeading = (props: HeadingProps) => <Heading size="xs" as="h2" margin="mb-2" {...props} />;

export const SideNavContent = () => (
  <Box space="space-y-10" margin="mb-10">
    <Box>
      {topNavLinks.map(([name, link]) => (
        <SideNavLink key={link || name} href={link || stringToUrl(name)}>
          {name}
        </SideNavLink>
      ))}
    </Box>

    <Box>
      <NavGroupHeading>Components</NavGroupHeading>

      {components.map((name) => {
        const link = `components/${name}`;

        return (
          <SideNavLink key={link} href={stringToUrl(link)}>
            {name}
          </SideNavLink>
        );
      })}
    </Box>

    <Box>
      <NavGroupHeading>Hooks</NavGroupHeading>

      {hooks.map((name) => {
        const link = `hooks/${name}`;

        return (
          <SideNavLink key={link} href={stringToUrl(link)}>
            {name}
          </SideNavLink>
        );
      })}
    </Box>

    <Box>
      <NavGroupHeading>Search UI</NavGroupHeading>

      {searchComponents.map((name) => {
        const link = `search-ui/${name}`;

        return (
          <SideNavLink key={link} href={stringToUrl(link)}>
            {name}
          </SideNavLink>
        );
      })}
    </Box>

    <Box>
      <NavGroupHeading>Tracking</NavGroupHeading>

      {tracking.map((name) => {
        const link = `tracking/${name}`;

        return (
          <SideNavLink key={link} href={stringToUrl(link)}>
            {name}
          </SideNavLink>
        );
      })}
    </Box>
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
