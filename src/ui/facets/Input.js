import React from "react";

class CheckboxFacet extends React.Component {
  render() {
    return <InputFacet type="checkbox" {...this.props} />;
  }
}

class RadioFacet extends React.Component {
  render() {
    return <InputFacet type="radio" {...this.props} />;
  }
}

class SelectFacet extends React.Component {
  constructor(props) {
    super(props);
    this.state = { active: props.fb.isSet(props.name) };
    this.onUpdate = this.onUpdate.bind(this);
  }

  componentDidMount() {
    this.unregister = this.props.fb.register(this.onUpdate);
  }

  componentWillUnmount() {
    this.unregister();
  }

  onUpdate(fb) {
    this.setState({ active: fb.get() });
  }

  render() {
    const { fb, name, options, ...other } = this.props;
    const onClick = e => {
      fb.set(e.target.value, true);
    };
    const optionsRendered = Object.keys(options).map(o => {
      return (
        <option value={o} key={o}>
          {options[o]}
        </option>
      );
    });
    return (
      <select value={this.state.active} onChange={onClick}>
        {optionsRendered}
      </select>
    );
    // return <input onClick={onClick} checked={this.state.active} {...other} />;
  }
}

class InputFacet extends React.Component {
  constructor(props) {
    super(props);
    this.state = { active: props.fb.isSet(props.name) };
    this.onUpdate = this.onUpdate.bind(this);
  }

  componentDidMount() {
    this.unregister = this.props.fb.register(this.onUpdate);
  }

  componentWillUnmount() {
    this.unregister();
  }

  onUpdate(fb) {
    this.setState({ active: fb.isSet(this.props.name) });
  }

  render() {
    const { fb, name, children, ...other } = this.props;
    const onClick = () => {
      fb.set(name, !this.state.active);
    };
    return <input onClick={onClick} checked={this.state.active} {...other} />;
  }
}

export { CheckboxFacet, RadioFacet, SelectFacet };
