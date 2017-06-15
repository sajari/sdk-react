import React from "react";

import { Overlay as OverlayFrame, Close } from "sajari-react/ui/Overlay";
import AutocompleteInput from "sajari-react/pipeline/AutocompleteInput";

import SearchResponse from "./SearchResponse";

class Overlay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: props.active,
      ...props.setOverlayControls({
        show: () => this.setState({ active: true }),
        hide: () => this.setState({ active: false })
      })
    };
  }

  render() {
    return (
      <OverlayFrame active={this.state.active}>
        <div className="sj-logo" onClick={this.state.hide} />
        <AutocompleteInput
          placeHolder={this.props.config.searchBoxPlaceHolder}
        />
        <Close onClick={this.state.hide} />
        <SearchResponse config={this.props.config} />
      </OverlayFrame>
    );
  }
}

export default Overlay;
