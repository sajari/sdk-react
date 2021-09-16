import { Box, Button, Heading, Spinner, Text } from '@sajari/react-components';
import { useQuery, useSearchContext, useSorting } from '@sajari/react-hooks';
import { getStylesObject } from '@sajari/react-sdk-utils';
import * as React from 'react';
import { useTranslation } from 'react-i18next';

import useMessageStyles from './styles';
import { MessageProps } from './types';

const Message = (props: MessageProps) => {
  const {
    title,
    body,
    appearance,
    showReset = false,
    onReset = () => {},
    styles: stylesProp,
    disableDefaultStyles = false,
    ...rest
  } = props;
  const { resetFilters } = useSearchContext();
  const { setSorting } = useSorting();
  const { setQuery } = useQuery();
  const { t } = useTranslation('filter');
  const styles = getStylesObject(useMessageStyles(), disableDefaultStyles);

  const reset = React.useCallback(() => {
    resetFilters();
    setSorting('');
    setQuery('');
    onReset();
  }, []);

  const renderResetButton = showReset ? (
    <Button css={styles.resetButton} appearance="primary" onClick={reset}>
      {t('reset')}
    </Button>
  ) : null;

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
            {renderResetButton}
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
            {renderResetButton}
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
