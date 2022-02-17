import { Box, Heading, Link, Text } from '@sajari/react-components';
import { getStylesObject } from '@sajari/react-sdk-utils';

import { useSearchUIContext } from '../../../ContextProvider';
import { useBannerStyle } from './styles';
import { BannerItemProps } from './types';

const BannerItem = ({ banner, templateMode = false, numberOfCols = 1 }: BannerItemProps) => {
  const { disableDefaultStyles = false, customClassNames } = useSearchUIContext();
  const { title, description, targetUrl, imageUrl, width, height, textColor } = banner;
  const styles = getStylesObject(useBannerStyle({ banner }), disableDefaultStyles);

  return (
    <Box
      css={[
        styles.container,
        customClassNames.banners?.container,
        {
          // In template mode (banners rendered in result template), the `numberOfCols` variable is always 0 because we aren't using ResizeObserver to watch the width anymore
          gridColumnEnd: `span ${templateMode ? width : Math.min(width ?? 1, numberOfCols)}`,
          gridRowEnd: `span ${height}`,
        },
      ]}
    >
      <Link href={targetUrl} css={styles.imageContainer}>
        <img src={imageUrl} css={styles.image} alt="" loading="lazy" />
        {title || description ? (
          <Box css={styles.textContainer}>
            {title ? (
              <Heading
                as="h2"
                className={customClassNames.banners?.heading}
                css={[{ color: textColor }, styles.heading]}
              >
                {title}
              </Heading>
            ) : null}
            {description ? (
              <Text className={customClassNames.banners?.description} css={[{ color: textColor }, styles.description]}>
                {description}
              </Text>
            ) : null}
          </Box>
        ) : null}
      </Link>
    </Box>
  );
};

export default BannerItem;
