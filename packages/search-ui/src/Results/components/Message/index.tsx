/** @jsx jsx */
import { jsx } from '@emotion/core';
import { Box, Heading, Spinner, Text } from '@sajari/react-components';
import * as React from 'react';
import tw from 'twin.macro';

import { MessageProps } from './types';

export default (props: MessageProps) => {
  const { title, body, appearance } = props;

  const render = () => {
    switch (appearance) {
      case 'loading':
        return (
          <Box css={tw`text-gray-500`}>
            <Spinner css={tw`inline-block w-6 h-6`} />
            {body && <Text css={tw`mt-3`}>{`${body}...`}</Text>}
          </Box>
        );

      case 'error':
        return (
          <React.Fragment>
            {/* @ts-ignore union too complex */}
            <Heading size="3xl" css={tw`text-red-500`}>
              {title}
            </Heading>
            {body && <Text css={tw`text-gray-500`}>{body}</Text>}
          </React.Fragment>
        );

      default:
      case 'default':
        return (
          <React.Fragment>
            <Heading size="3xl">{title}</Heading>
            {body && (
              <Text
                css={tw`text-gray-500`}
                dangerouslySetInnerHTML={{
                  __html: body,
                }}
              />
            )}
          </React.Fragment>
        );
    }
  };

  return <Box css={tw`w-full p-40 text-center`}>{render()}</Box>;
};
