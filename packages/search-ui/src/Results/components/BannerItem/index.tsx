import { Box, Heading, Link, Text } from '@sajari/react-components';
import { getStylesObject } from '@sajari/react-sdk-utils';

import { useSearchUIContext } from '../../../ContextProvider';
import { useBannerStyle } from './styles';
import { BannerItemProps } from './types';

const BannerItem = ({ banner, numberOfCols = 1 }: BannerItemProps) => {
  const { disableDefaultStyles = false, customClassNames, tracking } = useSearchUIContext();
  const { title, description, targetUrl, imageUrl, width, height, textColor } = banner;
  const colSpan = Math.min(width ?? 1, numberOfCols);
  const styles = getStylesObject(
    useBannerStyle({ banner, isOnItsOwnRow: colSpan >= numberOfCols }),
    disableDefaultStyles,
  );
  const onClick = () => tracking.onPromotionClick(banner);

  return (
    <Box
      css={[
        styles.container,
        customClassNames.banners?.container,
        {
          gridColumnEnd: `span ${colSpan}`,
          gridRowEnd: `span ${height}`,
        },
      ]}
    >
      <Box data-testid="banner-image-container" css={styles.imageContainer}>
        <Link href={targetUrl} css={styles.link} onClick={onClick}>
          <img src={imageUrl} css={styles.image} alt="" loading="lazy" />
          {(title || description) && (
            <Box css={styles.textContainer}>
              {title && (
                <Heading
                  as="h2"
                  className={customClassNames.banners?.heading}
                  css={[{ color: textColor }, styles.heading]}
                >
                  {title}
                </Heading>
              )}
              {description && (
                <Text
                  className={customClassNames.banners?.description}
                  css={[{ color: textColor }, styles.description]}
                >
                  {description}
                </Text>
              )}
            </Box>
          )}
        </Link>
      </Box>
    </Box>
  );
};

export default BannerItem;
