import React, { useEffect } from 'react';
import { Box, Flex, useDisclosure } from '@sajari-ui/core';
import { Combobox } from '@sajari/react-components';
import SearchModal from './SearchModal';

const SearchBar = () => {
  const { open: openSearchModal, onOpen: onOpenSearchModal, onClose: onCloseSearchModal } = useDisclosure();

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.ctrlKey || e.metaKey)) {
        onOpenSearchModal();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
    };
  }, []);

  return (
    <Box flex="flex-1" maxWidth="max-w-xl" position="relative" margin="mx-5" display={['hidden', 'sm:block']}>
      <Combobox
        placeholder="Search the docs"
        readOnly
        onClick={onOpenSearchModal}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            onOpenSearchModal();
          }
        }}
      />
      <SearchModal open={openSearchModal} onClose={onCloseSearchModal} />
      <Flex
        position="absolute"
        offset={['top-0', 'right-0']}
        gap="gap-x-1"
        fontSize="text-xs"
        fontWeight="font-bold"
        height="h-full"
        alignItems="items-center"
        padding="px-3"
      >
        <Box
          as="kbd"
          backgroundColor="bg-gray-100"
          width="w-5"
          lineHeight="leading-4"
          textAlign="text-center"
          borderWidth={['border', 'border-b-4']}
          borderRadius="rounded"
          borderColor="border-gray-200"
        >
          ⌘
        </Box>
        <Box
          as="kbd"
          backgroundColor="bg-gray-100"
          width="w-5"
          lineHeight="leading-4"
          textAlign="text-center"
          borderWidth={['border', 'border-b-4']}
          borderRadius="rounded"
          borderColor="border-gray-200"
        >
          K
        </Box>
      </Flex>
    </Box>
  );
};

export default SearchBar;
