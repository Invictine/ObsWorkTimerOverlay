const socket = io();
const stopwatchTime = document.getElementById('stopwatch-time');
const progressBar = document.getElementById('progress-bar');
const btnStartStop = document.getElementById('btnStartStop');
const btnReset = document.getElementById('btnReset');

let elapsed = 0;
let maxTime = 8 * 60 * 60 * 1000; // 8 hours
let isRunning = false;

// Listen for data from the server
socket.on('timerData', (data) => {
  elapsed = data.elapsed;
  isRunning = data.isRunning;
  maxTime = data.maxTime;
  updateDisplay();
});

// Update the display
function updateDisplay() {
  const totalSeconds = Math.floor(elapsed / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  // Format time as HH:MM:SS
  stopwatchTime.textContent = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  // Update progress bar
  const percentage = Math.min(100, (elapsed / maxTime) * 100);
  progressBar.style.width = `${percentage}%`;
}

// ✅ Fix: Attach event listeners for button clicks
btnStartStop.addEventListener('click', () => {
  console.log("Start/Stop button clicked"); // Debugging
  socket.emit('startStop');
});

btnReset.addEventListener('click', () => {
  console.log("Reset button clicked"); // Debugging
  socket.emit('reset');
});

// ✅ Fix: Handle hotkey events from Electron
window.electronAPI?.onHotkey((event, action) => {
  if (action === 'startStop') {
    socket.emit('startStop');
  } else if (action === 'reset') {
    socket.emit('reset');
  }
});
