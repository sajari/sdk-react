import { EventTracking, Pipeline, ResultValues } from '@sajari/react-hooks';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import ContextProvider, { ContextProviderValues } from '../../../ContextProvider';
import Result from '.';

const resultValues: ResultValues = {
  _id: 'foo',
  title: 'My Bike',
  description: 'Is a really great bike.',
  url: 'https://example.com',
};
const eventTrackingPipeline = new Pipeline({ account: '1234', collection: 'test' }, 'query', new EventTracking());
jest.spyOn(console, 'error').mockImplementation(); // avoid polluting logs with messaging about not having a queryId set to track against
const customRender = (ui: React.ReactElement, props: ContextProviderValues) => {
  return render(<ContextProvider {...props}>{ui}</ContextProvider>);
};

const mockRatingMax = 5;
const mockCurrency = 'USD';

describe('Result', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('renders the correct link', () => {
    customRender(
      <Result
        tracking={eventTrackingPipeline.getTracking()}
        ratingMax={mockRatingMax}
        currency={mockCurrency}
        result={{ values: resultValues }}
      />,
      {
        search: { pipeline: eventTrackingPipeline },
      },
    );
    expect(screen.getByText(resultValues.title).closest('a')).toHaveAttribute('href', resultValues.url);
  });

  it('calls onResultClick on click', () => {
    const onResultClickSpy = jest.spyOn(eventTrackingPipeline.getTracking(), 'onResultClick');
    customRender(
      <Result
        tracking={eventTrackingPipeline.getTracking()}
        ratingMax={mockRatingMax}
        currency={mockCurrency}
        result={{ values: resultValues }}
      />,
      {
        search: { pipeline: eventTrackingPipeline },
      },
    );
    fireEvent.click(screen.getByText(resultValues.title));
    expect(onResultClickSpy).toHaveBeenCalledWith(resultValues, undefined);
  });
});
