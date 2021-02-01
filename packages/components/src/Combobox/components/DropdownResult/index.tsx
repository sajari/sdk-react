import { getStylesObject } from '@sajari/react-sdk-utils';
import classnames from 'classnames';
import * as React from 'react';

import Box from '../../../Box';
import Heading from '../../../Heading';
import Image from '../../../Image';
import Text from '../../../Text';
import { useComboboxContext } from '../../context';
import { useDropdownItemStyles } from './styles';
import { DropdownResultProps } from './types';

const DropdownResult = (props: DropdownResultProps) => {
  const { value, index, selected, ...rest } = props;
  const {
    getItemProps,
    disableDefaultStyles = false,
    customClassNames: {
      resultImageContainerClassName = '',
      resultTextContainerClassName = '',
      resultClassName = '',
      selectedResultClassName = '',
    },
  } = useComboboxContext();
  const styles = getStylesObject(useDropdownItemStyles(props), disableDefaultStyles);

  return (
    <Box
      as="li"
      {...getItemProps({
        index,
        item: value,
      })}
      className={classnames(resultClassName, { [selectedResultClassName]: selected })}
      {...rest}
    >
      <Box as="a" href={value.url} onClick={value.onClick} onContextMenu={value.onClick} css={styles.item}>
        <Box css={styles.imageContainer} className={resultImageContainerClassName}>
          <Image src={value.image} aspectRatio={1} objectFit="contain" />
        </Box>

        <Box css={styles.textContainer} className={resultTextContainerClassName}>
          <Heading as="h1" size="sm">
            {value.title}
          </Heading>
          <Text truncate>{value.description}</Text>
        </Box>
      </Box>
    </Box>
  );
};

export default DropdownResult;
