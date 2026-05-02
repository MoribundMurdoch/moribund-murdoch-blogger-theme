/* ============================================================
   music-player.js — moribund-murdoch-blogger-theme
   - Play/pause toggle for footer music player
   ============================================================ */

(function () {
  document.addEventListener('DOMContentLoaded', function () {

    const player  = document.getElementById('music-player');
    const playBtn  = document.getElementById('play-button');
    const pauseBtn = document.getElementById('pause-button');

    if (!player || !playBtn || !pauseBtn) return;

    playBtn.addEventListener('click', function () {
      player.play();
      playBtn.style.display  = 'none';
      pauseBtn.style.display = 'inline-block';
    });

    pauseBtn.addEventListener('click', function () {
      player.pause();
      pauseBtn.style.display = 'none';
      playBtn.style.display  = 'inline-block';
    });

  });
})();
