import { rest } from 'msw';

export const handlers = [
  rest.post('/test.endpoint/sajari.api.pipeline.v1.Query/Search', (req, res, ctx) => {
    return res(
      ctx.json({
        queryId: 'a6fa3e45-d1ad-43df-87d9-d333c734e7f5',
        searchResponse: {
          time: '0.000591s',
          totalResults: '0',
          results: [],
        },
      }),
    );
  }),
];
