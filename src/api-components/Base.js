import React from 'react';
import uuid from 'uuid';

import SearchActions from '../actions/SearchActions.js';
import Components from '../constants/QueryComponentConstants.js';

class Base extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      uuid: uuid.v4(),
      namespace: props.namespace ? props.namespace : 'default',
      run: props.run ? props.run : props.runDefault,
    };
  }

  componentDidMount() {
    SearchActions.update(
      this.state.namespace,
      this.state.uuid,
      this.props.componentName,
      this.props.data
    );
  }

  componentWillReceiveProps(newProps) {
    SearchActions.update(
      this.state.namespace,
      this.state.uuid,
      newProps.componentName,
      newProps.data
    );
    if (this.state.run === 'update' || this.state.run === 'all') {
      SearchActions.nsearch(this.state.namespace);
    }
  }

  componentWillUnmount() {
    SearchActions.remove(
      this.state.namespace,
      this.state.uuid,
      this.props.componentName
    );
  }

  render() { return null; }
}

Base.propTypes = {
  run: React.PropTypes.oneOf([null, 'update', 'mount', 'all']),
  runDefault: React.PropTypes.oneOf(['update', 'mount', 'all']),
  namespace: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.arrayOf(React.PropTypes.string),
  ]),
  componentName: React.PropTypes.oneOf(Components.list).isRequired,
  data: React.PropTypes.any.isRequired,
};

export default Base;
