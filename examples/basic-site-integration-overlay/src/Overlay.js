import React from "react";

import { Overlay as OverlayFrame, Close } from "sajari-react/ui/Overlay";
// import AutocompleteInput from "sajari-react/pipeline/AutocompleteInput";

import SearchResponse from "./SearchResponse";

import values from "./state";

import AutocompleteInput from "./AutocompleteInput";

class Overlay extends React.Component {
  constructor(props) {
    super(props);
    this.state = { active: props.active, };

    const controls = props.setOverlayControls({
      show: () => this.setState({ active: true }),
      hide: () => this.setState({ active: false })
    });
    this.hide = controls.hide;
  }

  render() {
    return (
      <OverlayFrame active={this.state.active}>
        <div className="sj-logo" onClick={this.hide} />
        <AutocompleteInput
          values={values}
          placeHolder={this.props.config.searchBoxPlaceHolder}
        />
        <Close onClick={this.hide} />
        <SearchResponse config={this.props.config} />
      </OverlayFrame>
    );
  }
}

export default Overlay;
