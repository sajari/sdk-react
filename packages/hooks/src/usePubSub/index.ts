import { useContext } from '../ContextProvider';
import { PubSubEvents } from './events';

function usePubSub() {
  const {
    emitter: { emit },
  } = useContext();

  const sub = (event: PubSubEvents, handler) => {
    emit.on(event, handler);
    return () => {
      emit.off(event, handler);
    };
  };

  function pub<T>(event: PubSubEvents, data?: T) {
    emit.emit(event, data);
  }

  return {
    sub,
    pub,
  };
}

export default usePubSub;
