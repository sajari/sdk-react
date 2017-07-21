import React, { Component } from "react";

import singleFacetBuilder from "sajari-react/controllers/singleFacetBuilder";
import multiFacetBuilder from "sajari-react/controllers/multiFacetBuilder";

const radioOptions = {
  radio1: "dir1='article'",
  radio2: "dir1!='article'"
};

const checkOptions = {
  check1: "dir1='article'",
  check2: "dir1!='article'"
};

const SFB = new singleFacetBuilder(radioOptions);

const MFB = new multiFacetBuilder(checkOptions);

class RenderFacet extends React.Component {
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
    const onClick = () => {
      this.props.fb.set(this.props.name, !this.state.active);
    };
    return (
      <input
        type={this.props.type}
        onClick={onClick}
        checked={this.state.active}
      />
    );
  }
}

class CurrentFacet extends React.Component {
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
    return (
      <p>
        Current filter name: <strong>
          {this.state.current || "(none)"}
        </strong>{" "}
        filter: <strong>{this.state.filter || "(none)"}</strong>
      </p>
    );
  }
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <label>Articles</label>
        <RenderFacet fb={SFB} name="radio1" type="radio" />
        <br />
        <label>Other</label>
        <RenderFacet fb={SFB} name="radio2" type="radio" />
        <CurrentFacet fb={SFB} />
        <label>Good</label>
        <RenderFacet fb={MFB} name="check1" type="checkbox" />
        <br />
        <label>Bad</label>
        <RenderFacet fb={MFB} name="check2" type="checkbox" />
        <CurrentFacet fb={MFB} />
      </div>
    );
  }
}

export default App;
