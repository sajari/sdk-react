/** @jsx jsx */
import { jsx } from "@emotion/core";
import React from "react";
import { __DEV__ } from "../../utils/assertion";
import useLabelStyles from "./styles";
import { LabelProps } from "./types";

const Label = React.forwardRef(
  (props: LabelProps, ref?: React.Ref<HTMLLabelElement>) => {
    const styles = useLabelStyles(props);

    return <label {...props} ref={ref} css={styles} />;
  }
);

if (__DEV__) {
  Label.displayName = "Label";
}

export default Label;
export type { LabelProps };
