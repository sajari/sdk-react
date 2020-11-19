import combineFilters from '../combineFilters';
import Filter from '../Filter';

describe('combineFilters', () => {
  const brandFilter = new Filter({
    name: 'brand',
    options: {
      Apple: "brand = 'Apple'",
      Samsung: "brand = 'Samsung'",
    },
    multi: false,
    count: false,
    initial: ['Apple'],
  });

  const priceFilter = new Filter({
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

  const priceRangeFilter = new Filter({
    name: 'priceRange',
    field: 'price_range',
  });

  const categoryFilter = new Filter({
    name: 'category',
    field: 'product_cat',
  });

  const combination = combineFilters([brandFilter, priceFilter, priceRangeFilter, categoryFilter]);

  it('filter', () => {
    expect(combination.filter()).toBe("(brand = 'Apple') AND (price >= 200)");
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
    expect(combination.count()).toBe('price_range,product_cat');
  });

  // revalidate after filter options and current state have been updated
  it('revalidate', () => {
    priceRangeFilter.setOptions({ '0 - 10': '0 - 10', '100 - 200': '100 - 200' });
    priceRangeFilter.set(['0 - 10']);
    categoryFilter.setOptions({ PC: 'PC', Applicant: 'Applicant' });

    expect(combination.filter()).toBe("(brand = 'Apple') AND (price >= 200)");
    expect(combination.buckets()).toBe(
      "brand_Apple:brand = 'Apple',brand_Samsung:brand = 'Samsung',price_High:price >= 200,price_Mid:price >= 50,price_Low:price < 50",
    );
    expect(combination.countFilters()).toBe('(0 - 10),');
    expect(combination.count()).toBe('price_range,product_cat');
  });
});
