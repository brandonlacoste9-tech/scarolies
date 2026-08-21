export type VoicePlaybackAction = 'play' | 'wait-for-gesture' | 'browser-tts';

export function planVoicePlayback(opts: {
  receivedAudio: boolean;
  playError?: string | null;
}): VoicePlaybackAction {
  if (opts.receivedAudio) {
    return opts.playError ? 'wait-for-gesture' : 'play';
  }
  return 'browser-tts';
}

export function speechUtteranceLang(locale: string): string {
  return locale === 'fr' ? 'fr-CA' : 'en-CA';
}

export function pickFemaleBrowserVoice(locale: string): SpeechSynthesisVoice | null {
  if (typeof window === 'undefined' || !window.speechSynthesis) return null;
  const voices = window.speechSynthesis.getVoices();
  const lang = speechUtteranceLang(locale).slice(0, 2);
  if (locale !== 'fr') {
    const male = voices.find(
      (voice) =>
        voice.lang.toLowerCase().startsWith(lang) &&
        /male|david|daniel|george|james|mark|alex|fred|google uk english male/i.test(voice.name) &&
        !/female|zira|samantha/i.test(voice.name),
    );
    return (
      male ??
      voices.find((voice) => voice.lang.toLowerCase().startsWith(lang)) ??
      null
    );
  }
  const female = voices.find(
    (voice) =>
      voice.lang.toLowerCase().startsWith(lang) &&
      /female|woman|jessica|samantha|victoria|zira|aria|linda|amelie|amélie|marie|audrey|denise/i.test(
        voice.name,
      ),
  );
  return (
    female ??
    voices.find((voice) => voice.lang.toLowerCase().startsWith(lang)) ??
    null
  );
}
