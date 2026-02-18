"use client";

import { useEffect, useState, useCallback } from "react";
import { isSpeechAvailable, waitForVoices } from "@/lib/speech";

export function useSpeech() {
  const [available, setAvailable] = useState(false);
  const [slow, setSlow] = useState(false);
  const [speaking, setSpeaking] = useState(false);

  useEffect(() => {
    if (!isSpeechAvailable()) return;
    waitForVoices().then(() => setAvailable(true));
  }, []);

  const speak = useCallback(
    (word: string) => {
      if (!available) return;
      setSpeaking(true);
      const utterance = new SpeechSynthesisUtterance(word);
      utterance.lang = "en-US";
      utterance.rate = slow ? 0.8 : 1.0;

      const voices = window.speechSynthesis.getVoices();
      const enUS = voices.find((v) => v.lang.startsWith("en-US"));
      if (enUS) utterance.voice = enUS;

      utterance.onend = () => setSpeaking(false);
      utterance.onerror = () => setSpeaking(false);

      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(utterance);
    },
    [available, slow]
  );

  const toggleSlow = useCallback(() => setSlow((s) => !s), []);

  return { available, slow, speaking, speak, toggleSlow };
}
