const { app, BrowserWindow, globalShortcut } = require('electron');
const { exec } = require('child_process');

let win;

app.whenReady().then(() => {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: { nodeIntegration: false }
  });

  win.loadURL('http://localhost:3000');

  // Start the Express server
  exec('node server.js', (error, stdout, stderr) => {
    if (error) console.error(`Error: ${error.message}`);
    if (stderr) console.error(`Stderr: ${stderr}`);
    console.log(`Server Output: ${stdout}`);
  });

  // Global Hotkeys
  globalShortcut.register('Control+Alt+S', () => {
    console.log('Start/Stop hotkey pressed');
    win.webContents.send('hotkey', 'startStop');
  });

  globalShortcut.register('Control+Alt+R', () => {
    console.log('Reset hotkey pressed');
    win.webContents.send('hotkey', 'reset');
  });

  console.log('Hotkeys Registered: CTRL+ALT+S (Start/Stop), CTRL+ALT+R (Reset)');
});

app.on('will-quit', () => {
  globalShortcut.unregisterAll();
});
