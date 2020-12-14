/** @jsx jsx */
import { jsx } from '@emotion/core';
import { clamp, getStylesObject, isSSR, isString } from '@sajari/react-sdk-utils';
import classnames from 'classnames';
import React, { useCallback, useEffect } from 'react';
import smoothscroll from 'smoothscroll-polyfill';
import tw from 'twin.macro';

import { IconChevronLeft, IconChevronRight } from '../assets/icons';
import Box from '../Box';
import Button from '../Button';
import ButtonGroup from '../ButtonGroup';
import { useFirstRender } from '../hooks';
import usePaginationStyles from './styles';
import { PaginationProps } from './types';

const defaultI18n = {
  label: 'Pagination',
  previous: 'Previous',
  next: 'Next',
  page: 'Page {{page}}',
  current: 'Page {{page}}, current page',
};

const getButtons = (
  page: number,
  pageCount: number,
  onChange: (exitEarly: boolean, page: number) => void,
  i18n: typeof defaultI18n,
  props: PaginationProps,
) => {
  const limit = 5;
  const middle = Math.ceil(limit / 2);
  let offset = 0;
  const { activeClassName = '', spacerEllipsisClassName, buttonClassName, disableDefaultStyles } = props;

  if (pageCount > limit) {
    if (page < limit) {
      offset = 0;
    } else {
      const max = pageCount - limit;
      offset = clamp(page > max ? max : page - middle, 0, max);
    }
  }

  const items: Array<number | null> = Array.from(Array(clamp(pageCount, 0, limit))).map(
    (_, index) => Number(index) + offset,
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

  const getARIALabel = (number: number, active: boolean) => {
    const template = active ? i18n.current : i18n.page;
    return template.replace('{{page}}', number.toString());
  };

  return items.map((item, index) => {
    if (item === null) {
      return (
        <Box
          as="span"
          key={`spacer-ellipsis-${index}`} // eslint-disable-line
          css={
            disableDefaultStyles
              ? undefined
              : tw`px-2 py-2 border border-gray-200 border-solid rounded-none select-none focus:z-10 bg-gray-50`
          }
          className={spacerEllipsisClassName}
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
        aria-label={getARIALabel(number, active)}
        onClick={onChange(false, number)}
        className={classnames(buttonClassName, { [activeClassName]: active })}
      >
        {number.toLocaleString()}
      </Button>
    );
  });
};

const Pagination = React.memo((props: PaginationProps) => {
  const {
    totalResults,
    resultsPerPage,
    page,
    pageCount,
    onChange,
    i18n: i18nProp,
    buttonClassName,
    activeClassName,
    nextClassName,
    prevClassName,
    spacerEllipsisClassName,
    styles: stylesProp,
    disableDefaultStyles = false,
    scrollTarget = isSSR() ? '' : document.body,
    scrollToTop = false,
    ...rest
  } = props;
  const firstRender = useFirstRender();
  const styles = getStylesObject(usePaginationStyles(props), disableDefaultStyles);

  if (!isSSR()) {
    smoothscroll.polyfill();
  }

  useEffect(() => {
    if (firstRender || !scrollToTop || isSSR()) {
      return;
    }

    let target = scrollTarget as Element | null;

    if (isString(scrollTarget)) {
      target = document.querySelector(scrollTarget);
    }

    target?.scrollIntoView({ behavior: 'smooth' });
  }, [page]);

  const i18n = { ...defaultI18n, ...i18nProp };
  let count = pageCount;

  const changeHandler = useCallback(
    (exitEarly: boolean, target: number) => () => {
      if (target === page || exitEarly) {
        return;
      }

      onChange(clamp(target, 1, count));
    },
    [onChange, page, count],
  );

  if (!totalResults || !resultsPerPage) {
    return null;
  }

  if (!count) {
    count = Math.ceil(totalResults / resultsPerPage);
  }

  if (!count || count <= 1) {
    return null;
  }

  const hasPrevious = page > 1;
  const hasNext = page < count;

  return (
    <ButtonGroup as="nav" aria-label={i18n.label} attached css={[styles.container, stylesProp]} {...rest}>
      <Button
        spacing="compact"
        disabled={!hasPrevious}
        onClick={changeHandler(!hasPrevious, page - 1)}
        aria-label={i18n.previous}
        className={classnames(prevClassName, buttonClassName)}
      >
        &#8203;
        <IconChevronLeft />
      </Button>

      {getButtons(page, count, changeHandler, i18n, props)}

      <Button
        spacing="compact"
        disabled={!hasNext}
        onClick={changeHandler(!hasNext, page + 1)}
        aria-label={i18n.next}
        className={classnames(nextClassName, buttonClassName)}
      >
        &#8203;
        <IconChevronRight />
      </Button>
    </ButtonGroup>
  );
});

export default Pagination;
export type { PaginationProps };
