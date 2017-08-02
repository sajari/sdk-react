import React from "react";
import { findDOMNode } from "react-dom";
import PropTypes from "prop-types";

import {
  Pipeline,
  Tracking,
  Values,
  valuesUpdatedEvent
} from "../../controllers";

const RETURN_KEYCODE = 13;

class Input extends React.Component {
  /**
   * propTypes
   * @property {Values} values Values object.
   * @property {Pipeline} pipeline Pipeline object.
   * @property {Tracking} tracking Tracking object.
   * @property {string} [qParam="q"] Search parameter.
   * @property {string} [qOverrideParam="q.override"] Override parameter.
   * @property {boolean} [focus=false] Whether to focus the input element.
   * @property {boolean} [instant] Whether to search on key press.
   */
  static get propTypes() {
    return {
      values: PropTypes.instanceOf(Values).isRequired,
      pipeline: PropTypes.instanceOf(Pipeline).isRequired,
      tracking: PropTypes.instanceOf(Tracking),
      qParam: PropTypes.string,
      qOverrideParam: PropTypes.string,
      focus: PropTypes.bool,
      instant: PropTypes.bool
    };
  }

  constructor(props) {
    super(props);

    this.state = {
      text: this.props.values.get()[this.props.qParam] || ""
    };
  }

  componentDidMount() {
    this.removeValuesListener = this.props.values.listen(
      valuesUpdatedEvent,
      this.valuesChanged
    );
  }

  componentWillUnmount() {
    this.removeValuesListener();
  }

  valuesChanged = () => {
    this.setState({ text: this.props.values.get()[this.props.qParam] || "" });
  };

  setText = text => {
    const textValues = {
      [this.props.qParam]: text,
      [this.props.qOverrideParam]: "true"
    };
    this.props.values.set(textValues);
    if (textValues[this.props.qParam]) {
      this.props.pipeline.search(this.props.values, this.props.tracking);
    } else {
      this.props.pipeline.clearResponse(this.props.values);
    }
  };

  handleChange = e => {
    this.setText(e.target.value);
  };

  handleKeyDown = e => {
    if (e.keyCode === RETURN_KEYCODE) {
      e.preventDefault();
      this.setText(text);
    }
  };

  render() {
    const { text } = this.state;
    const { instant, focus, ...rest } = this.props;

    return (
      <input
        type="text"
        value={text}
        autoFocus={focus}
        onChange={this.handleChange}
        onKeyDown={this.props.instant ? this.handleKeyDown : undefined}
        {...rest}
      />
    );
  }
}

Input.defaultProps = {
  qParam: "q",
  qOverrideParam: "q.override",
  placeHolder: "Type to search",
  instant: true
};

export default Input;
