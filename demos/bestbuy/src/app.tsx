/* eslint-disable import/no-extraneous-dependencies, no-unused-vars, react/jsx-fragments */
import { Button, PoweredBy, Radio, RadioGroup } from '@sajari/react-components';
import { useSearch } from '@sajari/react-hooks';
import {
  Filter,
  Input,
  Pagination,
  Results,
  ResultsPerPage,
  Sorting,
  Summary,
  ViewType,
} from '@sajari/react-search-ui';
import { Box, Flex, Heading, IconButton, Logomark, VisuallyHidden } from '@sajari-ui/core';
import { useCallback, useState } from 'preact/hooks';

import { formatNumber } from './number';

type SearchMode = 'instant' | 'suggestions' | 'typeahead' | 'results' | 'standard' | undefined;

const App = () => {
  const { results, search, searching } = useSearch();
  const [searchMode, setSearchMode] = useState<SearchMode>('instant');
  const [showOptions, setShowOptions] = useState(false);

  const renderPrice = useCallback((v: string) => {
    switch (true) {
      case /\d+\s-\s\d+/gm.test(v): {
        const [min, max] = v
          .split(' - ')
          .map(Number)
          .map((limit) => formatNumber(limit, 'USD', true));
        return `${min} - ${max}`;
      }
      case v.startsWith('>'):
        return `Over ${formatNumber(Number(v.substring(2)), 'USD', true)}`;
      case v.startsWith('<'):
        return `Under ${formatNumber(Number(v.substring(2)), 'USD', true)}`;
      default:
        return null;
    }
  }, []);

  const renderContent = () => {
    if (results && results.length > 0) {
      return (
        <>
          <Flex alignItems="items-center" justifyContent="justify-end" margin={['mb-8', 'lg:mb-6']} space="space-x-4">
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
                <ResultsPerPage />
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
            <Pagination scrollToTop />
          </Box>
        </>
      );
    }

    return null;
  };

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
                  <Input mode={searchMode} placeholder="Search Bestbuy" />
                </Box>
                {searchMode === 'standard' && (
                  <Button
                    type="button"
                    onClick={() => {
                      search();
                    }}
                    appearance="primary"
                  >
                    Search
                  </Button>
                )}
              </Flex>
              <Box display={['hidden', 'lg:block']} margin="ml-6">
                <RadioGroup
                  defaultValue={searchMode}
                  inline
                  spacing="4"
                  onChange={(e) => {
                    setSearchMode(e.target.value as SearchMode);
                  }}
                >
                  <Radio value="suggestions">Suggestions</Radio>
                  <Radio value="standard">Standard</Radio>
                  <Radio value="instant">Instant</Radio>
                </RadioGroup>
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
          {results && results.length > 0 ? (
            <Box
              as="aside"
              position={['fixed', 'lg:static']}
              offset={['inset-0']}
              zIndex="z-40"
              width={['w-full', 'lg:w-80']}
              height={['h-full', 'lg:h-auto']}
              padding={['pt-20']}
              margin={['-mb-20', 'lg:mb-0']}
              backgroundColor="bg-white"
              borderWidth={['border-b', 'lg:border-r']}
              borderColor="border-gray-200"
              display={['lg:block', showOptions ? 'block' : 'hidden']}
            >
              <Box
                display="lg:block"
                position={['lg:relative', 'lg:sticky']}
                // @ts-ignore
                offset="lg:top-20"
                height={['h-full', 'lg:h-auto']}
                overflow={['overflow-y-auto', 'lg:overflow-y-visible']}
                backgroundColor={['bg-white', 'lg:bg-transparent']}
              >
                <Flex
                  as="nav"
                  padding={['px-6', 'pt-6', 'lg:p-0', 'lg:pl-1', 'lg:pr-12', 'lg:pt-8']}
                  height="lg:h-(screen-20)"
                  fontSize={['text-base', 'lg:text-sm']}
                  overflow="overflow-y-auto"
                  flexDirection="flex-col"
                  space="space-y-6"
                >
                  <Filter type="list" name="category" title="Category" />
                  <Filter type="list" name="brand" title="Brand" />
                  <Filter type="list" name="price" title="Price" itemRender={renderPrice} />
                  <Filter type="color" name="color" title="Color" />
                  <Filter type="rating" name="rating" title="Rating" />
                  <Filter type="list" name="price_bucket" title="Price (Bucket)" />
                </Flex>
              </Box>
            </Box>
          ) : null}
          <Box
            as="main"
            overflow="lg:overflow-visible"
            flex="lg:flex-1"
            padding={['pt-24', 'lg:pt-28', 'lg:pl-10']}
            width="w-full"
            minHeight="min-h-screen"
            maxHeight="max-h-full"
          >
            {renderContent()}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default App;
