import React from 'react'

import { State, TRACKING_RESET } from 'sajari-react/pipeline/state'

const _state = State.default();


class Tabs extends React.Component {
  constructor(props) {
    super(props);

    this.state = {selected: this.props.defaultTab};
    this.onTrackingReset = this.onTrackingReset.bind(this);
  }

  _state() {
    return State.ns(this.props.namespace);
  }

  componentDidMount() {
    this._state().registerListener(TRACKING_RESET, this.onTrackingReset);
  }

  componentWillUnmount() {
    // Tabs component is unmounted before reset is called, this catches that scenario
    this.onTrackingReset();
    this._state().unregisterListener(TRACKING_RESET, this.onTrackingReset);
  }

  onTrackingReset() {
    const { defaultTab, tabs } = this.props;

    let defaultTabFilter = undefined;
    tabs.forEach(t => {
      if (t.title === defaultTab) {
        defaultTabFilter = t.filter;
      }
    });

    if (defaultTabFilter) {
      this.setState({ selected: this.props.defaultTab });
      this._state().setValues({ filter: defaultTabFilter });
    } else {
      this.setState({ selected: null });
      this._state().setValues({ filter: "" });
    }
  }

  onClickTab(title, filter) {
    this.setState({
      selected: title,
    })

    this._state().setValues({
      filter: filter,
    }, true);
  }

  render() {
    return (
      <div className='sj-tabs-container'>
        <div className='sj-tabs'>
          {this.props.tabs.map((t) => (
            <div
              key={t.title}
              className={`sj-tab${t.title === this.state.selected ? ' sj-tab-active' : ''}`}
              onClick={() => {this.onClickTab(t.title, t.filter)
              }}>
              {t.title}
            </div>
          ))}
        </div>
      </div>
    )
  }
}

Tabs.defaultProps = {
  namespace: 'default',
}

export default Tabs