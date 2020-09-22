// @ts-nocheck
// tslint:disable: jsx-no-lambda
import { useId } from "@reach/auto-id";
import React, { ChangeEvent } from "react";
import tw, { styled } from "twin.macro";
import useInputStyles from "../../hooks/use-input-styles";
import Box from "../Box";
import { VoiceInput } from "../Input/Voice";
import { EmptyMicIcon, MicIcon, SearchIcon, SpinnerIcon } from "./icons";
import { TextInputProps } from "./types";

const StyledBox = styled.div`
  ${tw`relative w-full`};
`;

const StyledIconContainer = styled.div<{ left: boolean; showCancel: boolean }>`
  ${({ left, showCancel }) =>
    left
      ? tw`flex absolute inset-y-0 left-0 items-center pl-4`
      : showCancel
      ? tw`flex absolute inset-y-0 right-0 items-center pr-8`
      : tw`flex absolute inset-y-0 right-0 items-center pr-4`}
`;

const StyledButton = styled.button`
  ${tw`bg-transparent shadow-none border-0 cursor-pointer`}
`;

const StyledLabel = styled.label`
  ${tw`sr-only`};
`;

const TextInput = React.forwardRef(
  (
    {
      label,
      placeholder,
      enterKeyHint,
      id = `text-input-${useId()}`,
      invalid,
      onValueChange = () => {},
      enableVoice = false,
      loading = false,
      value,
      ...rest
    }: TextInputProps,
    ref: React.Ref<HTMLInputElement>
  ) => {
    const [showCancel, setShowCancel] = React.useState(!!!value);
    const styles = useInputStyles({ block: true, type: "text" });

    React.useEffect(() => setShowCancel(value && value !== ""), [value]);
    return (
      <StyledBox>
        {label && (
          <StyledLabel className="sr-only" htmlFor={id}>
            {label}
          </StyledLabel>
        )}
        <StyledIconContainer left={true}>
          <SearchIcon />
        </StyledIconContainer>
        <Box
          ref={ref}
          as="input"
          type="search"
          css={styles}
          dir="auto"
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            onValueChange(e.target.value);
            if (!value) {
              setShowCancel(e.target.value !== "");
            }
          }}
          placeholder={placeholder}
          enterkeyhint={enterKeyHint}
          aria-invalid={invalid}
          autoCapitalize="off"
          autoComplete="off"
          autoCorrect="off"
          spellCheck="false"
          enterKeyHint="search"
          inputMode="search"
          {...rest}
        />
        {enableVoice || loading ? (
          <StyledIconContainer showCancel={showCancel}>
            {enableVoice && (
              <VoiceInput
                Renderer={({ active, onClick }) => (
                  <StyledButton onClick={onClick} aria-label="Search by voice">
                    {active ? <MicIcon /> : <EmptyMicIcon />}
                  </StyledButton>
                )}
                onVoiceInput={onValueChange}
              />
            )}
            {loading && <SpinnerIcon />}
          </StyledIconContainer>
        ) : null}
      </StyledBox>
    );
  }
);

export default TextInput;
