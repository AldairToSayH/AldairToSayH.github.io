export const CONTACT_AUDIO_REQUEST = 'portfolio:contact-audio-request';

export function requestContactAudio() {
  window.dispatchEvent(new Event(CONTACT_AUDIO_REQUEST));
}
