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
    // Smooth scroll for Zine down arrow button
    var downArrowBtn = document.getElementById('downArrowZineBtn');
    if (downArrowBtn) {
        downArrowBtn.addEventListener('click', function() {
            var zineSection = document.getElementById('zine-images');
            if (zineSection) {
                zineSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    // Hide arrow if user has passed the beginning of the zine section
    function checkZineArrowVisibility() {
        var arrow = document.getElementById('downArrowZineBtn');
        var zine = document.getElementById('zine-images');
        if (!arrow || !zine) return;
        var zineTop = zine.getBoundingClientRect().top + window.scrollY;
        var scrollY = window.scrollY || window.pageYOffset;
        if (scrollY + 60 >= zineTop) {
            arrow.style.opacity = '0';
            arrow.style.pointerEvents = 'none';
        } else {
            arrow.style.opacity = '1';
            arrow.style.pointerEvents = 'auto';
        }
    }
    window.addEventListener('scroll', checkZineArrowVisibility);
    window.addEventListener('resize', checkZineArrowVisibility);
    document.addEventListener('DOMContentLoaded', checkZineArrowVisibility);
});