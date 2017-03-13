const gulp = require("gulp");
const babel = require("gulp-babel");
const watch = require("gulp-watch");
const clean = require("gulp-clean");
const runElectron = require("gulp-run-electron");
const runSequence = require("run-sequence");
const shell = require("gulp-shell");

const app = {
  version: "0.1.0"
};

const paths = {
  src: "./src",
  build: {
    root: "./build",
    app: "./build/app",
    distribution: "./build/distribution",
    installers: "./build/distribution/installers"
  }
};

const electronVersion = require("./package.json").dependencies.electron;


/* Common Tasks */

gulp.task("clean-build", () => {
  return gulp.src(paths.build.root, {read: false})
    .pipe(clean());
});


/* Babel Tasks */

const babelTasks = ["babel-js-compile"];
const babelTasksDev = babelTasks.concat(["babel-js-watch"]);

gulp.task("babel-js-compile", () => {
  return gulp.src(paths.src + "/**/*.js")
    .pipe(babel({
      "presets": ["latest"],
      "plugins": ["transform-react-jsx"]
    }))
    .pipe(gulp.dest(paths.build.app));
});

gulp.task("babel-js-watch", () => {
  return gulp.watch(paths.src + "/**/*.js", ["babel-js-compile"]);
});


/* Assets Tasks */

const assetsTasks = [
  "assets-package-json-copy","assets-html-copy", "assets-css-copy", "assets-fonts-copy"];
const assetsTasksDev = assetsTasks.concat([
  "assets-html-watch", "assets-css-watch", "assets-fonts-watch"]);

gulp.task("assets-package-json-copy", () => {
  return gulp.src(["package.json"])
    .pipe(gulp.dest(paths.build.app));
});

gulp.task("assets-html-copy", () => {
  return gulp.src(paths.src + "/**/*.html")
    .pipe(gulp.dest(paths.build.app));
});

gulp.task("assets-html-watch", () => {
  return gulp.watch(paths.src + "/**/*.html", ["assets-html-copy"]);
});

gulp.task("assets-css-copy", () => {
  return gulp.src(paths.src + "/**/*.css")
    .pipe(gulp.dest(paths.build.app));
});

gulp.task("assets-css-watch", () => {
  return gulp.watch(paths.src + "/**/*.css", ["assets-css-copy"]);
});

gulp.task("assets-fonts-copy", () => {
  return gulp.src(paths.src + "/**/*.{eot,svg,ttf,woff,woff2,otf}")
    .pipe(gulp.dest(paths.build.app));
});

gulp.task("assets-fonts-watch", () => {
  return gulp.watch(paths.src + "/**/*.{eot,svg,ttf,woff,woff2,otf}",
    ["assets-fonts-copy"]);
});


/* Electron Tasks */

const electronTasks = ["electron-run", "electron-watch"];

gulp.task("electron-run", () => {
  return gulp.src(paths.build.app).pipe(runElectron());
});

gulp.task("electron-watch", () => {
  return gulp.watch(paths.build.app + "/**/*.*", ["electron-run"]);
});


/* Distribution Tasks */

gulp.task("install-production-dependencies", shell.task([
  "npm --prefix " + paths.build.app + " install " + paths.build.app + " --production"
]));

gulp.task("package-linux", shell.task([
  "electron-packager " + paths.build.app + " plotify " +
        "--out " + paths.build.distribution + " " +
        "--electron-version=" + electronVersion + " " +
        "--platform=linux " +
        "--arch=x64",
  "electron-installer-debian " +
        "--src " + paths.build.distribution + "/plotify-linux-x64 " +
        "--dest " + paths.build.installers + " " +
        "--arch amd64 " +
        "--config deb.json"
]));

gulp.task("package-windows", shell.task([
  "electron-packager " + paths.build.app + " plotify " +
        "--out " + paths.build.distribution + " " +
        "--electron-version=" + electronVersion + " " +
        "--platform win32 " +
        "--arch x64",
  "electron-installer-windows " +
        "--src " + paths.build.distribution + "/plotify-win32-x64 " +
        "--dest " + paths.build.installers + " " +
        "--options.version " + app.version + " " +
        "--options.iconUrl file://src/app-icons/64.ico"
]));

/* Combined Tasks */

const buildTasks = babelTasks.concat(assetsTasks);
const buildTasksDev = babelTasksDev.concat(assetsTasksDev);

gulp.task("default", () => {
  runSequence("clean-build", buildTasksDev, electronTasks);
});

gulp.task("noui", () => {
  runSequence("clean-build", buildTasksDev);
});

gulp.task("distribution:linux", () => {
  runSequence("clean-build",
              buildTasks,
              "install-production-dependencies",
              "package-linux");
});

gulp.task("distribution:windows", () => {
  runSequence("clean-build",
              buildTasks,
              "install-production-dependencies",
              "package-windows");
});
