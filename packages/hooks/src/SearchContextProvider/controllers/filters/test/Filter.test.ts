import { EVENT_OPTIONS_UPDATED, EVENT_SELECTION_UPDATED } from '../../../events';
import Filter from '../Filter';

describe('Filter', () => {
  const filter = new Filter({
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
    expect(filter.getName()).toBe('brand');
    expect(countFilter.getName()).toBe('priceRange');
  });

  it('getCount', () => {
    expect(filter.getCount()).not.toBeTruthy();
    expect(countFilter.getCount()).toBeTruthy();
  });

  it('isMulti', () => {
    expect(filter.isMulti()).not.toBeTruthy();
    expect(countFilter.isMulti()).toBeTruthy();
  });

  it('filter and set', () => {
    filter.set(['']);
    expect(filter.filter()).toBe('');
    filter.set(['Apple']);
    expect(filter.filter()).toBe("(brand = 'Apple')");
    filter.set(['Samsung']);
    expect(filter.filter()).toBe("(brand = 'Samsung')");

    countFilter.setOptions({ High: 'price >= 200', Mid: 'price >= 50' });
    countFilter.set(['High', 'Mid']);
    expect(countFilter.filter()).toBe('(price >= 200) OR (price >= 50)');
  });

  it('getBuckets', () => {
    expect(filter.getBuckets()).toBe("brand_Apple:brand = 'Apple',brand_Samsung:brand = 'Samsung'");
  });

  it('reset', () => {
    filter.set(['Samsung']);
    expect(filter.get()).toEqual(['Samsung']);
    filter.reset();
    expect(filter.get()).toEqual(['Apple']);
  });

  it('setOptions should correctly trigger EVENT_OPTIONS_UPDATED', () => {
    const spyOptionUpdateCallback = jest.fn();
    filter.listen(EVENT_OPTIONS_UPDATED, spyOptionUpdateCallback);
    filter.setOptions({});
    filter.setOptions({});

    expect(spyOptionUpdateCallback).toHaveBeenCalledTimes(2);
  });

  it('set, remove, reset should trigger EVENT_SELECTION_UPDATED', () => {
    const spyOptionUpdateCallback = jest.fn();
    filter.listen(EVENT_SELECTION_UPDATED, spyOptionUpdateCallback);
    filter.set(['Samsung']);
    expect(spyOptionUpdateCallback).toHaveBeenCalledTimes(1);
    filter.remove(['Samsung']);
    expect(spyOptionUpdateCallback).toHaveBeenCalledTimes(2);
    filter.reset();
    expect(spyOptionUpdateCallback).toHaveBeenCalledTimes(3);
  });
});
