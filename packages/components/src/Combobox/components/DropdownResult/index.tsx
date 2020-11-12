/** @jsx jsx */
import { jsx } from '@emotion/core';
import { Heading, Image, Text } from '@sajari/react-components';
import tw from 'twin.macro';

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

        <div css={tw`space-y-2`}>
          <Heading as="h1" size="base">
            {value.title}
          </Heading>
          <Text truncate={2}>{value.description}</Text>
        </div>
      </a>
    </Box>
  );
};

export default DropdownResult;
