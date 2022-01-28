import { Banner } from '@sajari/sdk-js';

import { filterBannersPerPage } from './filterBannersPerPage';

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

test.each<[Banner[], number, number, Banner[]]>([
  [
    testData,
    10,
    1,
    [
      {
        id: '0',
        width: 2,
        height: 1,
        imageUrl: 'ipsum.png',
        position: 1,
        targetUrl: 'https://example.com',
      },
    ],
  ],
  [
    testData,
    20,
    1,
    [
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
    ],
  ],
  [
    testData,
    15,
    2,
    [
      {
        id: '2',
        width: 2,
        height: 1,
        imageUrl: 'ipsum.png',
        position: 5,
        targetUrl: 'https://example.com',
      },
    ],
  ],
  [
    testData,
    20,
    3,
    [
      {
        id: '3',
        width: 2,
        height: 1,
        imageUrl: 'ipsum.png',
        position: 10,
        targetUrl: 'https://example.com',
      },
    ],
  ],
  [testData, 10, 10, []],
])('filterBannersPerPage(%o)', (banners, resultsPerPage, page, expected) => {
  expect(filterBannersPerPage(banners, resultsPerPage, page)).toEqual(expected);
});
