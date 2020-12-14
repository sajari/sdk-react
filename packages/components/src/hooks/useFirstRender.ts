import { useEffect, useRef } from 'react';

export default function useFirstRender() {
  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
    }
  }, []);

  return firstRender.current;
}
