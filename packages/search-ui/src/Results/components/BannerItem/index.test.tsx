import { EventTracking, Pipeline } from '@sajari/react-hooks';
import { Banner } from '@sajari/sdk-js';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import ContextProvider, { ContextProviderValues } from '../../../ContextProvider';
import BannerItem from '.';

const banner: Banner = {
  id: 'foo',
  title: 'My Bike',
  description: 'Is a really great bike.',
  targetUrl: 'https://example.com',
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

describe('BannerItem', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  afterAll(() => {
    jest.restoreAllMocks();
  });

  describe('with EventTracking', () => {
    it('sends a track event on click', () => {
      const trackEventSpy = jest.spyOn(eventTrackingPipeline.getSearchIOAnalytics(), 'track');
      customRender(<BannerItem banner={banner} />, {
        search: { pipeline: eventTrackingPipeline },
      });
      fireEvent.click(screen.getByText('My Bike'));
      expect(trackEventSpy).toHaveBeenCalledWith('promotion_click', 'foo', undefined);
    });

    it('sends a track event with metadata on click', () => {
      const trackEventSpy = jest.spyOn(eventTrackingPipelineWithMetadata.getSearchIOAnalytics(), 'track');
      customRender(<BannerItem banner={banner} />, {
        search: { pipeline: eventTrackingPipelineWithMetadata },
      });
      fireEvent.click(screen.getByText('My Bike'));
      expect(trackEventSpy).toHaveBeenCalledWith('promotion_click', 'foo', metadata);
    });
  });
});
