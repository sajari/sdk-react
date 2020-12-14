import { ThemeProvider } from '@sajari/react-sdk-utils';
import { render } from '@testing-library/react';
import React from 'react';

import Rating from '..';
import { RatingMaximumExceededError } from '../types';

describe('Rating', () => {
  it('Should render correctly', () => {
    const { getByRole } = render(
      <ThemeProvider>
        <Rating value={3} />
      </ThemeProvider>,
    );
    const rating = getByRole('img');
    expect(rating.getAttribute('aria-label')).toBe('Rating: 3 out of 5 stars');
    // 5 rating items + 1 span for a11y
    expect(rating.childNodes).toHaveLength(6);
    expect(rating.querySelector('span')).toHaveTextContent('3 stars');
  });

  it('Should render the maximum stars correctly', () => {
    const { getByRole } = render(
      <ThemeProvider>
        <Rating max={11} value={7} />
      </ThemeProvider>,
    );
    const rating = getByRole('img');
    expect(rating.getAttribute('aria-label')).toBe('Rating: 7 out of 11 stars');
    expect(rating.childNodes).toHaveLength(12);
    expect(rating.querySelector('span')).toHaveTextContent('7 stars');
  });

  it('Should throw RatingMaximumExceededError', () => {
    expect(() => {
      render(
        <ThemeProvider>
          <Rating value={6} />
        </ThemeProvider>,
      );
    }).toThrowError(RatingMaximumExceededError);
  });

  it('Should render custom character', () => {
    const { getAllByText } = render(
      <ThemeProvider>
        <Rating value={5} character="A" />
      </ThemeProvider>,
    );
    // We double because the rating item is used twice (to account for half case)
    expect(getAllByText('A')).toHaveLength(10);
  });

  it('Should render copywriting', () => {
    const { getByText } = render(
      <ThemeProvider>
        <Rating value={5} character="A">
          A for Amazing
        </Rating>
      </ThemeProvider>,
    );
    expect(getByText('A for Amazing')).toBeInTheDocument();
  });

  it('Should render custom unit in the label', () => {
    const { getByRole } = render(
      <ThemeProvider>
        <Rating value={5} unit="like">
          A for Amazing
        </Rating>
      </ThemeProvider>,
    );
    const rating = getByRole('img');
    expect(rating.getAttribute('aria-label')).toBe('Rating: 5 out of 5 likes');
  });
});
