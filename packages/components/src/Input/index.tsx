/** @jsx jsx */
import { jsx } from '@emotion/core';
import useInputStyles from '../hooks/use-input-styles';

interface InputProps {
  onChange: (value: string) => void;
  value: string;
}

const Input = ({ onChange, value }: InputProps) => {
  const styles = useInputStyles({ type: 'text' });

  return <input value={value} onChange={(e) => onChange(e.target.value)} css={styles} />;
};

export default Input;
