import 'whatwg-fetch';

import { Pipeline, Variables } from '@sajari/react-hooks';
import { render, screen } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import React from 'react';

import ContextProvider, { ContextProviderValues } from '../ContextProvider';
import Results from '.';

const iPhoneResult = {
  values: {
    _id: {
      single: 'b6d486b2-3824-9609-e911-02ae6cd98181',
    },
    description: {
      single:
        'Stay connected and entertained wherever you go with this refurbished iPhone SE for Sprint. This gray smartphone comes with a FaceTime-enabled HD camera for video conferencing or capturing still shots of your favorite memories. With 64GB of memory, this refurbished iPhone SE has no problem holding hundreds of pictures, videos and music files.',
    },
    image: {
      single: 'https://cdn.sajari.net/demos/bestbuy/images/5251500_sb.jpg',
    },
    name: {
      single: 'Apple - Geek Squad Certified Refurbished iPhone SE with 64GB Memory Cell Phone - Space gray (Sprint)',
    },
    url: {
      single:
        'https://www.bestbuy.com/site//5251500.p?cmp=SAJARI\u0026skuId=5251500\u0026utm_medium=search\u0026utm_campaign=sajari',
    },
  },
  score: 0.9224614634146342,
  indexScore: 1,
  featureScore: 0.6123073170731707,
};

const banner = {
  id: '0',
  position: 1,
  width: 3,
  height: 2,
  imageUrl: 'banner-url',
  targetUrl: 'https://google.com',
  textPosition: 'TEXT_POSITION_TOP_LEFT',
};

const server = setupServer(
  rest.post('http://jsonapi.sajari.net/sajari.api.pipeline.v1.Query/Search', (req, res, ctx) => {
    return res(
      ctx.json({
        queryId: 'a6fa3e45-d1ad-43df-87d9-d333c734e7f6',
        values: {
          q: 'iphone',
        },
        banners: [banner],
        searchResponse: {
          reads: '141',
          totalResults: '4',
          time: '0.000641s',
          results: new Array(4).fill(iPhoneResult),
          featureScoreWeight: 0.2,
        },
      }),
    );
  }),
);
const eventTrackingPipeline = new Pipeline({ account: '1234', collection: 'test' }, 'query');
const customRender = (ui: React.ReactElement, props: ContextProviderValues) => {
  return render(<ContextProvider {...props}>{ui}</ContextProvider>);
};

describe('BannerItem', () => {
  beforeAll(() => {
    server.listen({ onUnhandledRequest: 'warn' });
  });
  afterEach(() => {
    jest.clearAllMocks();
    server.resetHandlers();
  });
  afterAll(() => {
    jest.restoreAllMocks();
    server.close();
  });

  it('apply the right style to banner when `numberOfCols` changes', async () => {
    const renderResult = customRender(<Results />, {
      search: { pipeline: eventTrackingPipeline },
      viewType: 'grid',
      searchOnLoad: true,
    });

    const bannerImageContainer = await renderResult.findByTestId('banner-image-container');

    global.innerWidth = 768;
    global.dispatchEvent(new Event('resize'));

    expect(bannerImageContainer).not.toHaveStyleRule('position');

    global.innerWidth = 1440;
    global.dispatchEvent(new Event('resize'));

    expect(bannerImageContainer).toHaveStyleRule('position', 'absolute');
  });
});
