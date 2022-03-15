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
const eventTrackingPipeline = new Pipeline({ account: '1234', collection: 'test' }, 'query', new EventTracking());
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

  it('calls onPromotionClick on click', () => {
    const onPromotionClickSpy = jest.spyOn(eventTrackingPipeline.getTracking(), 'onPromotionClick');
    customRender(<BannerItem banner={banner} />, {
      search: { pipeline: eventTrackingPipeline },
    });
    fireEvent.click(screen.getByAltText(''));
    expect(onPromotionClickSpy).toHaveBeenCalledWith(banner);
  });
});
