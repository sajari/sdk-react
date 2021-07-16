import { EVENT_OPTIONS_UPDATED, EVENT_SELECTION_UPDATED } from '../../../events';
import FilterBuilder from '../FilterBuilder';

describe('FilterBuilder', () => {
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

  const countFilter = new FilterBuilder({
    name: 'priceRange',
    field: 'price_range',
  });

  it('getName', () => {
    expect(brandFilter.getName()).toBe('brand');
    expect(countFilter.getName()).toBe('priceRange');
  });

  it('getCount', () => {
    expect(brandFilter.getCount()).not.toBeTruthy();
    expect(countFilter.getCount()).toBeTruthy();
  });

  it('isMulti', () => {
    expect(brandFilter.isMulti()).not.toBeTruthy();
    expect(countFilter.isMulti()).toBeTruthy();
  });

  it('filter and set', () => {
    brandFilter.set(['']);
    expect(brandFilter.filter()).toBe('');
    brandFilter.set(['Apple']);
    expect(brandFilter.filter()).toBe("brand = 'Apple'");
    brandFilter.set(['Samsung']);
    expect(brandFilter.filter()).toBe("brand = 'Samsung'");

    countFilter.setOptions({ High: 'price >= 200', Mid: 'price >= 50' });
    countFilter.set(['High', 'Mid']);
    expect(countFilter.filter()).toBe('(price >= 200) OR (price >= 50)');
  });

  it('getBuckets', () => {
    expect(brandFilter.getBuckets()).toBe("brand_Apple:brand = 'Apple',brand_Samsung:brand = 'Samsung'");
  });

  it('reset', () => {
    brandFilter.set(['Samsung']);
    expect(brandFilter.get()).toEqual(['Samsung']);
    brandFilter.reset();
    expect(brandFilter.get()).toEqual(['Apple']);
  });

  it('setOptions should correctly trigger EVENT_OPTIONS_UPDATED', () => {
    const spyOptionUpdateCallback = jest.fn();
    brandFilter.listen(EVENT_OPTIONS_UPDATED, spyOptionUpdateCallback);
    brandFilter.setOptions({});
    brandFilter.setOptions({});

    expect(spyOptionUpdateCallback).toHaveBeenCalledTimes(2);
  });

  it('set, remove, reset should trigger EVENT_SELECTION_UPDATED', () => {
    const spyOptionUpdateCallback = jest.fn();
    brandFilter.listen(EVENT_SELECTION_UPDATED, spyOptionUpdateCallback);
    brandFilter.set(['Samsung']);
    expect(spyOptionUpdateCallback).toHaveBeenCalledTimes(1);
    brandFilter.remove(['Samsung']);
    expect(spyOptionUpdateCallback).toHaveBeenCalledTimes(2);
    brandFilter.reset();
    expect(spyOptionUpdateCallback).toHaveBeenCalledTimes(3);
  });

  // Test default value render for count filter
  it('filter outputs correctly for a non array field', () => {
    const filter = new FilterBuilder({
      name: 'category',
      field: 'category',
      options: {},
      initial: ['apple', 'samsung'],
      array: false,
    });
    expect(filter.filter()).toBe('(category = "apple") OR (category = "samsung")');
  });

  it('filter outputs correctly if an array field', () => {
    const filter = new FilterBuilder({
      name: 'category',
      field: 'category',
      options: {},
      initial: ['apple', 'samsung'],
      array: true,
    });
    expect(filter.filter()).toBe('(category ~ ["apple"]) OR (category ~ ["samsung"])');
  });

  it('if count is not set, ignore any selected values which are not in the options', () => {
    const filter = new FilterBuilder({
      name: 'category',
      field: 'category',
      options: { dell: 'category = "dell"' },
      count: false,
      initial: ['apple', 'dell', 'samsung'],
    });
    expect(filter.filter()).toBe('category = "dell"');
  });

  it('hasChanged', () => {
    const filter = new FilterBuilder({
      name: 'category',
      field: 'category',
      options: { dell: 'category = "dell"' },
      count: false,
      initial: [],
    });
    expect(filter.hasChanged()).toBeFalsy();
    filter.set(['dell']);
    expect(filter.hasChanged()).toBeTruthy();
  });
});
