import React from 'react'

const SelectFacetRenderer = ({ name, facetMap, selected, clear, select }) => {
  const options = Object.keys(facetMap).map(k => (
    <option key={k} value={facetMap[k]}>{k}</option>
  ));
  const clearButton = selected
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
      <div className="sj-facet">
        <select value={selected || ""} onChange={e => select(e.target.value)}>
          <option value="" >All</option>
          {options}
        </select>
      </div>
    </div>
  );
};

class SelectFacet extends React.Component {
  constructor(props) {
    super(props);
    this.state = { selected: undefined };
    this.onClick = this.onClick.bind(this);
    this.onClear = this.onClear.bind(this);
  }

  onClick(filter) {
    const onSetState = () => {
      this.props.filter.setFilter(this.props.name, this.state.selected);
      this.props.values.emitChange();
      this.props.pipeline.search();
    }
    if (this.state.selected === filter) {
      this.setState({ selected: undefined }, onSetState);
    } else {
      this.setState({ selected: filter }, onSetState);
    }
  }

  onClear() {
    this.setState({ selected: undefined }, () => {
      this.props.filter.setFilter(this.props.name, "");
      this.props.pipeline.search();
    });
  }

  render() {
    return (
      <SelectFacetRenderer
        name={this.props.name}
        facetMap={this.props.facetMap}
        selected={this.state.selected}
        clear={this.onClear}
        select={this.onClick}
      />
    );
  }
}

export default SelectFacet;
