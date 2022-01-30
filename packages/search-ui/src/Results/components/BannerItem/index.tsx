import { Box, Heading, Link, Text } from '@sajari/react-components';
import { getStylesObject } from '@sajari/react-sdk-utils';

import { useSearchUIContext } from '../../../ContextProvider';
import { useBannerStyle } from './styles';
import { BannerItemProps } from './types';

const BannerItem = ({ banner, numberOfCols, banners }: BannerItemProps) => {
  const { disableDefaultStyles = false, customClassNames } = useSearchUIContext();
  const { title, description, targetUrl, imageUrl, width, height, position = 1, textColor } = banner;
  const styles = getStylesObject(useBannerStyle({ banner }), disableDefaultStyles);
  const col = ((position - 1) % numberOfCols) + 1;
  const bannersBeforeThis = banners.filter((b) => (b.position ?? 0) < position && b.width === numberOfCols);
  const row =
    Math.floor((position - 1) / numberOfCols) +
    1 +
    bannersBeforeThis.reduce((acc, c) => {
      return acc + (c.height ?? 0) - 1;
    }, 0);

  return (
    <Box
      css={[
        styles.container,
        customClassNames.banners?.container,
        { gridColumn: `${col} / span ${Math.min(width ?? 1, numberOfCols)}`, gridRow: `${row} / span ${height}` },
      ]}
    >
      <Link href={targetUrl} css={styles.imageContainer}>
        <img src={imageUrl} css={styles.image} alt="" />
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
