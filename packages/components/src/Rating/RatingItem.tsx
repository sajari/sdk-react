/** @jsx jsx */
import { jsx } from '@emotion/core';
import { getStylesObject } from '@sajari/react-sdk-utils';

import Box from '../Box';
import useRatingItemStyles from './styles';
import { InternalRatingItemProps } from './types';

export const RatingItem = (props: InternalRatingItemProps) => {
  const { character, active, count, index, styles: stylesProp, disableDefaultStyles = false, ...rest } = props;
  const characterNode = typeof character === 'function' ? character({ count, index }) : character;
  const styles = getStylesObject(useRatingItemStyles(props), disableDefaultStyles);

  return (
    <Box css={[styles.container, stylesProp]} aria-hidden {...rest}>
      <div aria-setsize={count} aria-posinset={index + 1}>
        <div css={styles.firstHalf}>{characterNode}</div>
        <div css={styles.secondHalf}>{characterNode}</div>
      </div>
    </Box>
  );
};
