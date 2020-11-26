import { EVENT_OPTIONS_UPDATED, EVENT_SELECTION_UPDATED } from '../../../events';
import Filter from '../Filter';

describe('Filter', () => {
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

  const countFilter = new Filter({
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
    expect(brandFilter.filter()).toBe("(brand = 'Apple')");
    brandFilter.set(['Samsung']);
    expect(brandFilter.filter()).toBe("(brand = 'Samsung')");

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
});
