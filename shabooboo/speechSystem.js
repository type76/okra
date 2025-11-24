import { getRandomVoice, getCurrentVoice, shouldUseRandomVoice } from './voiceManager.js';

export const synth = window.speechSynthesis;
export let currentUtterance = null;
export let lipSyncTimeouts = [];
export let sentenceQueue = [];
export let currentSentenceIndex = 0;

export function stopAllSpeech() {
    synth.cancel();
    currentUtterance = null;
    lipSyncTimeouts.forEach(timeout => clearTimeout(timeout));
    lipSyncTimeouts.length = 0; // Clear array instead of reassigning
    sentenceQueue.length = 0;
    currentSentenceIndex = 0;
    if (typeof window.stopHeadAnimation === 'function') {
        window.stopHeadAnimation();
    }
    clearSubtitles();
    if (window.faceManager && window.faceManager.isReady) {
        setTimeout(() => window.faceManager.setFace('1'), 100);
    }
}

export function splitIntoSentences(story) {
    return story.split(/(?<=[.!?])\s+/).filter(sentence => sentence.trim().length > 0);
}

export function updateSubtitles(text, highlightedWord = '') {
    const subtitles = document.getElementById('subtitles');
    if (!subtitles) return;
    
    if (highlightedWord) {
        subtitles.innerHTML = `<span class="highlight">${highlightedWord}</span>`;
        if (typeof window.mouthshape === 'function') {
            window.mouthshape(highlightedWord);
        }
    } else {
        subtitles.textContent = text;
    }
}

export function clearSubtitles() {
    const subtitles = document.getElementById('subtitles');
    if (subtitles) {
        subtitles.textContent = '';
    }
}

export function sayStory() {
    stopAllSpeech();
    if (!window.faceManager || !window.faceManager.isReady) return;
    
    const fullStory = generateKidsStory();
    const sentences = splitIntoSentences(fullStory);
    
    if (sentences.length > 0) {
        sentenceQueue.length = 0;
        sentenceQueue.push(...sentences);
        currentSentenceIndex = 0;
        speakNextSentence();
    }
}

export function speakNextSentence() {
    if (currentSentenceIndex >= sentenceQueue.length) {
        clearSubtitles();
        return;
    }
    
    const sentence = sentenceQueue[currentSentenceIndex].trim();
    if (sentence) {
        updateSubtitles(sentence);
        spk(sentence, false, () => {
            currentSentenceIndex++;
            setTimeout(speakNextSentence, 800);
        });
    }
}

export function spk(text, isSingleWord = false, onEndCallback = null) {
    stopAllSpeech();
    
    if (typeof window.mouthshape === 'function') {
        window.mouthshape(text);
    }

    const utterThis = new SpeechSynthesisUtterance(text);
    utterThis.pitch = window.pitch || 1.2;
    utterThis.rate = window.rate || 0.85;
    
    // Use current voice setting
    const useRandom = shouldUseRandomVoice();
    let voiceToUse = getCurrentVoice();
    
    if (useRandom && !voiceToUse) {
        voiceToUse = getRandomVoice();
    }
    
    if (voiceToUse) {
        utterThis.voice = voiceToUse;
    } else {
        // Fallback to default voice
        const voices = speechSynthesis.getVoices();
        const defaultVoice = voices.find(voice => 
            voice.name.toLowerCase().includes('tessa') || 
            voice.name.toLowerCase().includes('female')
        ) || (voices.length > 0 ? voices[0] : null);
        if (defaultVoice) utterThis.voice = defaultVoice;
    }

    if (!isSingleWord) {
        addWordHighlighting(text, utterThis);
    }

    if (typeof window.startHeadAnimation === 'function') {
        window.startHeadAnimation();
    }
    
    utterThis.onend = function() {
        setTimeout(() => {
            if (typeof window.stopHeadAnimation === 'function') {
                window.stopHeadAnimation();
            }
            if (onEndCallback) onEndCallback();
        }, 200);
    };

    utterThis.onerror = function() {
        if (typeof window.stopHeadAnimation === 'function') {
            window.stopHeadAnimation();
        }
        if (onEndCallback) onEndCallback();
    };

    currentUtterance = utterThis;
    synth.speak(utterThis);
}

export function addWordHighlighting(fullText, utterance) {
    const words = fullText.split(/\s+/);
    let currentWordIndex = 0;

    utterance.onboundary = function(event) {
        if (event.name === 'word' && currentWordIndex < words.length) {
            const currentWord = words[currentWordIndex].replace(/[.,]/g, '');
            updateSubtitles('', currentWord);
            currentWordIndex++;
        }
    };
}