import electron, { dialog } from "electron";
import path from "path";
import url from "url";
import isDev from "electron-is-dev";
import { getMainWindowPreferences, saveMainWindowPreferences } from "./model/user/main-window";
import { setMainWindow } from "./model/main-window";
import { getConnection, setConnection } from "./model/stories/connection";
import { closeStory } from "./model/stories/close";

import "./model/index";

const app = electron.app;

if(require("electron-squirrel-startup")) {
  app.quit();
}


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

      if (preferences.maximized) {
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

    mainWindow.on("close", event => {

      const options = {
        type: "question",
        title: "Plotify beenden",
        message: "Möchtest du Plotify wirklich beenden?",
        buttons: ["Plotify beenden", "Abbrechen"],
        defaultId: 0,
        cancelId: 1
      };

      const result = dialog.showMessageBox(mainWindow, options);
      
      if (result === 1) {
        event.preventDefault();
      }

    });

    mainWindow.on("closed", () => {
      saveMainWindowPreferences(mainWindowBounds, mainWindowMaximized);
      mainWindow = null;
      setMainWindow(null);
    });

  });
}

function updateCachedMainWindowPreferences() {
  if (!mainWindow.isMaximized()) {
    mainWindowBounds = mainWindow.getBounds();
  }
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

const waitInSeconds = 5;
let quitAfterWait = false;
app.on("will-quit", (event) => {
  if (!quitAfterWait) {

    console.log("Wait ", waitInSeconds, " seconds before the application exits...");
    event.preventDefault();

    setTimeout(() => {

      quitAfterWait = true;

      if (getConnection() !== null) {
        closeStory()
          .then(() => { app.quit(); })
          .catch(() => {
            setConnection(null);
            app.quit();
          });
      } else {
        app.quit();
      }

    }, waitInSeconds * 1000);
  }
});

app.on("quit", () => {
  console.log("Exit application.");
});
