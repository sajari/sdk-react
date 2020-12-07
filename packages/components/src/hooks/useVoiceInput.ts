/* eslint-disable new-cap, no-prototype-builtins */
import { isSSR } from '@sajari/react-sdk-utils';
import { useCallback, useEffect, useRef, useState } from 'react';

export default function useVoiceInput(onResult?: (r: string) => void) {
  const [supported, setSupported] = useState(false);
  const [active, setActive] = useState(false);
  const [result, setResult] = useState('');
  const recognitionRef = useRef<SpeechRecognition>();

  useEffect(() => {
    setSupported(!isSSR() && window.hasOwnProperty('webkitSpeechRecognition'));
  }, []);

  useEffect(() => {
    if (supported) {
      recognitionRef.current = new (window as any).webkitSpeechRecognition() as SpeechRecognition;
    }
  }, [supported]);

  const start = useCallback(() => {
    if (!supported || !recognitionRef.current) {
      return;
    }

    const recognition = recognitionRef.current;

    if (active) {
      setActive(false);
      recognition.stop();
      return;
    }

    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.start();

    recognition.onresult = (event) => {
      setActive(false);
      recognition.stop();
      const r = event.results[0][0].transcript;
      setResult(r);
      onResult?.(r);
    };

    recognition.onerror = () => {
      setActive(false);
      recognition.stop();
    };

    setActive(true);
  }, [active, supported, onResult]);

  return {
    supported,
    result,
    active,
    start,
  };
}
