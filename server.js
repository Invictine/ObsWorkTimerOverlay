const express = require('express');
const http = require('http');
const path = require('path');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const MAX_TIME = 8 * 60 * 60 * 1000; // 8 hours in ms
let startTime = null;
let elapsed = 0;
let isRunning = false;
let timerInterval = null;

app.use(express.static(path.join(__dirname, 'public')));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

io.on('connection', (socket) => {
  socket.emit('timerData', { elapsed, isRunning, maxTime: MAX_TIME });

  socket.on('startStop', () => toggleStartStop());
  socket.on('reset', () => resetTimer());
});

function toggleStartStop() {
  if (!isRunning) {
    startTime = Date.now() - elapsed;
    isRunning = true;
    timerInterval = setInterval(updateTime, 100);
  } else {
    clearInterval(timerInterval);
    isRunning = false;
    elapsed = Date.now() - startTime;
  }
  io.emit('timerData', { elapsed, isRunning, maxTime: MAX_TIME });
}

function resetTimer() {
  clearInterval(timerInterval);
  isRunning = false;
  elapsed = 0;
  startTime = null;
  io.emit('timerData', { elapsed, isRunning, maxTime: MAX_TIME });
}

function updateTime() {
  elapsed = Date.now() - startTime;
  if (elapsed >= MAX_TIME) {
    elapsed = MAX_TIME;
    toggleStartStop();
  }
  io.emit('timerData', { elapsed, isRunning, maxTime: MAX_TIME });
}

server.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});
