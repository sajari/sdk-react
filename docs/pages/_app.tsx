import '../app.css';

import React from 'react';
import { MDXProvider } from '@mdx-js/react';
import { Box, Flex, FlexProps, Heading, Logomark } from '@sajari-ui/core';
import { Pipeline, SearchProvider } from '@sajari/react-hooks';
import { SSRProvider } from '@sajari/react-components';
import { AppProps } from 'next/app';
import Head from 'next/head';

import MDXComponents from '../components/MDXComponents';
import MobileNav from '../components/Navigation/MobileNav';
import SideNav from '../components/Navigation/SideNav';
import TopNavItem from '../components/Navigation/TopNavItem';
import SearchBar from '../components/SearchBar';

const Layout = (props: FlexProps) => {
  const { children, ...rest } = props;

  return (
    <>
      <Flex
        as="header"
        position="sticky"
        offset={['inset-x-0', 'top-0']}
        zIndex="z-30"
        margin="-mt-px"
        padding={['px-6', 'py-2']}
        alignItems="items-center"
        justifyContent="justify-between"
        width="w-full"
        height="h-16"
        backgroundColor="bg-white"
        boxShadow="shadow-border"
        {...rest}
      >
        <Flex alignItems="items-center">
          <Logomark size="sm" margin="mr-3" />
          <Heading as="h3" size="md">
            React SDK
          </Heading>
        </Flex>
        <SearchBar />
        <Flex alignItems="items-center" space="space-x-2">
          <TopNavItem
            icon="large-logo-github"
            label="GitHub"
            rounded
            href="https://github.com/sajari/sdk-react"
            target="_blank"
          />

          <MobileNav />
        </Flex>
      </Flex>

      <SideNav />

      <Box padding="md:pl-72">
        <Box as="main" maxWidth="max-w-5xl" padding={['p-4', 'md:p-8']} margin={['mx-auto', 'mb-3']}>
          {children}
        </Box>
      </Box>
    </>
  );
};

const App = ({ Component, pageProps }: AppProps) => (
  <SearchProvider
    search={{
      pipeline: new Pipeline(
        {
          account: '1624032007288997144',
          collection: 'react-sdk',
        },
        'website',
      ),
    }}
  >
    <SSRProvider>
      <MDXProvider components={MDXComponents}>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="theme-color" content="#319795" />
          <link rel="apple-touch-icon" sizes="180x180" href="/apple-icon-180x180.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
          <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
        </Head>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </MDXProvider>
    </SSRProvider>
  </SearchProvider>
);

export default App;
