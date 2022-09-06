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

    const curRef = ref.current;
    if (curRef) {
      curRef.addEventListener('input', checkValidity);
      curRef.addEventListener('change', checkValidity);
    }

    return () => {
      if (curRef) {
        curRef.removeEventListener('input', checkValidity);
        curRef.removeEventListener('change', checkValidity);
      }
    };
  }, [ref.current]);

  return valid;
}
