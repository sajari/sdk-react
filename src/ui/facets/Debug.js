import React from "react";

class DebugFacet extends React.Component {
  constructor(props) {
    super(props);
    this.state = { current: props.fb.get(), filter: props.fb.filter() };
    this.onUpdate = this.onUpdate.bind(this);
  }

  componentDidMount() {
    this.props.fb.register(this.onUpdate);
  }

  onUpdate() {
    this.setState({
      current: this.props.fb.get(),
      filter: this.props.fb.filter()
    });
  }

  render() {
    const { current, filter } = this.state;
    const currentDisplay =
      current instanceof Array ? current.join(" ") : current;
    return (
      <p>
        <strong>{filter || "(none)"}</strong>
      </p>
    );
  }
}

export { DebugFacet };
