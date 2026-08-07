const { app, BrowserWindow, Tray, Menu, screen, ipcMain, nativeImage } = require("electron");
const path = require("path");

let petWindow = null;
let tray = null;

const PET_SIZE = 200;

function createPetWindow() {
  const { width: screenW, height: screenH } = screen.getPrimaryDisplay().workAreaSize;

  petWindow = new BrowserWindow({
    width: PET_SIZE,
    height: PET_SIZE,
    x: Math.floor(screenW / 2 - PET_SIZE / 2),
    y: screenH - PET_SIZE - 20,
    frame: false,
    transparent: true,
    alwaysOnTop: true,
    resizable: false,
    skipTaskbar: true,
    hasShadow: false,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  petWindow.setVisibleOnAllWorkspaces(true, { visibleOnFullScreen: true });
  petWindow.setIgnoreMouseEvents(false);

  if (process.platform === "darwin") {
    petWindow.setWindowButtonVisibility(false);
  }

  petWindow.loadFile(path.join(__dirname, "index.html"));

  petWindow.on("closed", () => {
    petWindow = null;
  });
}

function createTray() {
  const iconPath = path.join(__dirname, "..", "assets", "icon.png");
  let trayIcon;
  try {
    trayIcon = nativeImage.createFromPath(iconPath).resize({ width: 16, height: 16 });
  } catch {
    trayIcon = nativeImage.createEmpty();
  }

  tray = new Tray(trayIcon);
  const contextMenu = Menu.buildFromTemplate([
    {
      label: "Show Clawd",
      click: () => {
        if (petWindow) {
          petWindow.show();
          petWindow.focus();
        }
      },
    },
    { type: "separator" },
    {
      label: "Reset Position",
      click: () => {
        if (petWindow) {
          const { width: sw, height: sh } = screen.getPrimaryDisplay().workAreaSize;
          petWindow.setPosition(
            Math.floor(sw / 2 - PET_SIZE / 2),
            sh - PET_SIZE - 20
          );
        }
      },
    },
    { type: "separator" },
    {
      label: "Quit",
      click: () => {
        app.quit();
      },
    },
  ]);

  tray.setToolTip("Clawd Desktop Pet");
  tray.setContextMenu(contextMenu);
}

app.whenReady().then(() => {
  createPetWindow();
  createTray();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

app.on("activate", () => {
  if (!petWindow) createPetWindow();
});

ipcMain.on("drag-start", (event, { dx, dy }) => {
  if (!petWindow) return;
  const [x, y] = petWindow.getPosition();
  petWindow.setPosition(x + dx, y + dy);
});

ipcMain.on("get-cursor-pos", (event) => {
  const cursor = screen.getCursorScreenPoint();
  const [wx, wy] = petWindow.getPosition();
  const [ww, wh] = petWindow.getSize();
  event.returnValue = {
    x: cursor.x - wx - ww / 2,
    y: cursor.y - wy - wh / 2,
  };
});

ipcMain.on("set-ignore-mouse", (event, ignore) => {
  if (petWindow) {
    petWindow.setIgnoreMouseEvents(ignore, { forward: true });
  }
});
