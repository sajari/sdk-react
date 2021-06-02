import { rest } from 'msw';

export const handlers = [
  rest.post('/test.endpoint/sajari.api.pipeline.v1.Query/Search', (req, res, ctx) => {
    return res(
      ctx.json({
        searchResponse: {
          time: '0.000591s',
          totalResults: '0',
          results: [],
        },
      }),
    );
  }),
];
