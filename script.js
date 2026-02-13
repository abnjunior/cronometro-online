let startTime = 0;
let elapsedTime = 0;
let timerInterval;
let isRunning = false;

const timeEl = document.getElementById("time");
const msEl = document.querySelector(".ms");
const startPauseBtn = document.getElementById("startPause");
const resetBtn = document.getElementById("reset");
const fullscreenBtn = document.getElementById("fullscreenBtn");
const orbit = document.getElementById("orbit");

function formatTime(ms) {
  const totalMilliseconds = Math.floor(ms);
  const milliseconds = Math.floor((totalMilliseconds % 1000) / 10);

  const totalSeconds = Math.floor(totalMilliseconds / 1000);
  const seconds = totalSeconds % 60;

  const totalMinutes = Math.floor(totalSeconds / 60);
  const minutes = totalMinutes % 60;

  const hours = Math.floor(totalMinutes / 60);

  let display = "";

  if (hours > 0) {
    display =
      String(hours).padStart(2, "0") + ":" +
      String(minutes).padStart(2, "0") + ":" +
      String(seconds).padStart(2, "0");
  } else if (minutes > 0) {
    display =
      String(minutes).padStart(2, "0") + ":" +
      String(seconds).padStart(2, "0");
  } else {
    display = String(seconds);
  }

  return {
    display,
    milliseconds: milliseconds.toString().padStart(2, "0"),
    seconds
  };
}

function update() {
  elapsedTime = Date.now() - startTime;

  const formatted = formatTime(elapsedTime);

  timeEl.innerHTML = `${formatted.display}.<span class="ms">${formatted.milliseconds}</span>`;

  const totalSeconds = elapsedTime / 1000;
  const rotation = (totalSeconds % 60) * 6;
  orbit.style.transform = `rotate(${rotation}deg)`;

  timerInterval = requestAnimationFrame(update);
}

startPauseBtn.addEventListener("click", () => {
  if (!isRunning) {
    startTime = Date.now() - elapsedTime;
    timerInterval = requestAnimationFrame(update);
    startPauseBtn.textContent = "⏸";
    document.body.classList.remove("paused");
    isRunning = true;
  } else {
    cancelAnimationFrame(timerInterval);
    startPauseBtn.textContent = "▶";
    document.body.classList.add("paused");
    isRunning = false;
  }
});

resetBtn.addEventListener("click", () => {
  cancelAnimationFrame(timerInterval);
  elapsedTime = 0;
  orbit.style.transform = "rotate(0deg)";
  timeEl.innerHTML = `0.<span class="ms">00</span>`;
  startPauseBtn.textContent = "▶";
  document.body.classList.remove("paused");
  isRunning = false;
});

/* FULLSCREEN */
fullscreenBtn.addEventListener("click", () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
});

/* ===== MODAL CHANGELOG ===== */

const modal = document.getElementById("modal");
const openChangelog = document.getElementById("openChangelog");
const closeModal = document.getElementById("closeModal");

openChangelog.addEventListener("click", (e) => {
  e.preventDefault();
  modal.classList.add("active");
});

closeModal.addEventListener("click", () => {
  modal.classList.remove("active");
});

/* fechar clicando fora */
modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.classList.remove("active");
  }
});