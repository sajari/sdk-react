import { EventTracking, Pipeline, ResultValues } from '@sajari/react-hooks';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import ContextProvider, { ContextProviderValues } from '../../../ContextProvider';
import TemplateResult from '.';

const resultValues: ResultValues = {
  _id: 'foo',
  title: 'My Bike',
  description: 'Is a really great bike.',
  url: 'https://example.com',
};
const renderResult = ({ _id, title, description, url }: ResultValues): string => {
  return `<a href="${url}" data-testid="${_id}"><h1>${title}</h1><div>${description}</div></a>`;
};
const eventTrackingPipeline = new Pipeline({ account: '1234', collection: 'test' }, 'query', new EventTracking());
jest.spyOn(console, 'error').mockImplementation(); // avoid polluting logs with messaging about not having a queryId set to track against
const customRender = (ui: React.ReactElement, props: ContextProviderValues) => {
  return render(<ContextProvider {...props}>{ui}</ContextProvider>);
};

describe('TemplateResult', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('renders the correct link', () => {
    customRender(<TemplateResult result={{ values: resultValues }} render={renderResult} />, {
      search: { pipeline: eventTrackingPipeline },
    });
    expect(screen.getByTestId('foo').closest('a')).toHaveAttribute('href', resultValues.url);
  });

  it('calls onResultClick on click', () => {
    const onResultClickSpy = jest.spyOn(eventTrackingPipeline.getTracking(), 'onResultClick');
    customRender(<TemplateResult result={{ values: resultValues }} render={renderResult} />, {
      search: { pipeline: eventTrackingPipeline },
    });
    fireEvent.click(screen.getByTestId('foo'));
    expect(onResultClickSpy).toHaveBeenCalledWith(resultValues, undefined);
  });
});
