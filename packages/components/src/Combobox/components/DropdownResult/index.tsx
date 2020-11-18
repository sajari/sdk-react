/** @jsx jsx */
import { jsx } from '@emotion/core';
import { Heading, Image, Text } from '@sajari/react-components';

import Box from '../../../Box';
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
      key={`${value}_${index}`}
    >
      <a href={value.url} css={styles.item}>
        <div css={styles.imageContainer}>
          <Image src={value.image} css={styles.image} aspectRatio={1} objectFit="contain" />
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
