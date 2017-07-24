import React from "react";
import { findDOMNode } from "react-dom";
import PropTypes from "prop-types";

import Values, { changeEvent } from "../../controllers/values";
import Pipeline, { resultsEvent } from "../../controllers/pipeline";

const RETURN_KEYCODE = 13;

class Input extends React.Component {
  constructor(props) {
    super(props);
    this.setText = this.setText.bind(this);
    this.valuesUpdated = this.valuesUpdated.bind(this);
    this.getState = this.getState.bind(this);
    this.state = {
      ...this.getState(props.values, props.qParam),
      qParam: props.qParam,
      qOverrideParam: props.qOverrideParam
    };
  }

  getState(values, qParam) {
    const text = values.get()[qParam] || "";
    return { text };
  }

  componentDidMount() {
    if (this.props.focus) {
      findDOMNode(this.refs.searchInput).focus();
    }

    this.removeValuesListener = this.props.values.listen(
      changeEvent,
      this.valuesUpdated
    );
  }

  componentWillUnmount() {
    this.removeValuesListener();
  }

  valuesUpdated() {
    this.setState(this.getState(this.props.values, this.state.qParam));
  }

  setText(text) {
    const textValues = {
      [this.state.qParam]: text,
      [this.state.qOverrideParam]: "true"
    };
    this.props.values.set(textValues);
    if (textValues[this.state.qParam]) {
      this.props.pipeline.search();
    }
  }

  render() {
    const { text } = this.state;
    const { instant, ...other } = this.props;

    return (
      <input
        type="text"
        ref="searchInput"
        value={text}
        onChange={e => {
          if (instant) {
            this.setText(e.target.value);
          }
        }}
        onKeyDown={e => {
          if (e.keyCode === RETURN_KEYCODE) {
            e.preventDefault();
            this.setText(text);
          }
        }}
        {...other}
      />
    );
  }
}

Input.propTypes = {
  values: PropTypes.instanceOf(Values).isRequired,
  pipeline: PropTypes.instanceOf(Pipeline).isRequired
};

Input.defaultProps = {
  qParam: "q",
  qOverrideParam: "q.override",
  placeHolder: "Type to search",
  instant: true
};

export default Input;
