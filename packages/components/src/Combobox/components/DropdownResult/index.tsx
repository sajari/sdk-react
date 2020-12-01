/** @jsx jsx */
import { jsx } from '@emotion/core';

import Box from '../../../Box';
import Heading from '../../../Heading';
import Image from '../../../Image';
import Text from '../../../Text';
import { useComboboxContext } from '../../context';
import { useDropdownItemStyles } from './styles';
import { DropdownResultProps } from './types';

const DropdownResult = (props: DropdownResultProps) => {
  const { value, index } = props;
  const { getItemProps } = useComboboxContext();
  const styles = useDropdownItemStyles(props);

  return (
    <Box
      as="li"
      {...getItemProps({
        index,
        item: value,
      })}
    >
      <a href={value.url} css={styles.item}>
        <div css={styles.imageContainer}>
          <Image src={value.image} aspectRatio={1} objectFit="contain" />
        </div>

        <div css={styles.textContainer}>
          <Heading as="h1" size="sm">
            {value.title}
          </Heading>
          <Text truncate>{value.description}</Text>
        </div>
      </a>
    </Box>
  );
};

export default DropdownResult;
