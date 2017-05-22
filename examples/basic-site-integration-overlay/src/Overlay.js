import React from "react";

import { Overlay as OverlayFrame, Close } from "sajari-react/ui/Overlay";
import { State } from "sajari-react/pipeline/state";

import SearchResponse from "./SearchResponse";
import Input from "./Input";

const ESCAPE_KEY_CODE = 27;

const _state = State.default();

class Overlay extends React.Component {
  constructor(props) {
    super(props);
    this.state = { active: false };
    this.setOverlayActive = this.setOverlayActive.bind(this);
  }

  setOverlayActive(active) {
    this.setState({ active });
    if (!active) {
      _state.setValues({ q: undefined });
      _state.reset();
    }
    document.getElementsByTagName("body")[0].style.overflow = active
      ? "hidden"
      : "";
  }

  componentDidMount() {
    const config = this.props.config;

    window._sjui.overlay = {
      show: () => this.setOverlayActive(true),
      hide: () => this.setOverlayActive(false)
    };

    document.addEventListener("keydown", e => {
      if (e.keyCode === ESCAPE_KEY_CODE) {
        this.setOverlayActive(false);
      }
    });

    // If there is a query param supplied, launch the interface
    if (config.values.q) {
      this.setOverlayActive(true);
    }
  }

  render() {
    const config = this.props.config;
    const close = () => this.setOverlayActive(false);
    const active = this.state.active;

    return (
      <OverlayFrame active={active}>
        <div className="sj-logo" onClick={close} />
        <Input placeHolder={config.searchPlaceholder} />
        <Close onClick={close} />
        <SearchResponse config={config} />
      </OverlayFrame>
    );
  }
}

export default Overlay;
