import combineFilters from '../combineFilters';
import FilterBuilder from '../FilterBuilder';
import RangeFilterBuilder from '../RangeFilterBuilder';

describe('combineFilters', () => {
  const brandFilter = new FilterBuilder({
    name: 'brand',
    options: {
      Apple: "brand = 'Apple'",
      Samsung: "brand = 'Samsung'",
    },
    multi: false,
    count: false,
    initial: ['Apple'],
  });

  const priceFilter = new FilterBuilder({
    name: 'price',
    options: {
      High: 'price >= 200',
      Mid: 'price >= 50',
      Low: 'price < 50',
    },
    count: false,
    multi: false,
    initial: ['High'],
  });

  const priceRangeFilter = new FilterBuilder({
    name: 'priceRange',
    field: 'price_range',
  });

  const categoryFilter = new FilterBuilder({
    name: 'category',
    field: 'level1',
  });

  const popularityRangeFilter = new RangeFilterBuilder({
    name: 'popularity',
    field: 'popularity',
    initial: [100, 600],
    aggregate: true,
    min: 0,
    max: 1000,
  });

  const ratingRangeFilter = new RangeFilterBuilder({
    name: 'rating',
    field: 'rating',
    initial: [1, 5],
    min: 1,
    max: 5,
  });

  const combination = combineFilters([
    brandFilter,
    priceFilter,
    priceRangeFilter,
    categoryFilter,
    popularityRangeFilter,
    ratingRangeFilter,
  ]);

  it('filter', () => {
    expect(combination.filter()).toBe(
      "(brand = 'Apple') AND (price >= 200) AND (popularity >= 100 AND popularity <= 600) AND (rating >= 1 AND rating <= 5)",
    );
  });

  it('buckets', () => {
    expect(combination.buckets()).toBe(
      "brand_Apple:brand = 'Apple',brand_Samsung:brand = 'Samsung',price_High:price >= 200,price_Mid:price >= 50,price_Low:price < 50",
    );
  });

  it('countFilters', () => {
    expect(combination.countFilters()).toBe(',');
  });

  it('count', () => {
    expect(combination.count()).toBe('price_range,level1');
  });

  it('min', () => {
    expect(combination.min()).toBe('popularity');
  });

  it('max', () => {
    expect(combination.min()).toBe('popularity');
  });

  // revalidate after filter options and current state have been updated
  it('revalidate', () => {
    priceRangeFilter.setOptions({ '0 - 10': '0 - 10', '100 - 200': '100 - 200' });
    priceRangeFilter.set(['0 - 10']);
    categoryFilter.setOptions({ PC: 'PC', Applicant: 'Applicant' });
    ratingRangeFilter.set(null);

    expect(combination.filter()).toBe(
      "(brand = 'Apple') AND (price >= 200) AND (popularity >= 100 AND popularity <= 600)",
    );
    expect(combination.buckets()).toBe(
      "brand_Apple:brand = 'Apple',brand_Samsung:brand = 'Samsung',price_High:price >= 200,price_Mid:price >= 50,price_Low:price < 50",
    );
    expect(combination.countFilters()).toBe('0 - 10,');
    expect(combination.count()).toBe('price_range,level1');
  });
});
