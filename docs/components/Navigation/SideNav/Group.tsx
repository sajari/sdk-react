import { Box } from '@sajari-ui/core';

import { SideNavLink, stringToUrl } from '../NavLink';
import { SideNavGroupHeading } from './Heading';

interface SideNavGroupProps {
  title: string;
  links: Array<string>;
  prefix?: string;
}

export const SideNavGroup = (props: SideNavGroupProps) => {
  const { title, links, prefix = title.toLowerCase().replace(/\s/g, '-') } = props;

  return (
    <Box>
      <SideNavGroupHeading>{title}</SideNavGroupHeading>

      {links.map((key) => {
        const name = key.replace(/!/g, '');
        const link = `${prefix}/${name.toLowerCase()}`;

        return (
          <SideNavLink key={link} href={stringToUrl(link)}>
            {name}
          </SideNavLink>
        );
      })}
    </Box>
  );
};
