/** @jsx jsx */
import { jsx } from "@emotion/core";
import React from "react";
import tw, { styled } from "twin.macro";
import { Star } from "../../assets/icons";
import { RatingItem } from "./RatingItem";
import { RatingProps } from "./types";

const StyledBox = styled.div<{ flipped: boolean }>`
  ${({ flipped }) =>
    flipped
      ? tw`inline-flex flex-row-reverse items-center space-x-1 space-x-reverse`
      : tw`inline-flex items-center space-x-1`};
`;

const Rating = React.forwardRef(
  (
    {
      value,
      children,
      character = <Star css={tw`fill-current`} />,
      max = 5,
      direction = "ltr",
      unit = "stars"
    }: RatingProps,
    ref: React.Ref<HTMLDivElement>
  ) => {
    const isHalf = Math.round(value) - value !== 0;
    const remainder = max - Math.ceil(value);
    const flipped = direction === "rtl";
    const label = isHalf
      ? `Rating: ${value} point 5 out of ${max} ${unit}`
      : `Rating: ${value} out of ${max} ${unit}`;

    return (
      <StyledBox flipped={flipped} ref={ref} role="img" aria-label={label}>
        {Array.from(Array(Math.floor(value))).map((k, i) => (
          <RatingItem
            key={`active-rating-${i}`}
            index={i}
            count={max}
            character={character}
            active={true}
          />
        ))}
        {isHalf ? (
          <RatingItem
            key={`half-active-rating`}
            index={Math.ceil(value) - Math.floor(value)}
            count={max}
            flipped={flipped}
            character={character}
            active={true}
            half={true}
          />
        ) : null}
        {Array.from(Array(remainder)).map((k, i) => (
          <RatingItem
            key={`inactive-rating-${i}`}
            index={i}
            count={max}
            character={character}
            active={false}
          />
        ))}
        <span css={tw`sr-only`}>{`${value} star${value > 1 ? "s" : ""}`}</span>
        {children}
      </StyledBox>
    );
  }
);

export default Rating;
