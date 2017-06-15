import React from "react";

import { Overlay as OverlayFrame, Close } from "sajari-react/ui/Overlay";
import { State } from "sajari-react/pipeline/state";
import AutocompleteInput from "sajari-react/pipeline/AutocompleteInput";

import SearchResponse from "./SearchResponse";

const _state = State.default();

class Overlay extends React.Component {
  constructor(props) {
    super(props);
    this.state = { active: props.startActive };
    this.setOverlayActive = this.setOverlayActive.bind(this);
  }

  setOverlayActive(active) {
    if (active) {
      this.props.initialiseValues();
    } else {
      _state.reset();
    }
    this.setState({ active });
    document.getElementsByTagName("body")[0].style.overflow = active
      ? "hidden"
      : "";
  }

  componentDidMount() {
    const config = this.props.config;

    this.props.setOverlayControls({
      show: () => this.setOverlayActive(true),
      hide: () => this.setOverlayActive(false)
    });

    // If there is a query param supplied, launch the interface
    if (config.values.q) {
      this.setOverlayActive(true);
    }
  }

  render() {
    const close = () => this.setOverlayActive(false);

    return (
      <OverlayFrame active={this.state.active}>
        <div className="sj-logo" onClick={close} />
        <AutocompleteInput placeHolder={this.props.config.searchBoxPlaceHolder} />
        <Close onClick={close} />
        <SearchResponse config={this.props.config} />
      </OverlayFrame>
    );
  }
}

export default Overlay;
