const gulp = require("gulp");
const babel = require("gulp-babel");
const watch = require("gulp-watch");
const clean = require("gulp-clean");
const runElectron = require("gulp-run-electron");
const runSequence = require("run-sequence");
const shell = require("gulp-shell");
const electronInstaller = require("electron-winstaller");
const winPackager = require("electron-packager");
const packageJson = require("./package.json");

const paths = {
  src: "./src",
  installers: "./installers",
  build: {
    root: "./build",
    app: "./build/app",
    distribution: "./build/distribution",
    installers: "./build/distribution/installers"
  }
};

const electronVersion = packageJson.dependencies.electron;

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
  "assets-package-json-copy",
  "assets-html-copy",
  "assets-css-copy",
  "assets-fonts-copy",
  "assets-images-copy"];
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

gulp.task("assets-images-copy", () => {
  return gulp.src(paths.src + "/**/*.png")
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

gulp.task("win-package", () => {
  const options = {
    dir: paths.build.app,
    arch: "x64",
    electronVersion: electronVersion,
    icon: "app-icons/64.ico",
    name: packageJson.name,
    platform: "win32",
    overwrite: true,
    out: paths.build.distribution,
    appCopyright: "Copyright (C) 2017 alpha. All rights reserved",
    win32metadata: {
      CompanyName: "alpha",
      FileDescription: packageJson.productDescription,
      ProductName: packageJson.productName,
      OriginalFilename: packageJson.productName + ".exe"
    }
  };

  winPackager(options, (err, appPaths) => {
    if (err) {
      console.log("Eror packaging: " + err);
    } else {
      console.log("Successfully packaged (" + __dirname + "/" + appPaths + ")");

      console.log("Creating Windows Installer...");
      var result = electronInstaller.createWindowsInstaller({
        appDirectory: paths.build.distribution + "/plotify-win32-x64",
        outputDirectory: paths.installers,
        authors: "alpha",
        exe: "Plotify.exe",
        noMsi: true,
        icon: "app-icons/64.ico",
        setupIcon: "app-icons/64.ico"
      });
      return result.then(() => {
        console.log("Successfully created Windows Installer!");
      }, (e) => {
        console.log(`No dice: ${e.message}`);
      }
    );
    }
  });
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
              "win-package");
});
