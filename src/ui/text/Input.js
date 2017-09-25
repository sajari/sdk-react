import React from "react";
import PropTypes from "prop-types";

import { Pipeline, Values, valuesUpdatedEvent } from "../../controllers";

const RETURN_KEYCODE = 13;

class Input extends React.Component {
  /**
   * propTypes
   * @property {Values} values Values object.
   * @property {Pipeline} pipeline Pipeline object.
   * @property {string} [placeholder="Type to search"] Search box placeholder.
   * @property {boolean} [autoFocus=false] Whether to focus the input element automatically.
   * @property {boolean} [instant=true] Whether to search on key press.
   * @property {string} [qParam="q"] Search parameter.
   * @property {string} [qOverrideParam="q.override"] Override parameter.
   */
  static get propTypes() {
    return {
      values: PropTypes.instanceOf(Values).isRequired,
      pipeline: PropTypes.instanceOf(Pipeline).isRequired,
      placeholder: PropTypes.string,
      autoFocus: PropTypes.bool,
      instant: PropTypes.bool,
      qParam: PropTypes.string,
      qOverrideParam: PropTypes.string
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

  setText = (text, search) => {
    const textValues = {
      [this.props.qParam]: text,
      [this.props.qOverrideParam]: "true"
    };
    this.props.values.set(textValues);
    if (!search) {
      return;
    }
    if (textValues[this.props.qParam]) {
      this.props.pipeline.search(this.props.values.get());
    } else {
      this.props.pipeline.clearResponse(this.props.values.get());
    }
  };

  handleChange = e => {
    this.setText(e.target.value, this.props.instant);
  };

  handleKeyDown = e => {
    if (e.keyCode === RETURN_KEYCODE) {
      e.preventDefault();
      this.setText(e.target.value, true);
    }
  };

  render() {
    const { text } = this.state;
    const { instant, pipeline, qParam, qOverrideParam, ...rest } = this.props;

    return (
      <input
        type="text"
        value={text}
        onChange={this.handleChange}
        onKeyDown={this.handleKeyDown}
        {...rest}
      />
    );
  }
}

Input.defaultProps = {
  qParam: "q",
  qOverrideParam: "q.override",
  placeholder: "Type to search",
  instant: true
};

export default Input;
