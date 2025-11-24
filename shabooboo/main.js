import * as THREE from "three";
import { setupUIEvents } from './uiManager.js';
import { setDefaultVoice, speakWithRandomVoice, setRandomVoice } from './voiceManager.js';
import { 
    stopAllSpeech, updateSubtitles, clearSubtitles, sayStory, spk,
    synth, currentUtterance, lipSyncTimeouts, sentenceQueue, currentSentenceIndex
} from './speechSystem.js';

// Initialize global variables first
window.num = 0;
window.speed = 70;
window.rate = 0.85;
window.pitch = 1.2;
window.looknormal = false;

// Make speech system functions globally available
Object.assign(window, {
    stopAllSpeech,
    updateSubtitles, 
    clearSubtitles,
    sayStory,
    spk,
    synth,
    currentUtterance,
    lipSyncTimeouts,
    sentenceQueue, 
    currentSentenceIndex,
    speakWithRandomVoice,
    setRandomVoice
});

// Animation system - RESTORED HEAD MOVEMENT
window.isSpeaking = false;
window.speechAnimationTime = 0;
window.headBobOffset = Math.random() * Math.PI * 2;
window.headTiltOffset = Math.random() * Math.PI * 2;
window.earWiggleOffset = Math.random() * Math.PI * 2;
window.animationIntensity = 0;

window.HEAD_BOB_SPEED = 0.2;
window.HEAD_TILT_SPEED = 0.07;
window.EAR_WIGGLE_SPEED = 0.15;

window.startHeadAnimation = function() {
    window.isSpeaking = true;
    window.animationIntensity = 0.4;
    window.speechAnimationTime = 0;
};

window.stopHeadAnimation = function() {
    window.isSpeaking = false;
    const reduceIntensity = () => {
        window.animationIntensity *= 0.9;
        if (window.animationIntensity > 0.01) {
            requestAnimationFrame(reduceIntensity);
        } else {
            window.animationIntensity = 0;
            resetToNeutral();
        }
    };
    reduceIntensity();
};

function resetToNeutral() {
    if (window.character) {
        window.character.position.y = 0;
    }
    
    if (window.head) {
        window.head.rotation.z = 0;
    }
    
    if (window.ear && window.ear2) {
        window.ear.rotation.x = 0.1;
        window.ear.rotation.z = 0;
        window.ear2.rotation.x = -0.05;
        window.ear2.rotation.z = 0;
        window.ear.position.y = 0.7;
        window.ear2.position.y = 0.7;
    }
}

window.updateHeadAnimation = function() {
    if (!window.isSpeaking && window.animationIntensity === 0) return;
    
    window.headBobOffset += window.HEAD_BOB_SPEED;
    window.headTiltOffset += window.HEAD_TILT_SPEED;
    window.earWiggleOffset += window.EAR_WIGGLE_SPEED;
    
    if (window.isSpeaking && window.character && window.head && window.ear && window.ear2) {
        const bobY = Math.sin(window.headBobOffset) * 0.03 * window.animationIntensity;
        const tiltZ = Math.sin(window.headTiltOffset) * 0.1 * window.animationIntensity;
        
        window.character.position.y = bobY;
        window.head.rotation.z = tiltZ;
        
        const earWiggle1 = Math.sin(window.earWiggleOffset) * 0.08 * window.animationIntensity;
        const earWiggle2 = Math.sin(window.earWiggleOffset + 1.5) * 0.06 * window.animationIntensity;
        const earTilt1 = Math.sin(window.earWiggleOffset * 0.8) * 0.1 * window.animationIntensity;
        const earTilt2 = Math.sin(window.earWiggleOffset * 0.8 + 1.2) * 0.08 * window.animationIntensity;
        
        window.ear.rotation.x = 0.1 + earTilt1;
        window.ear.rotation.z = earWiggle1;
        window.ear2.rotation.x = -0.05 + earTilt2;
        window.ear2.rotation.z = earWiggle2;
        
        window.ear.position.y = 0.7 + Math.sin(window.earWiggleOffset * 0.5) * 0.02 * window.animationIntensity;
        window.ear2.position.y = 0.7 + Math.sin(window.earWiggleOffset * 0.5 + 0.8) * 0.015 * window.animationIntensity;
    }
};

// Three.js scene setup
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x101010);

let raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();

const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(4, 0, 0);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
THREE.ColorManagement.workingColorSpace = THREE.SRGBColorSpace;

const ambient = new THREE.AmbientLight(0xcccccc, 1);
const dirLight = new THREE.DirectionalLight(0xffffff, 0.5);
dirLight.position.set(5, 10, 7);
dirLight.castShadow = true;
scene.add(ambient, dirLight);

const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(10, 10, 1, 1),
    new THREE.MeshBasicMaterial({ transparent: true, opacity: 0 })
);
plane.rotation.y = Math.PI / 2;
plane.position.x = 1;
scene.add(plane);

const mouseMesh = new THREE.Group();
mouseMesh.position.x = 1;
scene.add(mouseMesh);

const lerpedcursor = new THREE.Group();
lerpedcursor.position.x = 1;
scene.add(lerpedcursor);

const character = new THREE.Group();
scene.add(character);
window.character = character;

// Face manager setup
const faces = [
    {"n":"0", "col":"sm-face-clean.png", "bump":"sm-facebmp-clean.png"},
    {"n":"1", "col":"sm-face.png", "bump":"sm-facebmp.png"},
    {"n":"2", "col":"sm-faceblink.png", "bump":"sm-facebmp.png"},            
    {"n":"3", "col":"sm-face-A.png", "bump":"sm-facebmp-A.png"},
    {"n":"4", "col":"sm-face-aaa.png", "bump":"sm-facebmp-aaa.png"}, 
    {"n":"5", "col":"sm-face-E.png", "bump":"sm-facebmp-E.png"},
    {"n":"6", "col":"sm-face-L.png", "bump":"sm-facebmp-L.png"},            
    {"n":"7", "col":"sm-face-oo.png", "bump":"sm-facebmp-oo.png"},           
    {"n":"8", "col":"sm-face-M.png", "bump":"sm-facebmp-M.png"},
    {"n":"9", "col":"sm-face-F.png", "bump":"sm-facebmp-F.png"}
];

class FaceManager {
    constructor() {
        this.textures = {};
        this.currentFace = '0';
        this.isReady = false;
        this.textureLoader = new THREE.TextureLoader();
    }
    
    async init() {
        await this.preloadTextures();
        this.isReady = true;
    }
    
    async preloadTextures() {
        const loadPromises = faces.map(async (face) => {
            const [col, bump] = await Promise.all([
                this.loadTexture(face.col),
                this.loadTexture(face.bump)
            ]);
            this.texfix(col);
            this.texfix(bump);
            return { n: face.n, col, bump };
        });
        
        const loaded = await Promise.all(loadPromises);
        loaded.forEach(texture => {
            this.textures[texture.n] = texture;
        });
    }
    
    loadTexture(url) {
        return new Promise((resolve, reject) => {
            this.textureLoader.load(url, resolve, undefined, reject);
        });
    }
    
    texfix(texture) {
        texture.magFilter = texture.minFilter = THREE.NearestFilter;
    }
    
    setFace(faceIndex) {
        if (!this.isReady) return;
        const face = this.textures[faceIndex];
        if (face && this.currentFace !== faceIndex) {
            head.material.map = face.col;
            head.material.displacementMap = face.bump;
            head.material.needsUpdate = true;
            this.currentFace = faceIndex;
        }
    }
}

const faceManager = new FaceManager();
window.faceManager = faceManager;

const head = new THREE.Mesh(
    new THREE.SphereGeometry(1, 256, 256),
    new THREE.MeshStandardMaterial({
        metalness: 0.01,
        roughness: 0.9,
        map: new THREE.TextureLoader().load("sm-face-clean.png"),
        displacementMap: new THREE.TextureLoader().load("sm-facebmp-clean.png"),
        roughnessMap: new THREE.TextureLoader().load("sm-facerough.png"),
        displacementScale: -1,
    })
);
head.scale.x = 0.8;
head.scale.y = 0.9;
head.rotation.y = -Math.PI / 2;
character.add(head);
camera.lookAt(head.position);
window.head = head;

const earGeometry = new THREE.SphereGeometry(0.3, 8, 12);
const earMaterial = new THREE.MeshStandardMaterial({
    map: new THREE.TextureLoader().load("v.png"),
    displacementMap: new THREE.TextureLoader().load("bmp.png"),
    displacementScale: -0.1,
});

const ear = new THREE.Mesh(earGeometry, earMaterial);
ear.position.set(-0.05, 0.7, 0.35);
ear.rotation.set(0.1, 0, 0);
ear.scale.set(0.5, 1.7, 0.6);
head.add(ear);

const ear2 = ear.clone();
ear2.rotation.set(-0.05, 0, -0.1);
ear2.position.set(-0.1, 0.7, -0.35);
head.add(ear2);

window.ear = ear;
window.ear2 = ear2;

// Lip sync functions
const phonemeMap = {
    'silence': '0', ' ': '0', '.': '0', ',': '0',
    'a': '3', 'A': '3', 'i': '5', 'I': '5', 'y': '5', 'e': '5', 'E': '5',
    'o': '7', 'O': '7', 'u': '7', 'U': '7', 'w': '7', 'q': '7',
    'm': '8', 'M': '8', 'b': '8', 'B': '8', 'p': '8',
    'f': '9', 'F': '9', 'v': '9', 'V': '9',
    'l': '6', 'L': '6', 'n': '5', 'N': '5', 'd': '5', 'D': '5', 't': '4', 'T': '4',
    's': '5', 'S': '5', 'z': '5', 'Z': '5', 'c': '5', 'C': '5',
    'g': '3', 'G': '3', 'k': '3', 'K': '3', 'h': '5', 'H': '5', 'r': '7', 'R': '7',
    'default': '0'
};

window.mouthshape = function(text) {
    if (!faceManager.isReady) return;
    
    // Clear existing timeouts by clearing the array
    lipSyncTimeouts.forEach(timeout => clearTimeout(timeout));
    lipSyncTimeouts.length = 0;
    
    window.startHeadAnimation();
    faceManager.setFace('1');
    
    for (let i = 0, len = text.length; i < len; i++) {
        const timeout = setTimeout(() => {
            const faceIndex = phonemeMap[text[i]] || phonemeMap.default;
            faceManager.setFace(faceIndex);
        }, window.speed * i);
        lipSyncTimeouts.push(timeout);
    }
    
    const endTimeout = setTimeout(() => faceManager.setFace('1'), window.speed * text.length + 200);
    lipSyncTimeouts.push(endTimeout);
};

// Event listeners
document.addEventListener("pointermove", (event) => {
    if (window.looknormal) return;

    pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
    pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(pointer, camera);
    const intersects = raycaster.intersectObject(plane, true);
    if (intersects.length > 0) {
        mouseMesh.position.z = intersects[0].point.z;
        mouseMesh.position.y = intersects[0].point.y;
    }
});

document.addEventListener("pointerdown", () => {
    if (!faceManager.isReady) return;
    faceManager.setFace('2');
    const rnd = Math.floor(Math.random() * 10) * 50;
    if (rnd !== 0) {
        setTimeout(() => faceManager.setFace('1'), rnd);
    }
});


function animate() {
    num++;
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    
    // UPDATE HEAD ANIMATION - This was missing!
    if (typeof window.updateHeadAnimation === 'function') {
        window.updateHeadAnimation();
    }
    


    if (window.looknormal) {
        lerpedcursor.position.y += (0.4 - lerpedcursor.position.y) * 0.2;
        lerpedcursor.position.z += (0 - lerpedcursor.position.z) * 0.2;
    } else {
        lerpedcursor.position.y += (mouseMesh.position.y - lerpedcursor.position.y) * 0.2;
        lerpedcursor.position.z += (mouseMesh.position.z - lerpedcursor.position.z) * 0.2;
    }

    if (window.nodding) {
        lerpedcursor.position.y += (Math.sin(num/7) - lerpedcursor.position.y) * 0.2;
    }


    character.lookAt(lerpedcursor.position);
    
    if (Math.random() > 0.995 && faceManager.isReady) {
        faceManager.setFace('2');
        setTimeout(() => faceManager.setFace('1'), 100);
    }
}

window.addEventListener("resize", () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});

// Initialize
window.speechSynthesis.onvoiceschanged = function() {
    const message = setDefaultVoice();
    updateSubtitles(message);
    spk(message, true);
};

// Start everything
setupUIEvents();
faceManager.init().then(() => {
    animate();
});