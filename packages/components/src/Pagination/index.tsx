import { clamp, getStylesObject, isSSR, isString } from '@sajari/react-sdk-utils';
import classnames from 'classnames';
import * as React from 'react';
import smoothscroll from 'smoothscroll-polyfill';

import { IconChevronLeft, IconChevronRight } from '../assets/icons';
import Box from '../Box';
import Button from '../Button';
import ButtonGroup from '../ButtonGroup';
import { useFirstRender, useResizeObserver } from '../hooks';
import usePaginationStyles from './styles';
import { PaginationProps } from './types';

const defaultI18n = {
  label: 'Pagination',
  previous: 'Previous',
  next: 'Next',
  page: 'Page {{page}}',
  current: 'Page {{page}}, current page',
};

const Pagination = React.memo((props: PaginationProps) => {
  const {
    language,
    totalResults,
    resultsPerPage,
    page,
    pageCount,
    onChange,
    i18n: i18nProp,
    buttonClassName,
    activeClassName = '',
    nextClassName,
    prevClassName,
    spacerEllipsisClassName,
    statusClassName,
    styles: stylesProp,
    disableDefaultStyles = false,
    scrollTarget,
    scrollToTop = false,
    ...rest
  } = props;
  const firstRender = useFirstRender();
  const styles = getStylesObject(usePaginationStyles(props), disableDefaultStyles);
  const { ref, width } = useResizeObserver<HTMLDivElement>();
  const i18n = { ...defaultI18n, ...i18nProp };

  // Polyfill
  React.useEffect(() => {
    if (!isSSR()) {
      smoothscroll.polyfill();
    }
  }, []);

  // Handle scroll on paginate
  React.useEffect(() => {
    if (firstRender || isSSR()) {
      return;
    }

    const scrollOptions: ScrollToOptions = { behavior: 'smooth' };
    let target: Element | null = null;

    if (isString(scrollTarget)) {
      target = document.querySelector(scrollTarget);
    } else if (scrollTarget) {
      target = scrollTarget;
    }

    // Scroll an element (or document.body) into view
    if (scrollToTop) {
      (target ?? document.body).scrollIntoView(scrollOptions);
    }

    // Scroll within the element if specified
    if (target) {
      target.scrollTo({ ...scrollOptions, top: 0 });
    }
  }, [page]);

  // Calculate the page count
  const count = React.useMemo(() => {
    if (!totalResults || !resultsPerPage) {
      return undefined;
    }

    if (!pageCount) {
      return Math.ceil(totalResults / resultsPerPage);
    }

    return pageCount;
  }, [pageCount, totalResults, resultsPerPage]);

  const changeHandler = React.useCallback(
    (exitEarly: boolean, target: number) => () => {
      if (target === page || exitEarly) {
        return;
      }

      onChange(clamp(target, 1, count));
    },
    [onChange, page, count],
  );

  const renderButtons = () => {
    const limit = 5;
    const middle = Math.ceil(limit / 2);
    let offset = 0;

    if (!count) {
      return null;
    }

    if (count > limit) {
      if (page < limit) {
        offset = 0;
      } else {
        const max = count - limit;
        offset = clamp(page > max ? max : page - middle, 0, max);
      }
    }

    const items: Array<number | null> = Array.from(Array(clamp(count, 0, limit))).map(
      (_, index) => Number(index) + offset,
    );

    if (count > limit) {
      // Add the 1 ...
      if (offset > 1) {
        items.unshift(0, null);
      }

      // Add the ... last
      const lastIndex = count - 1;

      if (!items.includes(lastIndex) && count > limit + 2) {
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
            css={styles.spacerEllipsis}
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
          onClick={changeHandler(false, number)}
          className={classnames(buttonClassName, { [activeClassName]: active })}
        >
          {number.toLocaleString(language)}
        </Button>
      );
    });
  };

  if (!count || count <= 1) {
    return null;
  }

  const compact = width && width < 480;
  const hasPrevious = page > 1;
  const hasNext = page < count;

  return (
    <ButtonGroup as="nav" ref={ref} aria-label={i18n.label} attached css={[styles.container, stylesProp]} {...rest}>
      <Button
        spacing="compact"
        disabled={!hasPrevious}
        onClick={changeHandler(!hasPrevious, page - 1)}
        aria-label={i18n.previous}
        className={classnames(prevClassName, buttonClassName)}
        rel="prev"
        key="prev"
      >
        &#8203;
        <IconChevronLeft />
      </Button>

      {compact ? (
        <Box as="span" css={styles.compactStatus} className={statusClassName} key="status">
          {page.toLocaleString(language)}
          <Box as="span" css={styles.compactStatusCount}>{` / ${count.toLocaleString(language)}`}</Box>
        </Box>
      ) : (
        renderButtons()
      )}

      <Button
        spacing="compact"
        disabled={!hasNext}
        onClick={changeHandler(!hasNext, page + 1)}
        aria-label={i18n.next}
        className={classnames(nextClassName, buttonClassName)}
        rel="next"
        key="next"
      >
        &#8203;
        <IconChevronRight />
      </Button>
    </ButtonGroup>
  );
});

export default Pagination;
export type { PaginationProps };
