export interface RatingProps {
  /** The rating value, accepts decimal to represent half rating */
  value: number;
  /** Maxium level, used to fill in the empty stars */
  max: number;
  /** Associated text */
  children?: React.ReactText;
  /** The icon to show, defaults to star icon */
  character?: React.ReactNode;
  /** Direction */
  direction?: "ltr" | "rtl";
  /** Unit, used for labeling, default to "stars" */
  unit?: string;
}

export interface RatingItemProps {
  /** Index */
  index: number;
  /** Total count */
  count: number;
  /** The icon to show, defaults to star icon */
  character: RatingProps["character"];
  /** Is half */
  half?: boolean;
  /** Is the current item active */
  active: boolean;
  /** Flip the half side around */
  flipped?: boolean;
}
