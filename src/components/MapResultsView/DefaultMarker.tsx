import React, { Component } from "react";
import { MarkerComponentProps } from "./MapResultsView";
import { css } from "emotion";

class DefaultMarker<Marker> extends Component<MarkerComponentProps<Marker>> {
  render() {
    const { isActive, isSelected, index, getMarkerProps } = this.props;
    return (
      <div
        {...getMarkerProps()}
        className={css({
          width: "30px",
          height: "30px",
          borderRadius: "999px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "16px",
          fontWeight: "bold",
          boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
          color: isActive ? "#ffffff" : isSelected ? "#999999" : "#232323",
          backgroundColor: isActive
            ? "#232323"
            : isSelected
            ? "#efefef"
            : "#ffffff"
        })}
      >
        {index}
      </div>
    );
  }
}

export default DefaultMarker;
