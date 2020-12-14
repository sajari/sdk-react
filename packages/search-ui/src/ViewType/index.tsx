/** @jsx jsx */
import { jsx } from '@emotion/core';
import { useId } from '@react-aria/utils';
import { Box, Button, ButtonGroup, Text } from '@sajari/react-components';
import { useSearchContext } from '@sajari/react-hooks';
import { getStylesObject } from '@sajari/react-sdk-utils';
import { useTranslation } from 'react-i18next';

import { IconSmallGrid, IconSmallList } from '../assets/icons';
import { useSearchUIContext } from '../ContextProvider';
import useViewTypeStyles from './styles';
import { ViewTypeProps } from './types';

const ViewType = (props: ViewTypeProps) => {
  const { t } = useTranslation();
  const { customClassNames, disableDefaultStyles = false } = useSearchUIContext();
  const { label = t('viewType.label'), size, styles: stylesProp, ...rest } = props;
  const id = `view-type-${useId()}`;
  const { viewType, setViewType, searched } = useSearchContext();
  const styles = getStylesObject(useViewTypeStyles(), disableDefaultStyles);

  if (!searched) {
    return null;
  }

  return (
    <Box
      css={[styles.container, stylesProp]}
      aria-labelledby={id}
      {...rest}
      className={customClassNames.viewType?.container}
    >
      <Text
        id={id}
        css={styles.label}
        disableDefaultStyles={disableDefaultStyles}
        size={size}
        className={customClassNames.viewType?.label}
      >
        {label}
      </Text>
      <ButtonGroup
        id={id}
        attached
        disableDefaultStyles={disableDefaultStyles}
        className={customClassNames.viewType?.buttonGroup}
      >
        <Button
          onClick={() => setViewType('grid')}
          size={size}
          appearance={viewType === 'grid' ? 'primary' : undefined}
          aria-label={t('viewType.grid')}
        >
          &#8203;
          <IconSmallGrid />
        </Button>
        <Button
          onClick={() => setViewType('list')}
          size={size}
          appearance={viewType === 'list' ? 'primary' : undefined}
          aria-label={t('viewType.list')}
        >
          &#8203;
          <IconSmallList />
        </Button>
      </ButtonGroup>
    </Box>
  );
};

export default ViewType;
export type { ViewTypeProps };
