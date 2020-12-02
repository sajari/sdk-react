/** @jsx jsx */
import { jsx } from '@emotion/core';
import { getStylesObject } from '@sajari/react-sdk-utils';
import classnames from 'classnames';

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
      <a href={value.url} css={styles.item}>
        <div css={styles.imageContainer} className={resultImageContainerClassName}>
          <Image src={value.image} aspectRatio={1} objectFit="contain" />
        </div>

        <div css={styles.textContainer} className={resultTextContainerClassName}>
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
