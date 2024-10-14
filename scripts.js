let breakLength = 5;
let sessionLength = 25;
let isRunning = false;
let isSession = true;
let timer;
let timeLeft = sessionLength * 60;

const breakDecrement = document.getElementById('break-decrement');
const breakIncrement = document.getElementById('break-increment');
const sessionDecrement = document.getElementById('session-decrement');
const sessionIncrement = document.getElementById('session-increment');
const startStopBtn = document.getElementById('start_stop');
const resetBtn = document.getElementById('reset');
const timerLabel = document.getElementById('timer-label');
const timeLeftDisplay = document.getElementById('time-left');
const breakLengthDisplay = document.getElementById('break-length');
const sessionLengthDisplay = document.getElementById('session-length');
const beepSound = document.getElementById('beep'); // Reference the audio element

// Format time (mm:ss)
const formatTime = (time) => {
  let minutes = Math.floor(time / 60);
  let seconds = time % 60;
  return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

// Update timer display
const updateTimerDisplay = () => {
  timeLeftDisplay.textContent = formatTime(timeLeft);
};

// Start and pause the timer
const startStopTimer = () => {
  if (!isRunning) {
    timer = setInterval(countdown, 1000);
    startStopBtn.textContent = 'Pause';
    isRunning = true;
  } else {
    clearInterval(timer);
    startStopBtn.textContent = 'Start';
    isRunning = false;
  }
};

// Reset everything
const resetTimer = () => {
  clearInterval(timer);
  isRunning = false;
  isSession = true;
  breakLength = 5;
  sessionLength = 25;
  timeLeft = sessionLength * 60;
  updateTimerDisplay();
  timerLabel.textContent = 'Session';
  breakLengthDisplay.textContent = breakLength;
  sessionLengthDisplay.textContent = sessionLength;
  startStopBtn.textContent = 'Start';
  beepSound.pause();
  beepSound.currentTime = 0; // Reset beep sound
};

// Countdown logic
const countdown = () => {
  if (timeLeft === 0) {
    beepSound.currentTime = 0; // Ensure sound resets before playing
    beepSound.play().catch(error => { // Handle potential autoplay errors
      console.error('Audio playback error:', error);
    });

    if (isSession) {
      timeLeft = breakLength * 60;
      timerLabel.textContent = 'Break';
    } else {
      timeLeft = sessionLength * 60;
      timerLabel.textContent = 'Session';
    }
    isSession = !isSession;
  } else {
    timeLeft--;
  }
  updateTimerDisplay();
};

// Increment/decrement break length
const adjustBreakLength = (amount) => {
  if (breakLength + amount >= 1 && breakLength + amount <= 60) {
    breakLength += amount;
    breakLengthDisplay.textContent = breakLength;
  }
};

// Increment/decrement session length
const adjustSessionLength = (amount) => {
  if (sessionLength + amount >= 1 && sessionLength + amount <= 60) {
    sessionLength += amount;
    sessionLengthDisplay.textContent = sessionLength;
    timeLeft = sessionLength * 60;
    updateTimerDisplay();
  }
};

// Event listeners
breakDecrement.addEventListener('click', () => adjustBreakLength(-1));
breakIncrement.addEventListener('click', () => adjustBreakLength(1));
sessionDecrement.addEventListener('click', () => adjustSessionLength(-1));
sessionIncrement.addEventListener('click', () => adjustSessionLength(1));
startStopBtn.addEventListener('click', startStopTimer);
resetBtn.addEventListener('click', resetTimer);

// Initial display setup
updateTimerDisplay();