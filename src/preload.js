const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  dragStart: (delta) => ipcRenderer.send("drag-start", delta),
  getCursorPos: () => ipcRenderer.sendSync("get-cursor-pos"),
  setIgnoreMouse: (ignore) => ipcRenderer.send("set-ignore-mouse", ignore),
});
