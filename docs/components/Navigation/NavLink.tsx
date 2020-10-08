import { Link, LinkProps } from '@sajari-ui/core';
import NextLink, { LinkProps as NextLinkProps } from 'next/link';
import { useRouter } from 'next/router';
import React, { forwardRef } from 'react';

interface NavLinkProps extends NextLinkProps {
  children?: React.ReactNode;
}

const NavLink = (props: NavLinkProps) => {
  const { href, children, ...rest } = props;
  const router = useRouter();
  let active = false;

  if (router.pathname === href) {
    active = true;
  }

  return (
    <NextLink href={href} passHref {...rest}>
      {typeof children === 'function' ? children(active) : children}
    </NextLink>
  );
};

export const stringToUrl = (str = '', path = '/') => {
  return `${path}${str.toLowerCase().split(' ').join('-')}`;
};

export const SideNavLink = forwardRef((props: LinkProps, ref?: React.Ref<HTMLAnchorElement>) => {
  const { href = '', ...rest } = props;

  return (
    <NavLink href={href}>
      {(active: boolean) => (
        <Link
          ref={ref}
          position="relative"
          zIndex="focus:z-10"
          margin="-mx-2"
          display="flex"
          alignItems="items-center"
          padding={['px-2', 'py-1']}
          fontWeight="font-medium"
          aria-current={active ? 'page' : undefined}
          textColor={active ? 'text-blue-500' : ['text-gray-500', 'hover:text-gray-700', 'focus:text-gray-700']}
          backgroundColor={active ? 'bg-blue-50' : undefined}
          borderRadius="rounded"
          textDecoration="no-underline"
          {...rest}
        />
      )}
    </NavLink>
  );
});
