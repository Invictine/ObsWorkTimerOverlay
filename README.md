# OBS Work Timer Overlay

> **Dual-screen synchronized stream stopwatch and transparent OBS browser source.**

[![OBS Timer Preview](docs/media/obs-timer.png)](media/walkthrough.mp4)

*Click the preview card above to watch the stream overlay demo.*

---

## Why I Built This

Streaming deep work or study sessions requires a timer that looks sharp on stream without cluttering your actual workspace. Window-capturing a desktop stopwatch app brings along unwanted window borders, menus, and DPI scaling quirks.

ObsWorkTimerOverlay splits the timer into two parts: an Electron controller window that stays on your secondary monitor, and a pristine, transparent HTML5 browser source that plugs directly into OBS Studio via WebSockets.

## Standout Features

- **Transparent Browser Source:** Beautiful radial progress ring and high-legibility typography designed for 1080p and 4K stream overlays.
- **Zero-Latency WebSocket Sync:** Start, pause, reset, or adjust work/break rounds from the controller with sub-millisecond sync.
- **Configurable Visual Themes:** Customize accent colors, stroke width, and round durations to match your stream branding.

## Visuals

- **OBS Browser Overlay:** `docs/media/obs-timer.png`
- **Recorded Demo:** `media/walkthrough.mp4`

## Setup & OBS Integration

1. Start the local server:
   ```bash
   cd ObsWorkTimerOverlay
   npm install
   npm start
   ```
2. In OBS Studio, add a new **Browser Source**:
   - **URL:** `http://localhost:3000/overlay.html`
   - **Width:** 1920
   - **Height:** 1080
   - Check **Shutdown source when not visible**.
