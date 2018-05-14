import Downshift from "downshift";
import * as React from "react";
// @ts-ignore: module missing definition file
import AutosizeInput from "react-input-autosize";

import { Consumer, IContext } from "../context";
import { SearchFn } from "../context/context";

export interface IInputProps {
  autocomplete: boolean | "autocomplete";
}

export interface IInputState {
  inputValue: string;
}

export class Input extends React.Component<IInputProps, IInputState> {
  public static defaultProps = {
    autocomplete: false
  };

  public state = { inputValue: "" };

  public render() {
    const { autocomplete } = this.props;
    const { inputValue } = this.state;

    return (
      <Consumer>
        {({ completion, suggestions, search }) => (
          <Downshift
            inputValue={inputValue}
            onSelect={this.handleSelect(search)}
          >
            {({
              getInputProps,
              getItemProps,
              isOpen,
              inputValue: value,
              highlightedIndex,
              selectedItem
            }) => (
              <div>
                <div>
                  <AutosizeInput
                    minWidth={1}
                    value={value}
                    autoComplete="off"
                    autoCorrect="off"
                    autoCapitalize="off"
                    spellCheck="false"
                    {...getInputProps({
                      onChange: this.handleOnChange(search)
                    })}
                  />
                  {autocomplete ? (
                    <span>
                      {completion.slice((value as string).length || 0)}
                    </span>
                  ) : null}
                </div>
                {autocomplete &&
                (autocomplete as string) === "dropdown" &&
                isOpen ? (
                  <div style={{ border: "1px solid #ccc" }}>
                    {suggestions.map((item, index) => (
                      <div
                        {...getItemProps({ item })}
                        key={item}
                        style={{
                          backgroundColor:
                            highlightedIndex === index ? "gray" : "white",
                          fontWeight: selectedItem === item ? "bold" : "normal"
                        }}
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                ) : null}
              </div>
            )}
          </Downshift>
        )}
      </Consumer>
    );
  }

  private handleSelect = (search: SearchFn) => (selectedItem: string) =>
    this.setState(
      state => ({ ...state, inputValue: selectedItem }),
      () => {
        const { inputValue } = this.state;
        search(inputValue, true);
      }
    );

  private handleOnChange = (search: SearchFn) => (event: any) => {
    event.persist();
    this.setState(
      state => ({
        ...state,
        inputValue: event.target.value
      }),
      () => {
        const { inputValue } = this.state;
        search(inputValue, false);
      }
    );
  };
}
