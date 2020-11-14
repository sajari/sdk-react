/** @jsx jsx */
import { jsx } from '@emotion/core';
import tw from 'twin.macro';

import { IconChevronLeft, IconChevronRight } from '../assets/icons';
import Box from '../Box';
import Button from '../Button';
import ButtonGroup from '../ButtonGroup';
import { clamp } from '../utils/number';
import { PaginationProps } from './types';

const getButtons = (page: number, pageCount: number, onChange: (page: number) => void) => {
  const limit = 5;
  const middle = Math.ceil(limit / 2);
  let offset = 0;

  if (pageCount > limit) {
    if (page < limit) {
      offset = 0;
    } else {
      const max = pageCount - limit;
      offset = clamp(page > max ? max : page - middle, 0, max);
    }
  }

  const items: Array<number | null> = Array.from(Array(clamp(pageCount, 0, limit))).map(
    (value, index) => Number(index) + offset,
  );

  if (pageCount > limit) {
    // Add the 1 ...
    if (offset > 1) {
      items.unshift(0, null);
    }

    // Add the ... last
    const lastIndex = pageCount - 1;

    if (!items.includes(lastIndex) && pageCount > limit + 2) {
      items.push(null, lastIndex);
    }
  }

  return items.map((item, index) => {
    if (item === null) {
      return (
        <Box
          as="span"
          key={`spacer-ellipsis-${index}`} // eslint-disable-line
          css={tw`px-2 py-2 border border-gray-200 border-solid rounded-none select-none focus:z-10 bg-gray-50`}
        >
          &hellip;
        </Box>
      );
    }

    const number = item + 1;
    const active = number === page;

    return (
      <Button
        key={item}
        appearance={active ? 'primary' : undefined}
        aria-current={active ? 'page' : undefined}
        aria-label={`Page ${number}${active ? ', current page' : ''}`}
        onClick={() => onChange && onChange(number)}
      >
        {number}
      </Button>
    );
  });
};

const Pagination = (props: PaginationProps) => {
  const { totalResults, pageSize, page, onChange } = props;
  let { pageCount } = props;

  if (!totalResults || !pageSize) {
    return null;
  }

  if (!pageCount) {
    pageCount = Math.ceil(totalResults / pageSize);
  }

  if (!pageCount || pageCount <= 1) {
    return null;
  }

  const hasPrevious = page > 1;
  const hasNext = page < pageCount;

  const changeHandler = (target: number) => {
    if (target === page) {
      return;
    }

    onChange(clamp(target, 1, pageCount));
  };

  return (
    <ButtonGroup as="nav" aria-label="Pagination" attached>
      <Button
        spacing="compact"
        disabled={!hasPrevious}
        onClick={() => (hasPrevious ? changeHandler(page - 1) : {})}
        label="Previous"
      >
        &#8203;
        <IconChevronLeft />
      </Button>

      {getButtons(page, pageCount, changeHandler)}

      <Button
        spacing="compact"
        disabled={!hasNext}
        onClick={() => (hasNext ? changeHandler(page + 1) : {})}
        label="Next"
      >
        &#8203;
        <IconChevronRight />
      </Button>
    </ButtonGroup>
  );
};

export default Pagination;
export type { PaginationProps };
