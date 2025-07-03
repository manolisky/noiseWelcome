// document.addEventListener('DOMContentLoaded', function() {
//     var audio = new Audio('sounds/storm.mp3');
//     document.body.addEventListener('click', function() {
//         audio.play();
//     }, { once: true });
// });

document.addEventListener('DOMContentLoaded', function () {
    // Welcome sound logic (use the audio element in the DOM)
    const audio = document.getElementById('storm');
    let played = false;

    // Background video logic
    const video = document.getElementById('backgroundVideo');
    if (video) {
        video.src = 'mov/trimmed_output_vp9_silent.webm';
        video.load();
        video.playbackRate = 0.5;
        video.muted = true;
        video.autoplay = false;
        video.playsInline = true;
        video.loop = true;
    }

    // Trigger both audio and video on first user interaction
    const playOnceBoth = () => {
        if (played) return;
        played = true;
    if (audio) {
        audio.loop = true;
        audio.muted = false;
        audio.currentTime = 0;
        audio.play().catch((e) => { console.warn('Audio play failed', e); });
    }
        if (video) {
            video.playbackRate = 0.5;
            video.currentTime = 0.05;
            video.play().catch(() => {});
        }
    };
    // Use only user-activation events (no scroll) for reliable audio/video trigger
    ['pointerdown', 'click', 'touchstart', 'keydown'].forEach(evt => {
        window.addEventListener(evt, playOnceBoth, { once: true });
    });
});