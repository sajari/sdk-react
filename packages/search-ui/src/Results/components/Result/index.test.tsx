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
const metadata = {
  discount: 0.5,
};
const eventTrackingPipeline = new Pipeline({ account: '1234', collection: 'test' }, 'query', new EventTracking());
const eventTrackingPipelineWithMetadata = new Pipeline(
  { account: '1234', collection: 'test' },
  'query',
  new EventTracking(undefined, metadata),
);
jest.spyOn(console, 'error').mockImplementation(); // avoid polluting logs with messaging about not having a queryId set to track against
const customRender = (ui: React.ReactElement, props: ContextProviderValues) => {
  return render(<ContextProvider {...props}>{ui}</ContextProvider>);
};

describe('Result', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  afterAll(() => {
    jest.restoreAllMocks();
  });

  describe('with EventTracking', () => {
    it('sends a track event on click', () => {
      const trackEventSpy = jest.spyOn(eventTrackingPipeline.getSearchIOAnalytics(), 'track');
      customRender(<Result result={{ values: resultValues }} />, {
        search: { pipeline: eventTrackingPipeline },
      });
      fireEvent.click(screen.getByText(resultValues.title));
      expect(trackEventSpy).toHaveBeenCalledWith('click', 'foo', undefined);
    });

    it('sends a track event with metadata on click', () => {
      const trackEventSpy = jest.spyOn(eventTrackingPipelineWithMetadata.getSearchIOAnalytics(), 'track');
      customRender(<Result result={{ values: resultValues }} />, {
        search: { pipeline: eventTrackingPipelineWithMetadata },
      });
      fireEvent.click(screen.getByText(resultValues.title));
      expect(trackEventSpy).toHaveBeenCalledWith('click', 'foo', metadata);
    });
  });
});
