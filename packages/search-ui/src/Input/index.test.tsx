import 'whatwg-fetch';

import { EventTracking, Pipeline } from '@sajari/react-hooks';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import React from 'react';

import ContextProvider, { ContextProviderValues } from '../ContextProvider';
import Input from '.';

const redirectTarget = {
  id: '22w0VFvGVaYaCRssCARmubD6lgT',
  target: 'http://target.com.au/sheets',
  token:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwdXJwb3NlIjoic2VhcmNoIiwiZGVzdGluYXRpb24iOiJodHRwOi8vdGFyZ2V0LmNvbS5hdS9zaGVldHMiLCJ2YWxzIjp7ImNvbGxlY3Rpb24iOlsiYmVzdGJ1eSJdLCJpZGVudGlmaWVyIjpbInJlZGlyZWN0Il0sInByb2plY3QiOlsiMTU5NDE1MzcxMTkwMTcyNDIyMCJdLCJxIjpbInNoZWV0cyJdLCJxLmlkIjpbIjc2ZGJiOGU2LWE3MDctNDU2NC1iYTYxLWY0NjNiYTRhZDdlYSJdLCJxLnVpZCI6WyI3NmRiYjhlNi1hNzA3LTQ1NjQtYmE2MS1mNDYzYmE0YWQ3ZWEwIl0sInJlZGlyZWN0LkNvbmRpdGlvbiI6WyJxIH4gJ3NoZWV0cyciXSwicmVkaXJlY3QuSUQiOlsiMjJ3MFZGdkdWYVlhQ1Jzc0NBUm11YkQ2bGdUIl0sInJlZGlyZWN0LlRhcmdldCI6WyJodHRwOi8vdGFyZ2V0LmNvbS5hdS9zaGVldHMiXX19.BhcAVPB4z9LjlIoV42CUaEW-H0qCJ2JKngs6OGAXTf8',
};
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
          sheets: redirectTarget,
        },
        searchResponse: {
          reads: '141',
          totalResults: '1',
          time: '0.000641s',
          results: [iPhoneResult],
          featureScoreWeight: 0.2,
        },
      }),
    );
  }),
);
const eventTrackingPipeline = new Pipeline({ account: '1234', collection: 'test' }, 'query', new EventTracking());
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

  it('calls onRedirect on redirect', async () => {
    const onRedirectSpy = jest.spyOn(eventTrackingPipeline.getTracking(), 'onRedirect');
    customRender(<Input data-testid="mysearch" mode="suggestions" />, {
      search: { pipeline: eventTrackingPipeline },
    });
    const input = screen.getByTestId('mysearch');
    input.focus(); // need this else we get TypeError: element.ownerDocument.getSelection is not a function
    await user.keyboard('sheets');
    await waitFor(() => expect(screen.getByText('sheets')).toBeInTheDocument());
    await user.keyboard('{enter}');

    expect(onRedirectSpy).toHaveBeenCalledWith({
      ...redirectTarget,
      token: `https://re.sajari.com/token/${redirectTarget.token}`, // sdk-js prepends the clickTokenURL
    });
  });

  it('calls onResultClick on results click', async () => {
    const onResultClickSpy = jest.spyOn(eventTrackingPipeline.getTracking(), 'onResultClick');
    customRender(<Input data-testid="mysearch" mode="results" />, {
      search: { pipeline: eventTrackingPipeline },
    });
    const input = screen.getByTestId('mysearch');
    input.focus(); // need this else we get TypeError: element.ownerDocument.getSelection is not a function
    await user.keyboard('iphone');
    await waitFor(() => expect(screen.getByText('Results')).toBeInTheDocument());
    await user.keyboard('{arrowdown}{enter}');

    expect(onResultClickSpy).toHaveBeenCalledWith(
      {
        // eslint-disable-next-line no-underscore-dangle
        _id: iPhoneResult.values._id.single,
        description: iPhoneResult.values.description.single,
        image: iPhoneResult.values.image.single,
        name: iPhoneResult.values.name.single,
        url: iPhoneResult.values.url.single,
      },
      undefined,
    );
  });

  it('set the input to readonly after Enter key and remove it after it has done searching', async () => {
    customRender(<Input data-testid="mysearch" />, {
      search: { pipeline: eventTrackingPipeline },
    });
    const input = screen.getByTestId<HTMLInputElement>('mysearch');
    const setAttributeSpy = jest.spyOn(input, 'setAttribute');
    const removeAttributeSpy = jest.spyOn(input, 'removeAttribute');

    input.focus();
    user.keyboard('television{Enter}');
    await waitFor(() => expect(input.attributes.getNamedItem('readonly')?.value).toBe(''));
    await waitFor(() => expect(input.attributes.getNamedItem('readonly')).toBeNull());

    expect(setAttributeSpy).toHaveBeenCalled();
    expect(removeAttributeSpy).toHaveBeenCalled();
  });

  it('will not allow Enter key event to go through while `readonly` attribute is present', async () => {
    customRender(<Input data-testid="mysearch" />, {
      search: { pipeline: eventTrackingPipeline },
    });
    const input = screen.getByTestId<HTMLInputElement>('mysearch');

    input.focus();
    // Multiple enters in quick succession
    user.keyboard('television{Enter}{Enter}{Enter}');

    await waitFor(() => expect(input.attributes.getNamedItem('readonly')?.value).toBe(''));
    await waitFor(() => expect(input.attributes.getNamedItem('readonly')).toBeNull());
  });
});
