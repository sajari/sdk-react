import * as React from "react";
import { css } from "emotion";

import { SearchButton } from "./styled";
import { VoiceInputIcon } from "./VoiceInputIcon";

export interface VoiceInputProps {
  onVoiceInput?: (result: string) => void;
}

export interface VoiceInputState {
  avaliable: boolean;
  listening: boolean;
  previousRecognition: any;
}

export class VoiceInputButton extends React.Component<
  VoiceInputProps,
  VoiceInputState
> {
  public state = {
    avaliable: false,
    listening: false,
    previousRecognition: null
  };

  public componentDidMount() {
    if (window.hasOwnProperty("webkitSpeechRecognition")) {
      this.setState(state => ({ ...state, avaliable: true }));
    }
  }

  public render() {
    const { avaliable, listening } = this.state;

    if (!avaliable) {
      return null;
    }

    return (
      <SearchButton
        className={css({ marginRight: "0.25em" })}
        onClick={this.handleClick}
      >
        <VoiceInputIcon />
      </SearchButton>
    );
  }

  private handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    const { onVoiceInput } = this.props;
    const { listening, previousRecognition } = this.state;

    if (listening && previousRecognition) {
      (previousRecognition as any).stop();
      this.setState({ listening: false });
      return;
    }

    // @ts-ignore: webkitSpeechRecognition is avaliable in window
    const recognition = new window.webkitSpeechRecognition();

    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.lang = "en-US";
    recognition.start();

    recognition.addEventListener("result", ({ results }: any) => {
      this.setState({ listening: false });
      recognition.stop();
      const q = results[0][0].transcript;
      if (onVoiceInput !== undefined) {
        onVoiceInput(q);
      }
    });

    recognition.addEventListener("error", () => {
      this.setState({ listening: false });
      recognition.stop();
    });

    this.setState({ listening: true, previousRecognition: recognition });
  };
}
