import React from 'react'

import { Filter, orFilter } from "../../controllers/filter";

const CheckFacetRenderer = ({ name, facetMap, selected, clear, select }) => {
  const inputs = Object.keys(facetMap).map(k => {
    const onClick = () => select(facetMap[k]);
    const checked = selected.indexOf(facetMap[k]) !== -1;
    return (
      <div key={k} className="sj-facet">
        <input
          type="checkbox"
          name={name}
          onClick={onClick}
          checked={checked}
        />
        <label onClick={onClick}>
          {k}
        </label>
      </div>
    );
  });
  const clearButton = selected.length
    ? <button onClick={e => {
        e.preventDefault();
        clear();
      }}>
        Clear
      </button>
    : null;
  return (
    <div>
      <h3>{name} {clearButton}</h3>
      {inputs}
    </div>
  );
}

class CheckFacet extends React.Component {
  constructor(props) {
    super(props);
    this.state = { selected: [], filterInstance: new Filter(orFilter) };
    this.onClick = this.onClick.bind(this);
    this.onClear = this.onClear.bind(this);
  }

  componentDidMount() {
    this.props.filter.setFilter(this.props.name, this.state.filterInstance);
  }

  componentWillUnmount() {
    this.props.filter.removeFilter(this.props.name);
  }

  onClick(filter) {
    const emitChangeAndSearch = () => {
      this.props.values.emitChange();
      this.props.pipeline.search();
    }

    let newSelected;
    if (this.state.selected.indexOf(filter) !== -1) {
      newSelected = this.state.selected.filter(f => f !== filter);
      this.setState({ selected: newSelected }, () => {
        this.state.filterInstance.removeFilter(filter);
        emitChangeAndSearch();
      });
    } else {
      newSelected = this.state.selected.concat(filter);
      this.setState({ selected: newSelected }, () => {
        this.state.filterInstance.setFilter(filter, filter);
        emitChangeAndSearch();
      });
    }
  }

  onClear() {
    const currentlySelected = this.state.selected;
    const removeSelected = () => {
      currentlySelected.forEach(f => {
        this.state.filterInstance.removeFilter(f);
      });
    };
    this.setState({ selected: [] }, () => {
      removeSelected();
      this.props.values.emitChange();
      this.props.pipeline.search();
    });
  }

  render() {
    return (
      <CheckFacetRenderer
        name={this.props.name}
        facetMap={this.props.facetMap}
        selected={this.state.selected}
        clear={this.onClear}
        select={this.onClick}
      />
    );
  }
}

export default CheckFacet;
