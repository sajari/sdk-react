import React from "react";

import { Overlay as OverlayFrame, Close } from "sajari-react/ui/Overlay";
import AutocompleteInput from "sajari-react/pipeline/AutocompleteInput";

import SearchResponse from "./SearchResponse";

const Overlay = ({ active, close, config }) => (
  <OverlayFrame active={active}>
    <div className="sj-logo" onClick={close} />
    <AutocompleteInput placeHolder={config.searchPlaceholder} />
    <Close onClick={close} />
    <SearchResponse config={config} />
  </OverlayFrame>
);

export default Overlay;
