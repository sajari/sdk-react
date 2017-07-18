import { values, pipeline } from "./resources";

class StateProxy {
  setValues(newValues, search = false) {
    values.set(newValues);
    if (search) {
      pipeline.search();
    }
  }
}

const stateProxy = new StateProxy();

export default stateProxy;
