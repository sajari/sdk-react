/** @jsx jsx */
import { jsx } from '@emotion/core';
import { Image, Rating, Text } from '@sajari/react-components';
import React from 'react';
import { __DEV__ } from 'sajari-react-sdk-utils';
import tw, { styled } from 'twin.macro';

import useResultStyles from './styles';
import { ResultProps } from './types';

const Heading = styled(Text)`
  ${tw`font-medium text-gray-900`}
`;

const Result = React.forwardRef((props: ResultProps, ref?: React.Ref<HTMLDivElement>) => {
  const styles = useResultStyles(props);
  // const { appearance } = props;

  return (
    <div {...props} ref={ref} css={styles.container}>
      <Image src="https://source.unsplash.com/random/100x100" css={tw`mr-5 rounded-md`} />

      <div style={tw`flex-1 min-w-0`}>
        <div style={tw`md:flex`}>
          <div style={tw`md:flex-1`}>
            <Heading as="h1">Apple - iPhone 6s Plus 64GB - Space Gray</Heading>
            <div style={tw`flex items-baseline mt-1`}>
              <Text css={tw`mr-3 text-xs text-gray-400`}>Cell Phones &gt; iPhone</Text>
              <Rating value={4} max={5} />
            </div>
          </div>
          <Text truncate={2} css={tw`mt-1 text-sm text-gray-500`}>
            A 5.5-inch Retina HD display with 3D Touch. 7000 series aluminum and stronger cover glass. An A9 chip with
            64-bit desktop-class architecture. All new 12MP iSight camera with Live Photos. Touch ID. Faster LTE and
            Wi-Fi. Long battery life and iOS 9 and iCloud. All in a smooth, continuous unibody design.
          </Text>
        </div>
      </div>
    </div>
  );
});

if (__DEV__) {
  Result.displayName = 'Result';
}

export default Result;
export type { ResultProps };
