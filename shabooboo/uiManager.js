export function setupUIEvents() {
    // Name setting
    document.getElementById("makename").addEventListener("click", function() {
        const name = document.getElementById("textinput").value;
        window.kName = name;
        const message = `name set to ${name}`;
        window.stopAllSpeech();
        if (!window.faceManager.isReady) return;
        window.updateSubtitles(message);
        window.spk(message, true);
        setTimeout(() => window.subtitles.innerHTML = '', 2000);
    });

    // Button creation
    document.getElementById("makebtn").addEventListener("click", function() {
        const text = document.getElementById("textinput").value;
        const button = document.createElement("button");
        button.innerHTML = text;
        document.getElementById("sayit").appendChild(button);
    });

    // Look at toggle
    window.looknormal = false;
    document.getElementById("lookat").addEventListener("click", function() {
        this.classList.toggle('on');
        window.looknormal = !this.classList.contains('on');
    });


    // nod
    window.nodding = false;
    document.getElementById("nod").addEventListener("click", function() {
        nodding = true;
        setTimeout(() => nodding = false, 2000);
    });


    // Random voice button
    document.getElementById("randomVoiceBtn").addEventListener("click", function() {
        const phrases = [
            "Hello there!", "What a wonderful day!", "I have a random voice!",
            "Listen to me speak!", "How do I sound today?"
        ];
        const randomPhrase = phrases[Math.floor(Math.random() * phrases.length)];
        window.speakWithRandomVoice(randomPhrase);
    });

    // Set voice button
    document.getElementById("setVoice").addEventListener("click", function() {
        const message = window.setRandomVoice();
        window.updateSubtitles(message);
        window.spk(message, true);
    });

    // Fullscreen functionality
    document.getElementById("fullscn").addEventListener("click", function() {
        this.classList.toggle('on');
        if (this.classList.contains('on')) {
            openFullscreen();
        } else {
            closeFullscreen();
        }
    });

    // Navigation
    document.getElementById("menuicon").addEventListener("click", function() {
        this.classList.toggle('on');
        const hud = document.getElementById('hud');
        hud.classList.toggle('hide');
    });

    // Story button
    document.querySelector('#story').addEventListener('click', window.sayStory);

    // Sayit buttons
    document.getElementById("sayit").addEventListener("click", function(e) {
        if(e.target && e.target.nodeName == "BUTTON") {
            window.stopAllSpeech();
            if (!window.faceManager.isReady) return;
            const text = e.target.innerHTML;
            window.spk(text, true);
            window.subtitles.innerHTML = text;
        }
    });
}

function openFullscreen() {
    const elem = document.documentElement;
    if (elem.requestFullscreen) elem.requestFullscreen();
    else if (elem.webkitRequestFullscreen) elem.webkitRequestFullscreen();
    else if (elem.msRequestFullscreen) elem.msRequestFullscreen();
}

function closeFullscreen() {
    if (document.exitFullscreen) document.exitFullscreen();
    else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
    else if (document.msExitFullscreen) document.msExitFullscreen();
}