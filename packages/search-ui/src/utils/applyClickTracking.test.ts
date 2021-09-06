import { ClickTracking } from '@sajari/react-hooks';

import applyClickTracking from './applyClickTracking';

describe('applyClickTracking', () => {
  it('should work normally', () => {
    const onClickHandler = jest.fn();
    const { href, onClick } = applyClickTracking({
      token: { click: 'test.token' },
      tracking: new ClickTracking(),
      values: { _id: '12345', title: 'test.title', url: 'test.url' },
      onClick: onClickHandler,
    });

    expect(href).toBe('test.url');
    expect(onClickHandler).not.toBeCalled();
    onClick();
    expect(onClickHandler).toBeCalled();
  });
});
