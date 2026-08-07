const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  dragStart: (delta) => ipcRenderer.send("drag-start", delta),
  getCursorPos: () => ipcRenderer.sendSync("get-cursor-pos"),
  setIgnoreMouse: (ignore) => ipcRenderer.send("set-ignore-mouse", ignore),
  openGamePanel: () => ipcRenderer.send("open-game-panel"),
  setPetAnimation: (state) => ipcRenderer.send("set-pet-animation", state),
  onAnimationCommand: (cb) =>
    ipcRenderer.on("set-animation", (_, state) => cb(state)),
  onUserTyping: (cb) => ipcRenderer.on("user-typing", (_, data) => cb(data)),
  onGameStateUpdate: (cb) =>
    ipcRenderer.on("game-state-update", (_, data) => cb(data)),
  getGameState: () => ipcRenderer.invoke("get-game-state"),
});
