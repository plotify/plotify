/* jslint browser: true */

const packageJson = require("./package.json");
const remote = require("electron").remote;
const autoUpdater = remote.autoUpdater;

autoUpdater.on("update-availabe", () => {
  console.log("update available");
});

autoUpdater.on("checking-for-update", () => {
  console.log("checking-for-update");
});

autoUpdater.on("update-not-available", () => {
  console.log("update-not-available");
});

autoUpdater.on("update-downloaded", (e) => {
  console.log(e);
  window.alert("Die neue Version von " + packageJson.productName + " ist " +
  "verfügbar und wird nun installiert.");
    autoUpdater.quitAndInstall();
});

autoUpdater.on("error", function() {
    console.log(arguments);
    window.alert("Leider konnten wir keine Verbindung zu unserem " +
    "Update-Server herstellen.");
  });

autoUpdater.setFeedURL("http://alpha.suhail.uberspace.de:80/releases/plotify/");
autoUpdater.checkForUpdates();

window.autoUpdater = autoUpdater;
