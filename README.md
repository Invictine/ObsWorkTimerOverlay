# OBS Work Timer Overlay

Put a running work stopwatch into an OBS scene and show progress toward an eight-hour timer target.

## Add it to an OBS scene

1. Clone or download this repo, install Node.js, then run `npm ci` and `npm start` from the project folder.
2. In OBS, add a **Browser** source and set the URL to `http://localhost:3000`. Size the source to fit your scene.
3. Use **Start / Stop** and **Reset** in the timer window or through **Interact** on the Browser source. All open views share the same timer state while the server runs.

To run the server without the Electron window, use `node server.js` after installing dependencies. The client has on-screen controls. The Electron build registers keyboard shortcuts, but the checked-in build does not wire their events through to the timer controls.

The server has no user login and the timer resets when its process restarts. Use it on a trusted local computer or network.

## Contributing

Questions and improvements are welcome in GitHub issues and pull requests.
