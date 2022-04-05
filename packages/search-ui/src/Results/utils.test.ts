import { Banner } from '@sajari/sdk-js';

import { filterBannersPerPage, mergeBannersWithResults } from './utils';

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

test.each<[{ position: number }[], any[], any[]]>([
  [[{ position: 1 }], [1, 2, 3, 4, 5], [{ position: 1 }, 1, 2, 3, 4, 5]],
  [
    [{ position: 1 }, { position: 1 }],
    [1, 2, 3, 4, 5],
    [{ position: 1 }, { position: 1 }, 1, 2, 3, 4, 5],
  ],
  [
    [{ position: 1 }, { position: 2 }],
    [1, 2, 3, 4, 5],
    [{ position: 1 }, { position: 2 }, 1, 2, 3, 4, 5],
  ],
  [
    [{ position: 2 }, { position: 1 }],
    [1, 2, 3, 4, 5],
    [{ position: 1 }, { position: 2 }, 1, 2, 3, 4, 5],
  ],
  [
    [{ position: 2 }, { position: 5 }, { position: 2 }, { position: 1 }],
    [1, 2, 3, 4, 5],
    [{ position: 1 }, { position: 2 }, { position: 2 }, 1, { position: 5 }, 2, 3, 4, 5],
  ],
  [
    [{ position: 1 }, { position: 3 }],
    [1, 2, 3, 4, 5],
    [{ position: 1 }, 1, { position: 3 }, 2, 3, 4, 5],
  ],
  [
    [{ position: 1 }, { position: 1 }, { position: 1 }, { position: 2 }],
    [1, 2, 3, 4, 5],
    [{ position: 1 }, { position: 1 }, { position: 1 }, { position: 2 }, 1, 2, 3, 4, 5],
  ],
  [
    [{ position: 1 }, { position: 1 }, { position: 1 }, { position: 4 }],
    [1, 2, 3, 4, 5],
    [{ position: 1 }, { position: 1 }, { position: 1 }, { position: 4 }, 1, 2, 3, 4, 5],
  ],
  [[{ position: 1 }, { position: 3 }], [], [{ position: 1 }, { position: 3 }]],
  [[{ position: 1 }, { position: 3 }, { position: 10 }], [1], [{ position: 1 }, 1, { position: 3 }, { position: 10 }]],
  [[{ position: 1 }, { position: 1 }, { position: 10 }], [1], [{ position: 1 }, { position: 1 }, 1, { position: 10 }]],
])('mergeBannersWithResults(%o)', (banners, results, expected) => {
  expect(mergeBannersWithResults(banners, results)).toStrictEqual(expected);
});
