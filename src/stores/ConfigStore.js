import { Map as map, fromJS } from 'immutable';
import uuid from 'uuid';

const nameDefault = 'default';

let names = map();
let data = fromJS({
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
    return data.getIn([nameDefault, 'fields']);
  }

  setFields(fields) {
    data = data.setIn([nameDefault, 'fields'], fields);
  }

  addName(name, project, collection) {
    names = names.set(name, {
      project,
      collection,
    });
  }

  getNameDetails(name) {
    return names.get(name);
  }

  getProjectCollection() {
    return names.get(nameDefault);
  }

  setProjectCollection(project, collection) {
    names = names.set(nameDefault, {
      project,
      collection,
    });
  }

  getSortById(id) {
    return data.getIn([nameDefault, 'sorts', id]);
  }

  getSorts() {
    return data.getIn([nameDefault, 'sorts']);
  }

  setSorts(sorts) {
    const rawSorts = sorts.map((s) => s.raw());
    rawSorts.forEach((s) => {
      data = data.setIn([nameDefault, 'sorts', uuid.v4()], s);
    });
    // console.log(data.getIn([nameDefault, 'sorts']));
    // data = data.setIn([nameDefault, 'sorts'], rawSorts);
  }

  setActiveSort(sort) {
    data = data.setIn([nameDefault, 'activeSort'], sort);
  }

  getActiveSort() {
    return data.getIn([nameDefault, 'activeSort']);
  }

  setInfiniteScroll(enabled) {
    data = data.setIn([nameDefault, 'infiniteScroll'], enabled);
  }

  getInfiniteScroll() {
    return data.getIn([nameDefault, 'infiniteScroll']);
  }

  setInstantSearch(enabled) {
    data = data.setIn([nameDefault, 'instantSearch'], enabled);
  }

  getInstantSearch() {
    return data.getIn([nameDefault, 'instantSearch']);
  }

  setCustomResultRenderer(component) {
    data = data.setIn([nameDefault, 'customResultRenderer'], component);
  }

  getCustomResultRenderer() {
    return data.getIn([nameDefault, 'customResultRenderer']);
  }

  setMaxResults(max) {
    data = data.setIn([nameDefault, 'maxResults'], max);
  }

  getMaxResults() {
    return data.getIn([nameDefault, 'maxResults']);
  }
}

export default new ConfigStore();
