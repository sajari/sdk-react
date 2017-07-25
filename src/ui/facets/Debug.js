import React from "react";

class DebugFacet extends React.Component {
  constructor(props) {
    super(props);
    this.state = { current: props.filter.get(), filter: props.filter.filter() };
    this.onUpdate = this.onUpdate.bind(this);
  }

  componentDidMount() {
    this.props.filter.register(this.onUpdate);
  }

  onUpdate() {
    this.setState({
      current: this.props.filter.get(),
      filter: this.props.filter.filter()
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
