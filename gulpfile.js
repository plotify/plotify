const gulp = require("gulp");
const babel = require("gulp-babel");
const watch = require("gulp-watch");
const clean = require("gulp-clean");
const runElectron = require("gulp-run-electron");
const runSequence = require("run-sequence");

const paths = {
  src: "./src",
  build: "./build",
};


/* Common Tasks */

gulp.task("clean-build", () => {
  return gulp.src(paths.build, {read: false})
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
    .pipe(gulp.dest(paths.build));
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
    .pipe(gulp.dest(paths.build));
});

gulp.task("assets-html-copy", () => {
  return gulp.src(paths.src + "/**/*.html")
    .pipe(gulp.dest(paths.build));
});

gulp.task("assets-html-watch", () => {
  return gulp.watch(paths.src + "/**/*.html", ["assets-html-copy"]);
});

gulp.task("assets-css-copy", () => {
  return gulp.src(paths.src + "/**/*.css")
    .pipe(gulp.dest(paths.build));
});

gulp.task("assets-css-watch", () => {
  return gulp.watch(paths.src + "/**/*.css", ["assets-css-copy"]);
});

gulp.task("assets-fonts-copy", () => {
  return gulp.src(paths.src + "/**/*.{eot,svg,ttf,woff,woff2,otf}")
    .pipe(gulp.dest(paths.build));
});

gulp.task("assets-fonts-watch", () => {
  return gulp.watch(paths.src + "/**/*.{eot,svg,ttf,woff,woff2,otf}",
    ["assets-fonts-copy"]);
});


/* Electron Tasks */

const electronTasks = ["electron-run", "electron-watch"];

gulp.task("electron-run",  () => {
  return gulp.src("./build").pipe(runElectron());
});

gulp.task("electron-watch", () => {
  return gulp.watch(paths.build + "/**/*.*", ["electron-run"]);
});


/* Combined Tasks */

const buildTasks = babelTasks.concat(assetsTasks);
const buildTasksDev = babelTasksDev.concat(assetsTasksDev);

gulp.task("default", () => {
  runSequence("clean-build", buildTasksDev, electronTasks);
});

gulp.task("noui", () => {
  runSequence("clean-build", buildTasksDev);
});
