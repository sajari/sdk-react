import React from 'react'

const RadioFacetRenderer = ({ name, facetMap, selected, clear, select }) => {
  const inputs = Object.keys(facetMap).map(k => {
    const onClick = () => select(facetMap[k]);
    const checked = selected === facetMap[k];
    return (
      <div key={k} className="sj-facet">
        <input
          type="radio"
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
      {inputs}
    </div>
  );
};

class RadioFacet extends React.Component {
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
      <RadioFacetRenderer
        name={this.props.name}
        facetMap={this.props.facetMap}
        selected={this.state.selected}
        clear={this.onClear}
        select={this.onClick}
      />
    );
  }
}

export default RadioFacet;
