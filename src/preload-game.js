const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  getGameState: () => ipcRenderer.invoke("get-game-state"),
  saveGameState: (state) => ipcRenderer.send("save-game-state", state),
  setPetAnimation: (state) => ipcRenderer.send("set-pet-animation", state),
  onGameStateUpdate: (cb) =>
    ipcRenderer.on("game-state-update", (_, data) => cb(data)),
  earnCoins: (amount) => ipcRenderer.invoke("earn-coins", amount),
  spendCoins: (amount) => ipcRenderer.invoke("spend-coins", amount),
  useItem: (itemId) => ipcRenderer.invoke("use-item", itemId),
  buyItem: (itemId) => ipcRenderer.invoke("buy-item", itemId),
  sellItem: (itemId) => ipcRenderer.invoke("sell-item", itemId),
  plantSeed: (plotIndex, seedId) =>
    ipcRenderer.invoke("plant-seed", plotIndex, seedId),
  waterPlot: (plotIndex) => ipcRenderer.invoke("water-plot", plotIndex),
  harvestPlot: (plotIndex) => ipcRenderer.invoke("harvest-plot", plotIndex),
  getAchievements: () => ipcRenderer.invoke("get-achievements"),
  gameWon: (coins) => ipcRenderer.invoke("game-won", coins),
  gameLost: () => ipcRenderer.invoke("game-lost"),
  closePanel: () => ipcRenderer.send("close-game-panel"),
  minimizePanel: () => ipcRenderer.send("minimize-game-panel"),
});
