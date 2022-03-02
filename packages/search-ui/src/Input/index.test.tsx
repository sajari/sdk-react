import 'whatwg-fetch';

import { EventTracking, Pipeline } from '@sajari/react-hooks';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import React from 'react';

import ContextProvider, { ContextProviderValues } from '../ContextProvider';
import Input from '.';

const user = userEvent.setup();
const server = setupServer(
  rest.post('http://jsonapi.sajari.net/sajari.api.pipeline.v1.Query/Search', (req, res, ctx) => {
    return res(
      ctx.json({
        queryId: 'a6fa3e45-d1ad-43df-87d9-d333c734e7f5',
        values: {
          q: 'sheets',
          'q.original': 'sheets',
          'q.suggestions': 'sheets',
        },
        redirects: {
          sheets: {
            id: '22w0VFvGVaYaCRssCARmubD6lgT',
            target: 'http://target.com.au/sheets',
            token:
              'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwdXJwb3NlIjoic2VhcmNoIiwiZGVzdGluYXRpb24iOiJodHRwOi8vdGFyZ2V0LmNvbS5hdS9zaGVldHMiLCJ2YWxzIjp7ImNvbGxlY3Rpb24iOlsiYmVzdGJ1eSJdLCJpZGVudGlmaWVyIjpbInJlZGlyZWN0Il0sInByb2plY3QiOlsiMTU5NDE1MzcxMTkwMTcyNDIyMCJdLCJxIjpbInNoZWV0cyJdLCJxLmlkIjpbIjc2ZGJiOGU2LWE3MDctNDU2NC1iYTYxLWY0NjNiYTRhZDdlYSJdLCJxLnVpZCI6WyI3NmRiYjhlNi1hNzA3LTQ1NjQtYmE2MS1mNDYzYmE0YWQ3ZWEwIl0sInJlZGlyZWN0LkNvbmRpdGlvbiI6WyJxIH4gJ3NoZWV0cyciXSwicmVkaXJlY3QuSUQiOlsiMjJ3MFZGdkdWYVlhQ1Jzc0NBUm11YkQ2bGdUIl0sInJlZGlyZWN0LlRhcmdldCI6WyJodHRwOi8vdGFyZ2V0LmNvbS5hdS9zaGVldHMiXX19.BhcAVPB4z9LjlIoV42CUaEW-H0qCJ2JKngs6OGAXTf8',
          },
        },
      }),
    );
  }),
);
const metadata = {
  discount: 0.5,
};
const eventTrackingPipeline = new Pipeline({ account: '1234', collection: 'test' }, 'query', new EventTracking());
const eventTrackingPipelineWithMetadata = new Pipeline(
  { account: '1234', collection: 'test' },
  'query',
  new EventTracking('_id', metadata),
);
jest.spyOn(console, 'error').mockImplementation(); // avoid polluting logs with messaging about not having a queryId set to track against
const customRender = (ui: React.ReactElement, props: ContextProviderValues) => {
  return render(<ContextProvider {...props}>{ui}</ContextProvider>);
};

describe('Input', () => {
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

  describe('with EventTracking', () => {
    it('sends a track event on redirect', async () => {
      const trackEventSpy = jest.spyOn(eventTrackingPipeline.getSearchIOAnalytics(), 'track');
      customRender(<Input data-testid="mysearch" mode="suggestions" />, {
        search: { pipeline: eventTrackingPipeline },
      });
      const input = screen.getByTestId('mysearch');
      input.focus(); // need this else we get TypeError: element.ownerDocument.getSelection is not a function
      await user.keyboard('sheets');
      await waitFor(() => expect(screen.getByText('sheets')).toBeInTheDocument());
      await user.keyboard('{enter}');

      expect(trackEventSpy).toHaveBeenCalledWith('redirect', '22w0VFvGVaYaCRssCARmubD6lgT', undefined);
    });

    it('sends a track event with metadata on redirect', async () => {
      const trackEventSpy = jest.spyOn(eventTrackingPipelineWithMetadata.getSearchIOAnalytics(), 'track');
      customRender(<Input data-testid="mysearch" mode="suggestions" />, {
        search: { pipeline: eventTrackingPipelineWithMetadata },
      });
      const input = screen.getByTestId('mysearch');
      input.focus(); // need this else we get TypeError: element.ownerDocument.getSelection is not a function
      await user.keyboard('sheets');
      await waitFor(() => expect(screen.getByText('sheets')).toBeInTheDocument());
      await user.keyboard('{enter}');

      expect(trackEventSpy).toHaveBeenCalledWith('redirect', '22w0VFvGVaYaCRssCARmubD6lgT', metadata);
    });
  });
});
