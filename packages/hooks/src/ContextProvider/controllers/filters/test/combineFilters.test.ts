import combineFilters from '../combineFilters';
import FilterBuilder from '../FilterBuilder';
import RangeFilterBuilder from '../RangeFilterBuilder';

describe('combineFilters', () => {
  const brandFilter = new FilterBuilder({
    name: 'brand',
    options: {
      Apple: 'brand = "Apple"',
      Samsung: 'brand = "Samsung"',
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
    min: 0,
    max: 1000,
  });

  const ratingRangeFilter = new RangeFilterBuilder({
    name: 'rating',
    field: 'rating',
    min: 1,
    max: 5,
    aggregate: false,
  });

  const colorFilter = new FilterBuilder({
    name: 'color',
    field: 'color',
    group: 'group-1',
    initial: ['red'],
  });

  const sizeFilter = new FilterBuilder({
    name: 'size',
    field: 'size',
    group: 'group-1',
    initial: ['small'],
  });

  const combination = combineFilters([
    brandFilter,
    priceFilter,
    priceRangeFilter,
    categoryFilter,
    popularityRangeFilter,
    ratingRangeFilter,
    colorFilter,
    sizeFilter,
  ]);

  it('empty filter', () => {
    const emptyFilter = new FilterBuilder({
      name: 'size',
      field: 'size',
      group: 'group-1',
      initial: [],
    });
    const emptyFilterOfDifferentGroup = new FilterBuilder({
      name: 'abc',
      field: 'abc',
      group: 'group-empty',
      initial: [],
    });
    const priceRangeFilterCloned = new FilterBuilder({
      name: 'priceRange',
      field: 'price_range',
    });
    priceRangeFilterCloned.setOptions({ '0 - 10': '0 - 10', '100 - 200': '100 - 200' });
    priceRangeFilterCloned.set(['0 - 10']);
    const combinedEmptyFilter = combineFilters([
      emptyFilter,
      colorFilter,
      priceRangeFilterCloned,
      emptyFilterOfDifferentGroup,
    ]);
    expect(combinedEmptyFilter.countFilters()).toBe('ARRAY_MATCH(color = "red"),ARRAY_MATCH(color = "red"),0 - 10,');
  });

  it('filter', () => {
    expect(combination.filter()).toBe(
      'ARRAY_MATCH((color = "red") AND (size = "small")) AND (brand = "Apple") AND (price >= 200) AND (popularity >= 100 AND popularity <= 600) AND (rating >= 1 AND rating <= 5)',
    );
  });

  it('buckets', () => {
    expect(combination.buckets()).toBe(
      'brand_Apple:brand = "Apple",brand_Samsung:brand = "Samsung",price_High:price >= 200,price_Mid:price >= 50,price_Low:price < 50',
    );
  });

  it('countFilters', () => {
    expect(combination.countFilters()).toBe(
      ',,ARRAY_MATCH((color = "red") AND (size = "small")),ARRAY_MATCH((color = "red") AND (size = "small"))',
    );
  });

  it('count', () => {
    expect(combination.count()).toBe('price_range,level1,color,size');
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
    colorFilter.set(['blue']);
    sizeFilter.set(['large']);

    expect(combination.filter()).toBe(
      'ARRAY_MATCH((color = "blue") AND (size = "large")) AND (brand = "Apple") AND (price >= 200) AND (popularity >= 100 AND popularity <= 600)',
    );
    expect(combination.buckets()).toBe(
      'brand_Apple:brand = "Apple",brand_Samsung:brand = "Samsung",price_High:price >= 200,price_Mid:price >= 50,price_Low:price < 50',
    );
    expect(combination.countFilters()).toBe(
      '0 - 10,,ARRAY_MATCH((color = "blue") AND (size = "large")),ARRAY_MATCH((color = "blue") AND (size = "large"))',
    );
    expect(combination.count()).toBe('price_range,level1,color,size');
  });
});
