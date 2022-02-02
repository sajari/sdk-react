/* eslint-disable new-cap, no-prototype-builtins */
import { isSSR } from '@sajari/react-sdk-utils';
import { useCallback, useEffect, useRef, useState } from 'react';

import { SpeechRecognition } from '../types/speech-recognition';

type SpeechRecognitionSupport = 'native' | 'webkit' | false;

export default function useVoiceInput(onResult?: (r: string) => void) {
  const [supported, setSupported] = useState<SpeechRecognitionSupport>(false);
  const [active, setActive] = useState(false);
  const [result, setResult] = useState('');
  const recognitionRef = useRef<SpeechRecognition>();

  useEffect(() => {
    if (isSSR()) {
      return;
    }

    if (window.hasOwnProperty('SpeechRecognition')) {
      setSupported('native');
    } else if (window.hasOwnProperty('webkitSpeechRecognition')) {
      setSupported('webkit');
    }
  }, []);

  useEffect(() => {
    if (supported) {
      if (supported === 'native') {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        recognitionRef.current = new (window as any).SpeechRecognition() as SpeechRecognition;
      } else {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        recognitionRef.current = new (window as any).webkitSpeechRecognition() as SpeechRecognition;
      }
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
    supported: supported !== false,
    result,
    active,
    start,
  };
}
