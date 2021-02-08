import { isBoolean } from '@sajari/react-sdk-utils';
import * as React from 'react';

export default function useFormValidity(
  ref: React.RefObject<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
) {
  const [valid, setValid] = React.useState<boolean | undefined>(undefined);

  const checkValidity = () => {
    const result = ref.current?.checkValidity();

    if (isBoolean(result)) {
      setValid(result);
    }
  };

  React.useEffect(() => {
    checkValidity();

    if (ref.current) {
      ref.current.addEventListener('input', checkValidity);
      ref.current.addEventListener('change', checkValidity);
    }

    return () => {
      if (ref.current) {
        ref.current.removeEventListener('input', checkValidity);
        ref.current.removeEventListener('change', checkValidity);
      }
    };
  }, [ref.current]);

  return valid;
}
