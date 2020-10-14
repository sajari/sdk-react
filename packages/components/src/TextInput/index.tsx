/* eslint-disable no-nested-ternary */
/** @jsx jsx */
import { jsx } from '@emotion/core';
import { useId } from '@reach/auto-id';
import React, { ChangeEvent } from 'react';
import tw, { styled } from 'twin.macro';
import { Search, Spinner } from '../assets/icons';
import useInputStyles from '../hooks/use-input-styles';
import { __DEV__ } from '../utils/assertion';
import Box from '../Box';
import { Voice } from './Voice';
import { TextInputProps } from './types';

const StyledIconContainer = styled.div<{
  left?: boolean;
  showCancel?: boolean;
}>`
  ${({ left = false, showCancel = false }) =>
    (left
      ? tw`flex absolute inset-y-0 left-0 items-center pl-4`
      : showCancel
        ? tw`flex absolute inset-y-0 right-0 items-center pr-8`
        : tw`flex absolute inset-y-0 right-0 items-center pr-4`)}
`;

const TextInput = React.forwardRef(
  (
    {
      label,
      placeholder,
      enterKeyHint = 'search',
      id = `text-input-${useId()}`,
      invalid,
      onChange = () => {},
      onVoiceInput = () => {},
      enableVoice = false,
      loading = false,
      value,
      ...rest
    }: TextInputProps,
    ref: React.Ref<HTMLInputElement>,
  ) => {
    const [showCancel, setShowCancel] = React.useState(!value);
    const styles = useInputStyles({ block: true, type: 'text' });

    React.useEffect(() => setShowCancel(value ? value !== '' : false), [value]);
    return (
      <Box css={tw`relative w-full`}>
        {label && (
          <Box as="label" css={tw`sr-only`} htmlFor={id}>
            {label}
          </Box>
        )}
        <StyledIconContainer left>
          <Search />
        </StyledIconContainer>
        {/** @ts-ignore enterkeyhint */}
        <Box
          ref={ref}
          as="input"
          type="search"
          dir="auto"
          css={styles}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            onChange(e);
            if (!value) {
              setShowCancel(e.target.value !== '');
            }
          }}
          placeholder={placeholder}
          enterkeyhint={enterKeyHint}
          aria-invalid={invalid}
          autoCapitalize="off"
          autoComplete="off"
          autoCorrect="off"
          spellCheck="false"
          inputMode="search"
          {...rest}
        />
        {enableVoice || loading ? (
          <StyledIconContainer showCancel={showCancel}>
            {enableVoice && <Voice onVoiceInput={onVoiceInput} />}
            {loading && <Spinner />}
          </StyledIconContainer>
        ) : null}
      </Box>
    );
  },
);

if (__DEV__) {
  TextInput.displayName = 'TextInput';
}
export default TextInput;
export type { TextInputProps };
