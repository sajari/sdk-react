import Downshift from "downshift";
import * as React from "react";
// @ts-ignore: module missing definition file
import AutosizeInput from "react-input-autosize";

import { Consumer, IContext } from "../context";

export interface IInputProps {
  autocomplete: boolean | "autocomplete";
}

export interface IInputState {
  inputValue: string;
}

export class Input extends React.Component<IInputProps, IInputState> {
  public state = { inputValue: "" };

  public static defaultProps = {
    autocomplete: false
  };

  public render() {
    const { autocomplete } = this.props;
    const { inputValue } = this.state;

    return (
      <Consumer>
        {({ completion, suggestions, search }) => (
          <Downshift
            inputValue={inputValue}
            onSelect={selectedItem =>
              this.setState(
                state => ({ ...state, inputValue: selectedItem }),
                () => {
                  const { inputValue } = this.state;
                  search(inputValue, true);
                }
              )
            }
          >
            {({
              getInputProps,
              getItemProps,
              isOpen,
              inputValue,
              highlightedIndex,
              selectedItem
            }) => (
              <div>
                <div>
                  <AutosizeInput
                    minWidth={1}
                    value={inputValue}
                    autoComplete="off"
                    autoCorrect="off"
                    autoCapitalize="off"
                    spellCheck="false"
                    {...getInputProps({
                      onChange: (event: any) => {
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
                      }
                    })}
                  />
                  {autocomplete ? (
                    <span>
                      {completion.slice((inputValue as string).length || 0)}
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
}
