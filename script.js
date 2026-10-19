const planetField = document.getElementById('heartPlanets');
const colors = ['#ff77c8','#8be9ff','#b68aff','#ffbd78','#6c9dff','#f48cff'];
// Coordinates trace a heart curve, giving the planets a heart-shaped constellation.
for (let i = 0; i < 42; i++) {
  const t = Math.PI * 2 * i / 42;
  const x = 50 + 37 * Math.pow(Math.sin(t), 3);
  const y = 48 - (30 * Math.cos(t) - 12 * Math.cos(2*t) - 5 * Math.cos(3*t) - 2 * Math.cos(4*t)) / 1.7;
  const p = document.createElement('span');
  p.className = 'mini-planet';
  p.style.setProperty('--x', `${x}%`);
  p.style.setProperty('--y', `${y}%`);
  p.style.setProperty('--size', `${8 + (i % 5) * 3}px`);
  p.style.setProperty('--color', colors[i % colors.length]);
  p.style.setProperty('--depth', `${(i % 7) * 8}px`);
  p.style.setProperty('--duration', `${2.5 + (i % 6) * .55}s`);
  p.style.setProperty('--delay', `${-(i % 8) * .35}s`);
  planetField.appendChild(p);
}

const audio = document.getElementById('bgMusic');
const toggle = document.getElementById('musicToggle');
const statusText = document.getElementById('musicStatus');

async function playMusic() {
  try {
    await audio.play();
    toggle.textContent = 'Ⅱ';
    toggle.setAttribute('aria-label', 'Tạm dừng nhạc');
    statusText.textContent = 'Đang phát nhạc nền';
  } catch (e) {
    toggle.textContent = '▶';
    statusText.textContent = 'Chạm nút ▶ để nghe nhạc';
  }
}
toggle.addEventListener('click', async () => {
  if (audio.paused) {
    await playMusic();
  } else {
    audio.pause();
    toggle.textContent = '▶';
    toggle.setAttribute('aria-label', 'Phát nhạc');
    statusText.textContent = 'Nhạc đang tạm dừng';
  }
});
// Thử tự phát khi mở trang. Trình duyệt có thể yêu cầu người dùng chạm nút.
window.addEventListener('load', playMusic);
