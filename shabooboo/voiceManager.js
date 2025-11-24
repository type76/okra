// Voice management
let currentVoice = null;
let useRandomVoice = false;
let lastRandomVoice = null;

export function getRandomVoice() {
    const voices = speechSynthesis.getVoices();
    return voices.length > 0 ? voices[Math.floor(Math.random() * voices.length)] : null;
}

export function setRandomVoice() {
    // Use the last random voice if available, otherwise get a new one
    currentVoice = lastRandomVoice || getRandomVoice();
    useRandomVoice = true;
    const message = currentVoice ? `Voice set to ${currentVoice.name}` : 'No voices available';
    return message;
}

export function setDefaultVoice() {
    const voices = speechSynthesis.getVoices();
    const defaultVoice = voices.find(voice => 
        voice.name.toLowerCase().includes('tessa') || 
        voice.name.toLowerCase().includes('female')
    ) || (voices.length > 0 ? voices[0] : null);
    
    currentVoice = defaultVoice;
    useRandomVoice = false;
    const message = defaultVoice ? `Voice set to ${defaultVoice.name}` : 'No voices available';
    return message;
}

export function speakWithRandomVoice(text) {
    stopAllSpeech();
    if (!window.faceManager.isReady) return;
    
    const randomVoice = getRandomVoice();
    lastRandomVoice = randomVoice; // Store the last used random voice
    
    window.updateSubtitles(text);
    window.mouthshape(text);
    
    const utterThis = new SpeechSynthesisUtterance(text);
    utterThis.pitch = window.pitch;
    utterThis.rate = window.rate;
    
    if (randomVoice) {
        utterThis.voice = randomVoice;
    }

    window.startHeadAnimation();
    
    utterThis.onend = function() {
        setTimeout(() => window.stopHeadAnimation(), 200);
    };

    window.currentUtterance = utterThis;
    window.synth.speak(utterThis);
}

export function getCurrentVoice() {
    return currentVoice;
}

export function shouldUseRandomVoice() {
    return useRandomVoice;
}