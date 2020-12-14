import { EVENT_RANGE_UPDATED } from '../../../events';
import RangeFilterBuilder from '../RangeFilterBuilder';

describe('RangeFilterBuilder', () => {
  const priceFilter = new RangeFilterBuilder({
    initial: [20, 100],
    name: 'price',
    field: 'price',
    min: 0,
    max: 500,
  });

  const ratingFilter = new RangeFilterBuilder({
    initial: [1, 3],
    name: 'rating',
    field: 'rating',
    aggregate: true,
    min: 1,
    max: 5,
  });

  it('getName', () => {
    expect(priceFilter.getName()).toBe('price');
    expect(ratingFilter.getName()).toBe('rating');
  });

  it('isAggregrate', () => {
    expect(priceFilter.isAggregate()).not.toBeTruthy();
    expect(ratingFilter.isAggregate()).toBeTruthy();
  });

  it('setMin, setMax, getMinMax', () => {
    expect(priceFilter.getMinMax()).toEqual([0, 500]);
    priceFilter.setMin(100);
    priceFilter.setMax(200);
    expect(priceFilter.getMinMax()).toEqual([100, 200]);
    priceFilter.setMin(0);
    priceFilter.setMax(300);
    expect(priceFilter.getMinMax()).toEqual([0, 300]);
    priceFilter.setMax(500);
    expect(priceFilter.getMinMax()).toEqual([0, 500]);
  });

  it('filter and set', () => {
    priceFilter.set(null);
    expect(priceFilter.filter()).toBe('');
    priceFilter.set([0, 100]);
    expect(priceFilter.filter()).toBe('price >= 0 AND price <= 100');
    priceFilter.set([50, 200]);
    expect(priceFilter.filter()).toBe('price >= 50 AND price <= 200');

    ratingFilter.set([2, 5]);
    expect(ratingFilter.filter()).toBe('rating >= 2 AND rating <= 5');
  });

  it('reset', () => {
    priceFilter.set([5, 10]);
    expect(priceFilter.get()).toEqual([5, 10]);
    priceFilter.reset();
    expect(priceFilter.get()).toEqual([20, 100]);

    ratingFilter.set([4, 5]);
    expect(ratingFilter.get()).toEqual([4, 5]);
    ratingFilter.reset();
    expect(ratingFilter.get()).toEqual([1, 3]);
  });

  it('isChange', () => {
    priceFilter.set([5, 10]);
    expect(priceFilter.hasChanged()).toBeTruthy();
    priceFilter.reset();
    expect(priceFilter.hasChanged()).not.toBeTruthy();
  });

  it('set, reset should trigger EVENT_RANGE_UPDATED', () => {
    const spyOptionUpdateCallback = jest.fn();
    ratingFilter.listen(EVENT_RANGE_UPDATED, spyOptionUpdateCallback);
    ratingFilter.set([0, 5]);
    expect(spyOptionUpdateCallback).toHaveBeenCalledTimes(1);
    ratingFilter.set([0, 4]);
    expect(spyOptionUpdateCallback).toHaveBeenCalledTimes(2);
    ratingFilter.reset();
    expect(spyOptionUpdateCallback).toHaveBeenCalledTimes(3);
  });
});
