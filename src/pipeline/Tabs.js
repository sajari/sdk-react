import React from 'react'


const _state = State.default();
import { State, TRACKING_RESET } from 'sajari-react/pipeline/state'


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
    this._state().unregisterListener(TRACKING_RESET, this.onTrackingReset);
  }

  onTrackingReset() {
    const values = this._state().getValues();
    const { defaultTab, tabs } = this.props;

    let defaultTabFilter = undefined;
    tabs.forEach(t => {
      if (t.title === defaultTab) {
        defaultTabFilter = t.filter;
      }
    });

    // If there is no filter but the default tab filter is non-empty
    if (!values.filter && defaultTabFilter) {
      // Set the default tabs filter
      this._state().setValues({ filter: defaultTabFilter });
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