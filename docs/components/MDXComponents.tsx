import {
  Box,
  BoxProps,
  Card,
  Divider,
  DividerProps,
  Heading,
  HeadingProps,
  Icon,
  Link,
  LinkProps,
  Table,
  TableDataCell,
  TableDataCellProps,
  TableHeaderCell,
  TableHeaderCellProps,
  Text,
  TextProps,
} from '@sajari-ui/core';
import { TableProps } from '@sajari-ui/core/dist/types';
import NextLink from 'next/link';

import CodeBlock from './CodeBlock';

const DocsHeading = (props: HeadingProps) => {
  const { children, id } = props;

  return (
    <Heading
      display="flex"
      alignItems="items-center"
      position="relative"
      margin={['mb-2', 'mt-4', '-ml-6']}
      group="group"
      {...props}
    >
      {id && (
        <Box
          as="a"
          href={`#${id}`}
          aria-label={`Anchor to ${children}`}
          transform="transform"
          translate="-translate-x-2"
          transitionProperty="transition-all"
          transitionDuration="duration-200"
          opacity={['opacity-0', 'group-hover:opacity-100', 'group-focus:opacity-100', 'focus:opacity-100']}
          padding="pr-2"
          textColor={['text-gray-400', 'hover:text-blue-500', 'focus:text-blue-500']}
          outline="focus:outline-none"
        >
          <Icon name="link" display="block" />
        </Box>
      )}

      {children}
    </Heading>
  );
};

const MDXComponents = {
  h1: (props: HeadingProps) => <Heading as="h1" size="lg" margin="my-4" {...props} />,
  h2: (props: HeadingProps) => <DocsHeading as="h2" size="md" {...props} />,
  h3: (props: HeadingProps) => <DocsHeading as="h3" size="sm" {...props} />,
  inlineCode: (props: TextProps) => <Text as="code" {...props} />,
  code: CodeBlock,
  pre: (props: BoxProps) => <Box margin="my-8" borderRadius="rounded-md" {...props} />,
  kbd: (props: TextProps) => <Text as="kbd" {...props} />,
  br: (props: BoxProps) => <Box height="h-4" {...props} />,
  hr: (props: DividerProps) => <Divider margin="my-8" {...props} />,
  table: (props: TableProps) => (
    <Card margin="my-8" overflow="overflow-auto">
      <Table width="w-full" {...props} />
    </Card>
  ),
  th: (props: TableHeaderCellProps) => <TableHeaderCell {...props} />,
  td: (props: TableDataCellProps) => <TableDataCell fontSize="text-sm" {...props} />,
  a: ({ href, ...rest }: LinkProps) => {
    if (!href) {
      return null;
    }

    if (!href.startsWith('/') || href.startsWith('http')) {
      return <Link href={href} {...rest} />;
    }

    return (
      <NextLink href={href} passHref>
        <Link {...rest} />
      </NextLink>
    );
  },
  p: (props: TextProps) => <Text margin="my-4" {...props} />,
  ul: (props: BoxProps) => (
    <Box as="ul" margin="my-4" padding={['pt-2', 'pl-4']} listStyleType="list-disc" {...props} />
  ),
  ol: (props: BoxProps) => (
    <Box as="ol" margin="my-4" padding={['pt-2', 'pl-4']} listStyleType="list-decimal" {...props} />
  ),
  li: (props: BoxProps) => <Box as="li" padding="pb-2" {...props} />,
  blockquote: (props: BoxProps) => (
    <Box
      as="blockquote"
      padding={['px-6', 'py-px']}
      space="space-y-4"
      fontStyle="italic"
      backgroundColor="bg-gray-100"
      borderRadius="rounded-md"
      textColor="text-gray-600"
      {...props}
    />
  ),
};

export default MDXComponents;
