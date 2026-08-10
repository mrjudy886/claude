const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  getGameState: () => ipcRenderer.invoke("get-game-state"),
  saveGameState: (state) => ipcRenderer.send("save-game-state", state),
  loadPanelState: () => ipcRenderer.invoke("load-panel-state"),
  savePanelState: (state) => ipcRenderer.invoke("save-panel-state", state),
  setPetAnimation: (state) => ipcRenderer.send("set-pet-animation", state),
  onGameStateUpdate: (cb) =>
    ipcRenderer.on("game-state-update", (_, data) => cb(data)),
  closePanel: () => ipcRenderer.send("close-game-panel"),
  minimizePanel: () => ipcRenderer.send("minimize-game-panel"),
});
