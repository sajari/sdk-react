import { Listener } from '../Listener';

describe('Listener', () => {
  it('listen, unlisten and notify', () => {
    const spyOne = jest.fn();
    const spyTwo = jest.fn();
    const listener = new Listener();
    listener.listen(spyOne);
    listener.listen(spyTwo);

    listener.notify((fn) => fn());
    expect(spyOne).toHaveBeenCalledTimes(1);
    expect(spyTwo).toHaveBeenCalledTimes(1);

    listener.unlisten(spyOne);
    listener.notify((fn) => fn());
    expect(spyOne).toHaveBeenCalledTimes(1);
    expect(spyTwo).toHaveBeenCalledTimes(2);

    listener.notify((fn) => fn());
    expect(spyTwo).toHaveBeenCalledTimes(3);

    listener.unlisten(spyTwo);
    listener.notify((fn) => fn());
    expect(spyOne).toHaveBeenCalledTimes(1);
    expect(spyTwo).toHaveBeenCalledTimes(3);
  });

  it('unlistener return', () => {
    const spyFunc = jest.fn();
    const listener = new Listener();
    const unlistenerFn = listener.listen(spyFunc);

    listener.notify((fn) => fn());
    listener.notify((fn) => fn());
    expect(spyFunc).toHaveBeenCalledTimes(2);

    unlistenerFn();
    listener.notify((fn) => fn());
    listener.notify((fn) => fn());
    expect(spyFunc).toHaveBeenCalledTimes(2);
  });
});
