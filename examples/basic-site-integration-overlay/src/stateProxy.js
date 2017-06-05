import { State } from "sajari-react/pipeline/state";

const _state = State.default();

class StateProxy {
  setValues(values, search = false) {
    _state.setValues(values, search);
  }
}

const stateProxy = new StateProxy();

export default stateProxy;
