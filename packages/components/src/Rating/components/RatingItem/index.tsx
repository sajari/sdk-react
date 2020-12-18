import { getStylesObject } from '@sajari/react-sdk-utils';
import * as React from 'react';

import Box from '../../../Box';
import { InternalRatingItemProps } from '../../types';
import useRatingItemStyles from './styles';

export const RatingItem = (props: InternalRatingItemProps) => {
  const { character, active, count, index, styles: stylesProp, disableDefaultStyles = false, ...rest } = props;
  const characterNode = typeof character === 'function' ? character({ count, index }) : character;
  const styles = getStylesObject(useRatingItemStyles(props), disableDefaultStyles);

  return (
    <Box css={[styles.container, stylesProp]} aria-hidden {...rest}>
      <Box aria-setsize={count} aria-posinset={index + 1}>
        <Box css={styles.firstHalf}>{characterNode}</Box>
        <Box css={styles.secondHalf}>{characterNode}</Box>
      </Box>
    </Box>
  );
};

export type { InternalRatingItemProps };
