import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  DrawerTitle,
  useDisclosure,
} from '@sajari-ui/core';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

import { SideNavContent } from './SideNav';
import TopNavItem from './TopNavItem';

const useRouteChanged = (handleRouteChange: () => void) => {
  const router = useRouter();

  useEffect(() => {
    router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events, handleRouteChange]);
};

export default () => {
  const { open, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef<HTMLElement>(null);
  useRouteChanged(onClose);

  return (
    <>
      <TopNavItem ref={btnRef} display={['flex', 'md:hidden']} icon="large-menu" label="Menu" onClick={onOpen} />
      <Drawer open={open} placement="right" onClose={onClose} finalFocusRef={btnRef}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Menu</DrawerTitle>
            <DrawerCloseButton />
          </DrawerHeader>

          <DrawerBody>
            <SideNavContent />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};
