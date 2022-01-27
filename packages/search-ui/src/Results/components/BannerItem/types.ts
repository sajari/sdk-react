import { ColumnValue } from '../../types';

/**
 * TextPosition describes the position of text in a box.
 *
 *  - TEXT_POSITION_UNSPECIFIED: No position specified.
 *  - TEXT_POSITION_CENTER: The text is positioned in the horizontal and vertical center.
 *  - TEXT_POSITION_TOP_LEFT: The text is positioned in the top left corner.
 *  - TEXT_POSITION_TOP_RIGHT: The text is positioned in the top right corner.
 *  - TEXT_POSITION_BOTTOM_LEFT: The text is positioned in the bottom left corner.
 *  - TEXT_POSITION_BOTTOM_RIGHT: The text is positioned in the bottom right corner.
 * @export
 * @enum {string}
 */
export enum TextPosition {
  Unspecified = 'TEXT_POSITION_UNSPECIFIED',
  Center = 'TEXT_POSITION_CENTER',
  TopLeft = 'TEXT_POSITION_TOP_LEFT',
  TopRight = 'TEXT_POSITION_TOP_RIGHT',
  BottomLeft = 'TEXT_POSITION_BOTTOM_LEFT',
  BottomRight = 'TEXT_POSITION_BOTTOM_RIGHT',
}

/**
 * A synthetic search result that renders as an image. It takes a user to a
 * pre-determined location when clicked.
 * @export
 * @interface Banner
 */
export interface Banner {
  /**
   * The description of the banner, displayed in sub-head font.
   * @type {string}
   * @memberof Banner
   */
  description?: string;
  /**
   * The height the banner occupies in grid cells.
   * @type {number}
   * @memberof Banner
   */
  height?: number;
  /**
   * The ID of the banner, used to identify clicked banners.
   * @type {string}
   * @memberof Banner
   */
  id?: string;
  /**
   * The URL of the image used for the banner.
   * @type {string}
   * @memberof Banner
   */
  imageUrl?: string;
  /**
   * The 1-based index indicating where the banner appears in search results.
   * @type {number}
   * @memberof Banner
   */
  position?: number;
  /**
   * The URL to redirect the user to when the banner is clicked.
   * @type {string}
   * @memberof Banner
   */
  targetUrl?: string;
  /**
   * The color of the text as a hex code with a # prefix, e.g. #FFCC00 or #FC0.
   * @type {string}
   * @memberof Banner
   */
  textColor?: string;
  /**
   *
   * @type {TextPosition}
   * @memberof Banner
   */
  textPosition?: TextPosition;
  /**
   * The title of the banner, displayed in header font.
   * @type {string}
   * @memberof Banner
   */
  title?: string;
  /**
   * The width the banner occupies in grid cells.
   * @type {number}
   * @memberof Banner
   */
  width?: number;
}

export interface BannerItemProps {
  banner: Banner;
  numberOfCols: ColumnValue;
}
