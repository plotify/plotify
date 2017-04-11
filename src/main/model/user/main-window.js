import path from "path";
import fs from "mz/fs";
import app from "../../shared/commons/app";

const directory = app.getPath("userData");
const file = path.join(directory, "main-window.json");
const charset = "utf-8";

export function getMainWindowPreferences() {
  return new Promise((resolve, reject) => {
    loadMainWindowPreferences()
      .then(preferences => resolve(preferences))
      .catch(error => resolve(getDefaultMainWindowPreferences()));
  });
}

function loadMainWindowPreferences() {
  return new Promise((resolve, reject) => {
    fs.readFile(file, charset)
      .then(data => parseMainWindowPreferences(data))
      .then(json => resolve(json))
      .catch(error => reject(error));
  });
}

function parseMainWindowPreferences(data) {
  return new Promise((resolve, reject) => {

    const json = JSON.parse(data);

    if (hasValidWidth(json) && hasValidHeight(json) &&
        hasValidPositionX(json) && hasValidPositionY(json)) {
      resolve(json);
    } else {
      reject();
    }

  });
}

function hasValidWidth(json) {
  return json.hasOwnProperty("width") && Number.isInteger(json.width) && json.width > 0;
}

function hasValidHeight(json) {
  return json.hasOwnProperty("height") && Number.isInteger(json.height) && json.height > 0;
}

function hasValidPositionX(json) {
  return json.hasOwnProperty("x") && Number.isInteger(json.x);
}

function hasValidPositionY(json) {
  return json.hasOwnProperty("y") && Number.isInteger(json.y);
}

function hasValidMaximize(json) {
  return json.hasOwnProperty("maximize") && typeof json.maximize === "boolean";
}

function getDefaultMainWindowPreferences() {
  return {
    width: 1000,
    height: 600,
    x: undefined,
    y: undefined,
    maximized: true
  };
}

export function saveMainWindowPreferences(bounds, maximized) {

  const preferences = {
    width: bounds.width,
    height: bounds.height,
    x: bounds.x,
    y: bounds.y,
    maximized: maximized
  };

  if (fs.existsSync(file)) {
    fs.truncateSync(file, 0);
  }

  fs.writeFileSync(file, JSON.stringify(preferences));

}
