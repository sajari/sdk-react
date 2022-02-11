import { clamp, inferStylesObjectKeys, isNumber, isObject, mapStyles } from '@sajari/react-sdk-utils';
import tw from 'twin.macro';

import { ColumnValue, GapValue, ResultsProps } from './types';

interface Props extends ResultsProps {
  width: number;
}

function findBreakpoint<T>(breakpoints: Record<number, T>, target: number): T | null {
  const match = Object.keys(breakpoints)
    .map(Number)
    .sort((a, b) => b - a)
    .find((s) => s <= target);

  return match ? breakpoints[match] : null;
}

// Calculate the number of columns for a grid layout
// based on the container width
export function getNumberOfCols({
  columns,
  columnMinWidth = 240,
  width,
}: {
  columns?: ResultsProps['columns'];
  width: number;
  columnMinWidth?: number;
}) {
  if (columns) {
    if (isNumber(columns)) {
      return columns;
    }
    if (isObject(columns)) {
      const match = findBreakpoint<ColumnValue>(columns, width);
      return match || 1;
    }
  } else if (isNumber(columnMinWidth)) {
    return clamp(Math.floor(width / columnMinWidth), 1, 12) as ColumnValue;
  }
  return 1;
}

export default function useResultsStyles({
  appearance = 'list',
  columnMinWidth = 240,
  columns,
  gap: gapProp = appearance === 'list' ? { 0: 4, 640: 8 } : undefined,
  width,
}: Props) {
  const styles = inferStylesObjectKeys({
    container: [],
  });

  if (appearance === 'list') {
    styles.container.push(tw`flex flex-col`);
    let spaceY: GapValue = 4;

    if (gapProp) {
      if (isNumber(gapProp)) {
        spaceY = gapProp;
      } else if (isObject(gapProp)) {
        const match = findBreakpoint<GapValue>(gapProp, width);
        if (match) {
          spaceY = match;
        }
      }

      switch (spaceY) {
        case 1:
          styles.container.push(tw`space-y-1`);
          break;
        case 2:
          styles.container.push(tw`space-y-2`);
          break;
        case 3:
          styles.container.push(tw`space-y-3`);
          break;
        case 4:
          styles.container.push(tw`space-y-4`);
          break;
        case 5:
          styles.container.push(tw`space-y-5`);
          break;
        case 6:
          styles.container.push(tw`space-y-6`);
          break;
        case 7:
          styles.container.push(tw`space-y-7`);
          break;
        case 8:
          styles.container.push(tw`space-y-8`);
          break;
        case 9:
          styles.container.push(tw`space-y-9`);
          break;
        case 10:
          styles.container.push(tw`space-y-10`);
          break;
        case 11:
          styles.container.push(tw`space-y-11`);
          break;
        case 12:
          styles.container.push(tw`space-y-12`);
          break;
        default:
          styles.container.push(tw`space-y-4`);
          break;
      }
    }
  } else if (appearance === 'grid') {
    styles.container.push(tw`grid`);

    let gap: GapValue = 8;
    const numberOfCols = getNumberOfCols({ columns, columnMinWidth, width });

    if (gapProp) {
      if (isNumber(gapProp)) {
        gap = gapProp;
      } else if (isObject(gapProp)) {
        const match = findBreakpoint<GapValue>(gapProp, width);
        if (match) {
          gap = match;
        }
      }
    }

    switch (numberOfCols) {
      case 1:
        styles.container.push(tw`grid-cols-1`);
        break;
      case 2:
        styles.container.push(tw`grid-cols-2`);
        break;
      case 3:
        styles.container.push(tw`grid-cols-3`);
        break;
      case 4:
        styles.container.push(tw`grid-cols-4`);
        break;
      case 5:
        styles.container.push(tw`grid-cols-5`);
        break;
      case 6:
        styles.container.push(tw`grid-cols-6`);
        break;
      case 7:
        styles.container.push(tw`grid-cols-7`);
        break;
      case 8:
        styles.container.push(tw`grid-cols-8`);
        break;
      case 9:
        styles.container.push(tw`grid-cols-9`);
        break;
      case 10:
        styles.container.push(tw`grid-cols-10`);
        break;
      case 11:
        styles.container.push(tw`grid-cols-11`);
        break;
      case 12:
        styles.container.push(tw`grid-cols-12`);
        break;
      default:
        styles.container.push(tw`grid-cols-1`);
        break;
    }

    switch (gap) {
      case 1:
        styles.container.push(tw`gap-1`);
        break;
      case 2:
        styles.container.push(tw`gap-2`);
        break;
      case 3:
        styles.container.push(tw`gap-3`);
        break;
      case 4:
        styles.container.push(tw`gap-4`);
        break;
      case 5:
        styles.container.push(tw`gap-5`);
        break;
      case 6:
        styles.container.push(tw`gap-6`);
        break;
      case 7:
        styles.container.push(tw`gap-7`);
        break;
      case 8:
        styles.container.push(tw`gap-8`);
        break;
      case 9:
        styles.container.push(tw`gap-9`);
        break;
      case 10:
        styles.container.push(tw`gap-10`);
        break;
      case 11:
        styles.container.push(tw`gap-11`);
        break;
      case 12:
        styles.container.push(tw`gap-12`);
        break;
      default:
        styles.container.push(tw`gap-8`);
        break;
    }
  }

  return mapStyles(styles);
}
