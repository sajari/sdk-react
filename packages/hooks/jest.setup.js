import 'whatwg-fetch';

import { server } from './src/test';

beforeAll(() => {
  server.listen({
    onUnhandledRequest: 'warn',
  });
});

afterEach(() => server.resetHandlers());

afterAll(() => server.close());
