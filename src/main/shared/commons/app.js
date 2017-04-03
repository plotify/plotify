import electron from "electron";

let app = electron.app;

if (!app) {
  app = {};
}

export default app;
