import { Box, BoxProps, Heading, HeadingProps } from '@sajari-ui/core';
import React from 'react';

import { coreComponents, searchComponents, hooks } from '../components';
import { SideNavLink, stringToUrl } from './NavLink';

const topNavLinks = [['Getting Started', '/'], ['Components'], ['Hooks'], ['Search UI']];

const NavGroupHeading = (props: HeadingProps) => <Heading size="xs" as="h2" margin="mb-2" {...props} />;

export const SideNavContent = () => (
  <>
    <Box margin="mb-8">
      {topNavLinks.map(([name, link]) => (
        <SideNavLink key={link || name} href={link || stringToUrl(name)}>
          {name}
        </SideNavLink>
      ))}
    </Box>

    <Box margin="mb-10">
      <NavGroupHeading>Components</NavGroupHeading>

      {coreComponents.map((link) => (
        <SideNavLink key={link} href={stringToUrl(link)}>
          {link}
        </SideNavLink>
      ))}
    </Box>

    <Box margin="mb-10">
      <NavGroupHeading>Hooks</NavGroupHeading>

      {hooks.map((link) => (
        <SideNavLink key={link} href={stringToUrl(link)}>
          {link}
        </SideNavLink>
      ))}
    </Box>

    <Box margin="mb-10">
      <NavGroupHeading>Search UI</NavGroupHeading>

      {searchComponents.map((link) => (
        <SideNavLink key={link} href={stringToUrl(link)}>
          {link}
        </SideNavLink>
      ))}
    </Box>
  </>
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
