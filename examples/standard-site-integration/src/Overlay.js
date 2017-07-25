import React from "react";

import { Overlay as OverlayFrame, Close } from "sajari-react/ui/overlay";
import { AutocompleteInput } from "sajari-react/ui/text";

import SearchResponse from "./SearchResponse";
import { values, pipeline, tracking } from "./resources";


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
          focus
          pipeline={pipeline}
          values={values}
          tracking={tracking}
          placeHolder={this.props.config.searchBoxPlaceHolder}
        />
        <Close onClick={this.hide} closeOverlay={this.hide} />
        <SearchResponse config={this.props.config} tabsFilter={this.props.tabsFilter} />
      </OverlayFrame>
    );
  }
}

export default Overlay;
