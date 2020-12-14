/** @jsx jsx */
import { jsx } from '@emotion/core';
import { Box, Heading, Spinner, Text } from '@sajari/react-components';
import { getStylesObject } from '@sajari/react-sdk-utils';
import * as React from 'react';

import useMessageStyles from './styles';
import { MessageProps } from './types';

const Message = (props: MessageProps) => {
  const { title, body, appearance, styles: stylesProp, disableDefaultStyles = false, ...rest } = props;
  const styles = getStylesObject(useMessageStyles(), disableDefaultStyles);

  const render = () => {
    switch (appearance) {
      case 'loading':
        return (
          <Box css={styles.loadingWrapper}>
            <Spinner css={styles.loadingSpinner} disableDefaultStyles={disableDefaultStyles} />
            {title && <Text css={styles.loadingText} disableDefaultStyles={disableDefaultStyles}>{`${title}...`}</Text>}
          </Box>
        );

      case 'error':
        return (
          <React.Fragment>
            <Heading size="3xl" css={styles.errorHeading} disableDefaultStyles={disableDefaultStyles}>
              {title}
            </Heading>
            {body && (
              <Text css={styles.errorText} disableDefaultStyles={disableDefaultStyles}>
                {body}
              </Text>
            )}
          </React.Fragment>
        );

      default:
      case 'default':
        return (
          <React.Fragment>
            <Heading size="3xl" disableDefaultStyles={disableDefaultStyles}>
              {title}
            </Heading>
            {body && (
              <Text
                css={styles.defaultText}
                disableDefaultStyles={disableDefaultStyles}
                dangerouslySetInnerHTML={{
                  __html: body,
                }}
              />
            )}
          </React.Fragment>
        );
    }
  };

  return (
    <Box css={[styles.container, stylesProp]} {...rest}>
      {render()}
    </Box>
  );
};

export default Message;
