import { Banner } from '@sajari/sdk-js';

import { getBannersByPosition } from './getBannersByPosition';
import { BannerByPosition } from './types';

const testData = [
  {
    id: '0',
    width: 2,
    height: 1,
    imageUrl: 'ipsum.png',
    position: 1,
    targetUrl: 'https://example.com',
  },
  {
    id: '1',
    width: 2,
    height: 2,
    imageUrl: 'ipsum.png',
    position: 11,
    targetUrl: 'https://example.com',
  },
  {
    id: '2',
    width: 2,
    height: 1,
    imageUrl: 'ipsum.png',
    position: 20,
    targetUrl: 'https://example.com',
  },
  {
    id: '3',
    width: 2,
    height: 1,
    imageUrl: 'ipsum.png',
    position: 50,
    targetUrl: 'https://example.com',
  },
];

test.each<[Banner[], number, number, BannerByPosition]>([
  [
    testData,
    10,
    1,
    {
      0: {
        id: '0',
        width: 2,
        height: 1,
        imageUrl: 'ipsum.png',
        position: 1,
        targetUrl: 'https://example.com',
      },
    },
  ],
  [
    testData,
    20,
    1,
    {
      0: {
        id: '0',
        width: 2,
        height: 1,
        imageUrl: 'ipsum.png',
        position: 1,
        targetUrl: 'https://example.com',
      },
      10: {
        id: '1',
        width: 2,
        height: 2,
        imageUrl: 'ipsum.png',
        position: 11,
        targetUrl: 'https://example.com',
      },
      19: {
        id: '2',
        width: 2,
        height: 1,
        imageUrl: 'ipsum.png',
        position: 20,
        targetUrl: 'https://example.com',
      },
    },
  ],
  [
    testData,
    15,
    2,
    {
      4: {
        id: '2',
        width: 2,
        height: 1,
        imageUrl: 'ipsum.png',
        position: 20,
        targetUrl: 'https://example.com',
      },
    },
  ],
  [
    testData,
    20,
    3,
    {
      9: {
        id: '3',
        width: 2,
        height: 1,
        imageUrl: 'ipsum.png',
        position: 50,
        targetUrl: 'https://example.com',
      },
    },
  ],
  [testData, 10, 10, {}],
])('getBannersByPosition(%o)', (banners, resultsPerPage, page, expected) => {
  expect(getBannersByPosition(banners, resultsPerPage, page)).toEqual(expected);
});
