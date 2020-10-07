import * as React from 'react';

export interface VoiceInputProps {
  onVoiceInput: (input: string) => void;
  Renderer: React.ComponentType<{
    active: boolean;
    onClick: (event: React.MouseEvent<any>) => void;
  }>;
}

export interface VoiceInputState {
  active: boolean;
  previousRecognition: any;
  recognition: any;
  supports: boolean;
}

export class VoiceInput extends React.Component<VoiceInputProps, VoiceInputState> {
  public state = {
    active: false,
    recognition: null as any,
    previousRecognition: null as any,
    supports: false,
  };

  public componentDidMount() {
    this.setState({
      supports: window.hasOwnProperty('webkitSpeechRecognition'),
    });
  }

  public handleClick = () => {
    const { onVoiceInput } = this.props;
    const { active, previousRecognition } = this.state;

    if (active && previousRecognition) {
      previousRecognition.stop();
      this.setState({ active: false });
      return;
    }

    const recognition = new window.webkitSpeechRecognition();

    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.lang = 'en-US';
    recognition.start();

    recognition.onresult = (event: any) => {
      this.setState({ active: false });
      recognition.stop();
      const q = event.results[0][0].transcript;
      onVoiceInput(q);
    };

    recognition.onerror = () => {
      this.setState({ active: false });
      recognition.stop();
    };

    this.setState({ active: true, previousRecognition: recognition });
  };

  public render() {
    if (!this.state.supports) {
      return null;
    }

    const { active } = this.state;
    const { Renderer } = this.props;

    return <Renderer onClick={this.handleClick} active={active} />;
  }
}

export const EmptyMicIcon = (props: any) => (
  <svg width="1em" height="1em" viewBox="0 0 14 19" fill="none" {...props}>
    <path
      d="M7 12c1.66 0 2.99-1.34 2.99-3L10 3c0-1.66-1.34-3-3-3S4 1.34 4 3v6c0 1.66 1.34 3 3 3zM5.8 2.9c0-.66.54-1.2 1.2-1.2.66 0 1.2.54 1.2 1.2l-.01 6.2c0 .66-.53 1.2-1.19 1.2-.66 0-1.2-.54-1.2-1.2V2.9zM12.3 9c0 3-2.54 5.1-5.3 5.1S1.7 12 1.7 9H0c0 3.41 2.72 6.23 6 6.72V19h2v-3.28c3.28-.48 6-3.3 6-6.72h-1.7z"
      fill="currentColor"
    />
  </svg>
);

export const MicIcon = (props: any) => (
  <svg width="1em" height="1em" viewBox="0 0 14 19" fill="none" {...props}>
    <path
      d="M7 12c1.66 0 2.99-1.34 2.99-3L10 3c0-1.66-1.34-3-3-3S4 1.34 4 3v6c0 1.66 1.34 3 3 3zm5.3-3c0 3-2.54 5.1-5.3 5.1S1.7 12 1.7 9H0c0 3.41 2.72 6.23 6 6.72V19h2v-3.28c3.28-.48 6-3.3 6-6.72h-1.7z"
      fill="currentColor"
    />
  </svg>
);
