import electron from "electron";
import path from "path";
import url from "url";
import isDev from "electron-is-dev";
import { getMainWindowPreferences, saveMainWindowPreferences } from "./model/user/main-window";
import { setMainWindow } from "./model/main-window";

import "./model/index";

const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

let mainWindow;
let mainWindowBounds;
let mainWindowMaximized;

function createWindow() {
  getMainWindowPreferences().then(preferences => {

    mainWindow = new BrowserWindow({
      width: preferences.width,
      height: preferences.height,
      x: preferences.x,
      y: preferences.y,
      icon: path.join(__dirname, "./ui/resources/app-icons/64.png"),
      show: false
    });

    setMainWindow(mainWindow);

    mainWindowBounds = mainWindow.getBounds();
    mainWindowMaximized = mainWindow.isMaximized();

    mainWindow.on("resize", updateCachedMainWindowPreferences);
    mainWindow.on("move", updateCachedMainWindowPreferences);
    mainWindow.on("maximize", updateCachedMainWindowPreferences);
    mainWindow.on("unmaximize", updateCachedMainWindowPreferences);

    mainWindow.on("ready-to-show", () => {

      if (preferences.maximize) {
        mainWindow.maximize();
      }

      if (isDev) {
        mainWindow.openDevTools();
      }

      mainWindow.show();
      mainWindow.focus();

    });

    mainWindow.loadURL(url.format({
      pathname: path.join(__dirname, "./ui/index.html"),
      protocol: "file:",
      slashes: true
    }));

    mainWindow.on("closed", () => {
      saveMainWindowPreferences(mainWindowBounds, mainWindowMaximized);
      mainWindow = null;
      setMainWindow(null);
    });

  });
}

function updateCachedMainWindowPreferences() {
  mainWindowBounds = mainWindow.getBounds();
  mainWindowMaximized = mainWindow.isMaximized();
}

app.on("ready", () => createWindow());

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});
