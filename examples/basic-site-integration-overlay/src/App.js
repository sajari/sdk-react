import React from "react";
import ReactDOM from "react-dom";

import AutocompleteInput from "sajari-react/pipeline/AutocompleteInput";
import Analytics from "sajari-react/pipeline/analytics";

import { State } from "sajari-react/pipeline/state";

import Overlay from "./Overlay";
import SearchResponse from "./SearchResponse";

import "./styles.css";

const ESCAPE_KEY_CODE = 27;

const _state = State.default();

class App extends React.Component {
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
    if (!window.sj) window.sj = {};
    window.sj.state = _state;

    const config = this.props.config;
    if (config.overlay) {
      // Set a global function which client code can call to launch the overlay
      window.sj.interface.show = () => this.setOverlayActive(true);
      window.sj.interface.hide = () => this.setOverlayActive(false);

      document.addEventListener("keydown", e => {
        if (e.keyCode === ESCAPE_KEY_CODE) {
          this.setOverlayActive(false);
        }
      });

      // If there is a query param supplied, launch the interface
      if (config.values.q) {
        this.setOverlayActive(true);
      }
    } else if (config.attachSearchResponse) {
      ReactDOM.render(
        <SearchResponse config={config} />,
        config.attachSearchResponse
      );
    }

    _state.setProject(config.project);
    _state.setCollection(config.collection);
    _state.setPipeline(config.pipeline);

    let fields = "title,description,url";
    if (config.showImages) {
      fields += ",image";
    }
    _state.setValues({ fields });

    if (config.values) {
      // Perform a search on load if there is a query param supplied
      const performSearch = Boolean(config.values.q);
      _state.setValues(config.values, performSearch);
    }

    if (!config.disableGA) {
      new Analytics("default");
    }
  }

  render() {
    const config = this.props.config;
    const active = this.state.active;
    const close = () => this.setOverlayActive(false);

    const isOverlay = config.overlay;

    return isOverlay
      ? <Overlay active={active} close={close} config={config} />
      : <AutocompleteInput placeHolder={config.searchBoxPlaceHolder} />;
  }
}

export default App;
