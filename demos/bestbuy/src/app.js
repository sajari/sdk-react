/* eslint-disable import/no-extraneous-dependencies, no-unused-vars, react/jsx-fragments */
import { Box, Flex, Heading, IconButton, Logomark, VisuallyHidden } from '@sajari-ui/core';
import { Button, Checkbox, CheckboxGroup } from '@sajari/react-components';
import { useQuery, useSearch } from '@sajari/react-hooks';
import { Input, PageSize, Pagination, PoweredBy, Results, Sorting, Summary, ViewType } from '@sajari/react-search-ui';
import { h } from 'preact';
import { useState } from 'react';

const App = () => {
  const { query, setQuery } = useQuery();
  const { results } = useSearch();
  const [isInstant, setIsInstant] = useState(true);
  const [showOptions, setShowOptions] = useState(false);

  return (
    <>
      <Flex
        boxSizing="box-content"
        backdropFilter="backdrop-blur-1"
        position="fixed"
        offset={['inset-x-0', 'top-0']}
        zIndex="z-50"
        alignItems="items-center"
        padding="py-2"
        height="h-16"
        backgroundColor="bg-gray-50"
        backgroundOpacity="bg-opacity-75"
        borderWidth="border-b"
        borderColor="border-gray-200"
      >
        <Box
          position="relative"
          margin="mx-auto"
          padding={['px-4', 'lg:px-6']}
          width="w-full"
          maxWidth="max-w-screen-xl"
        >
          <Flex alignItems="items-center">
            <VisuallyHidden>
              <Heading>Sajari React SDK Bestbuy Demo</Heading>
            </VisuallyHidden>
            <Flex flex="flex-1" alignItems="items-center">
              <Logomark size="md" margin={['mr-4', 'lg:mr-6']} />
              <Flex flex="flex-1" space="space-x-2">
                <Box flex="flex-1">
                  <Input value={query} onChange={setQuery} />
                </Box>
                {!isInstant && <Button appearance="primary">Search</Button>}
              </Flex>
              <Box display={['hidden', 'lg:block']} margin="ml-6">
                <CheckboxGroup
                  defaultValue={['instant']}
                  inline
                  spacing="4"
                  onChange={(selected) => {
                    setIsInstant(selected.includes('instant'));
                  }}
                >
                  <Checkbox value="suggestions">Suggestions</Checkbox>
                  <Checkbox value="instant">Instant</Checkbox>
                </CheckboxGroup>
              </Box>
              <Box display={['hidden', 'lg:block']} margin="ml-6">
                <PoweredBy appearance="color" />
              </Box>
              <IconButton
                display="lg:hidden"
                label="Options"
                icon={showOptions ? 'close' : 'menu'}
                appearance="ghost"
                margin="ml-2"
                onClick={() => setShowOptions((o) => !o)}
              />
            </Flex>
          </Flex>
        </Box>
      </Flex>
      <Box margin="mx-auto" padding="px-6" width="w-full" maxWidth="max-w-screen-xl" flex="flex-1">
        <Box display={['block', 'lg:flex']}>
          <Box
            as="aside"
            position={['fixed', 'lg:static']}
            offset={['inset-0']}
            zIndex="z-40"
            width={['w-full', 'lg:w-80']}
            height={['h-full', 'lg:h-auto']}
            padding={['pt-20']}
            margin={['-mb-20', 'lg:-mb-0']}
            backgroundColor="bg-white"
            borderWidth={['border-b', 'lg:border-r']}
            borderColor="border-gray-200"
            display={['lg:block', showOptions ? undefined : 'hidden']}
          >
            <Box
              display="lg:block"
              position={['lg:relative', 'lg:sticky']}
              offset="lg:top-20"
              height={['h-full', 'lg:h-auto']}
              overflow={['overflow-y-auto', 'lg:overflow-y-visible']}
              backgroundColor={['bg-white', 'lg:bg-transparent']}
            >
              <Box
                as="nav"
                padding={['px-6', 'pt-6', 'lg:p-0', 'lg:pl-1', 'lg:pr-12', 'lg:pt-8']}
                height="lg:h-(screen-20)"
                fontSize={['text-base', 'lg:text-sm']}
                overflow="overflow-y-auto"
              >
                {/** TODO: Filter composition */}
              </Box>
            </Box>
          </Box>
          <Box
            as="main"
            overflow="lg:overflow-visible"
            flex="lg:flex-1"
            padding={['pt-24', 'lg:pt-28', 'lg:pl-10']}
            width="w-full"
            minHeight="min-h-screen"
            maxHeight="max-h-full"
          >
            {results ? (
              <>
                <Flex
                  alignItems="items-center"
                  justifyContent="justify-end"
                  margin={['mb-8', 'lg:mb-6']}
                  space="space-x-4"
                >
                  <Summary />
                  <Flex justifyContent="justify-end" alignItems="items-center" flex="flex-1" space="space-x-8">
                    <Sorting
                      options={[
                        { name: 'Most Relevant', value: '' },
                        { name: 'Price: High to Low', value: '-price' },
                        { name: 'Price: Low to High', value: 'price' },
                        { name: 'Rating: High to Low', value: '-rating' },
                        { name: 'Rating: Low to High', value: 'rating' },
                        { name: 'Popularity', value: 'popularity' },
                        { name: 'Best Seller', value: 'bestSellingRank' },
                      ]}
                    />
                    <Box display={['hidden', 'lg:flex']} space="space-x-8">
                      <PageSize />
                      <ViewType />
                    </Box>
                  </Flex>
                </Flex>
                <Box>
                  <Results />
                </Box>
                <Box
                  position="sticky"
                  offset="bottom-0"
                  margin={['-mx-8', 'lg:mx-0']}
                  padding={['p-4', 'pt-2', 'lg:p-6']}
                  textAlign="text-center"
                >
                  <Pagination />
                </Box>
              </>
            ) : null}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default App;
