const MUSIC_FILE = "music/love-song.mp3";

const musicKey = "anniversaryMusic";
let bgMusic = document.getElementById("bgMusic");
let musicBtn = document.getElementById("musicBtn");

if (!bgMusic) {
    bgMusic = document.createElement("audio");
    bgMusic.id = "bgMusic";
    bgMusic.src = MUSIC_FILE;
    bgMusic.loop = true;
    bgMusic.preload = "auto";
    document.body.appendChild(bgMusic);
}

const savedTime =
    Number(localStorage.getItem("anniversaryMusicTime")) || 0;

const wasPlaying =
    localStorage.getItem("anniversaryMusicPlaying") === "true";

function updateMusicButton() {
    if (musicBtn) {
        musicBtn.textContent = bgMusic.paused
            ? "🎵 Play Our Love Song"
            : "⏸️ Pause Our Love Song";
    }
}


bgMusic.addEventListener("loadedmetadata", async function () {
    if (savedTime > 0 && savedTime < bgMusic.duration) {
        bgMusic.currentTime = savedTime;
    }

    if (wasPlaying) {
        try {
            await bgMusic.play();
        } catch (error) {
            console.log("Please tap the music button to continue.");
        }
    }

    updateMusicButton();
});

bgMusic.addEventListener("timeupdate", function () {
    localStorage.setItem(musicKey + "Time", bgMusic.currentTime);
});

bgMusic.addEventListener("play", function () {
    localStorage.setItem(musicKey + "Playing", "true");
    updateMusicButton();
});

bgMusic.addEventListener("pause", function () {
    localStorage.setItem(musicKey + "Time", bgMusic.currentTime);
    localStorage.setItem(musicKey + "Playing", "false");
    updateMusicButton();
});

if (musicBtn) {
    musicBtn.addEventListener("click", async function () {
        if (bgMusic.paused) {
            try {
                await bgMusic.play();
                localStorage.setItem(musicKey + "Playing", "true");
            } catch (error) {
                console.error("Music could not play:", error);
            }
        } else {
            bgMusic.pause();
        }
    });
}

window.addEventListener("pagehide", function () {
    localStorage.setItem("anniversaryMusicTime", bgMusic.currentTime);
    localStorage.setItem(
        "anniversaryMusicPlaying",
        String(!bgMusic.paused)
    );
});

