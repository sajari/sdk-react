"use strict";

import Immutable from "immutable";
import uuid from "uuid";

const nameDefault = "default";

let _names = Immutable.Map();
let _data = Immutable.fromJS({
  default: {
    fields: [],
    sorts: {},
    activeSort: null,
    infiniteScroll: false,
    instantSearch: false,
    customResultRenderer: null,
    maxResults: 20,
  },
});

class ConfigStore {
  defaultName() {
    return nameDefault;
  }

  getFields() {
    return _data.getIn([nameDefault, "fields"]);
  }

  setFields(fields) {
    _data = _data.setIn([nameDefault, "fields"], fields);
  }

  addName(name, project, collection) {
    _names = _names.set(name, {
      project: project,
      collection: collection,
    });
  }

  getNameDetails(name) {
    return _names.get(name);
  }

  getProjectCollection() {
    return _names.get(nameDefault);
  }

  setProjectCollection(project, collection) {
    _names = _names.set(nameDefault, {
      project: project,
      collection: collection,
    });
  }

  getSortById(id) {
    return _data.getIn([nameDefault, "sorts", id]);
  }

  getSorts() {
    return _data.getIn([nameDefault, "sorts"]);
  }

  setSorts(sorts) {
    const rawSorts = sorts.map((s) => s.raw());
    rawSorts.forEach((s) => {
      _data = _data.setIn([nameDefault, "sorts", uuid.v4()], s);
    });
    // console.log(_data.getIn([nameDefault, "sorts"]));
    // _data = _data.setIn([nameDefault, "sorts"], rawSorts);
  }

  setActiveSort(sort) {
    _data = _data.setIn([nameDefault, "activeSort"], sort);
  }

  getActiveSort() {
    return _data.getIn([nameDefault, "activeSort"]);
  }

  setInfiniteScroll(enabled) {
    _data = _data.setIn([nameDefault, "infiniteScroll"], enabled);
  }

  getInfiniteScroll() {
    return _data.getIn([nameDefault, "infiniteScroll"]);
  }

  setInstantSearch(enabled) {
    _data = _data.setIn([nameDefault, "instantSearch"], enabled);
  }

  getInstantSearch() {
    return _data.getIn([nameDefault, "instantSearch"]);
  }

  setCustomResultRenderer(component) {
    _data = _data.setIn([nameDefault, "customResultRenderer"], component);
  }

  getCustomResultRenderer() {
    return _data.getIn([nameDefault, "customResultRenderer"]);
  }

  setMaxResults(max) {
    _data = _data.setIn([nameDefault, "maxResults"], max);
  }

  getMaxResults() {
    return _data.getIn([nameDefault, "maxResults"]);
  }
}

export default new ConfigStore();
