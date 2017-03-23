import electron from "electron";
import path from "path";
import url from "url";

const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const squirrel = require("./squirrelEvents");

// squirrel startup
if(squirrel.handleEvents()) {
  app.quit();
}

let mainWindow;

function createWindow() {

  var path = require("path");

  mainWindow = new BrowserWindow({
    width: 1000,
    height: 600,
    icon: path.join(__dirname, "../resources/app-icons/64.png")
  });

  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, "../resources/index.html"),
    protocol: "file:",
    slashes: true
  }));

  mainWindow.on("closed", () => {
    mainWindow = null;
  });

}

app.on("ready", createWindow);

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
