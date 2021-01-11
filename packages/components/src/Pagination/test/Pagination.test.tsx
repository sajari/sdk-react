import * as React from 'react';

import { render } from '../../test/utils';
import Pagination from '..';

describe('Pagination', () => {
  it('Should change page with the onChange handler', () => {
    const setPage = jest.fn();
    const { getByText } = render(
      <Pagination compact={false} totalResults={1000} resultsPerPage={20} page={1} onChange={setPage} />,
    );
    const pageTwo = getByText('2');
    pageTwo.click();
    expect(setPage).toHaveBeenCalledWith(2);
  });

  it('Should compute the last page correctly', () => {
    const setPage = jest.fn();
    const totalResults = 999;
    const resultsPerPage = 20;
    const totalPages = Math.ceil(totalResults / resultsPerPage);
    const { getByText, queryByText } = render(
      <Pagination totalResults={totalResults} resultsPerPage={resultsPerPage} page={1} onChange={setPage} />,
    );
    expect(getByText(totalPages)).toBeInTheDocument();
    expect(queryByText(totalPages + 1)).toBeNull();
  });

  it('Should show nothing if totalResults is not passed', () => {
    const { container } = render(<Pagination compact={false} resultsPerPage={5} page={1} onChange={jest.fn()} />);
    expect(container.children).toHaveLength(0);
  });

  it('Should show nothing if resultsPerPage is not passed', () => {
    const { container } = render(<Pagination compact={false} totalResults={100} page={1} onChange={jest.fn()} />);
    expect(container.children).toHaveLength(0);
  });

  it('Should process i18n correctly', () => {
    const i18n = {
      label: 'Phân trang',
      previous: 'Trang trước',
      next: 'Trang sau',
      page: ({ page }) => `Trang ${page}`,
      current: ({ page }) => `Trang ${page}, trang hiện tại`,
    };
    const { getByLabelText } = render(
      <Pagination compact={false} totalResults={10} resultsPerPage={5} page={1} i18n={i18n} onChange={jest.fn()} />,
    );
    expect(getByLabelText('Phân trang')).toBeInTheDocument();
    expect(getByLabelText('Trang trước')).toBeInTheDocument();
    expect(getByLabelText('Trang sau')).toBeInTheDocument();
    expect(getByLabelText('Trang 1, trang hiện tại')).toBeInTheDocument();
    expect(getByLabelText('Trang 2')).toBeInTheDocument();
  });
});
