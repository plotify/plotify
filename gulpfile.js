const path = require("path");

const gulp = require("gulp");
const babel = require("gulp-babel");
const watch = require("gulp-watch");
const clean = require("gulp-clean");
const mocha = require("gulp-mocha");
const runSequence = require("run-sequence");
const shell = require("gulp-shell");
const runElectron = require("gulp-run-electron");

const checkDependencies = require("check-dependencies");
const rebuild = require("electron-rebuild").default;
const electronInstaller = require("electron-winstaller");
const winPackager = require("electron-packager");

const checker = require("license-checker");
const fs = require("fs");
const ownLicenseFile = "./LICENSE";

const packageJson = require("./package.json");

const paths = {
  src: "./src",
  icons: "./src/main/ui/resources/app-icons",
  installers: "./installers",
  build: {
    root: "./build",
    app: {
      root: "./build/app",
      main: "./build/app/main",
      tests: "./build/app/test"
    },
    packaged: "./build/packaged",
    licenseFile: "./build/packaged/LICENSE",
    installers: "./build/installers"
  }
};

const electronVersion = packageJson.dependencies.electron;

/* Preparation Tasks */

const preparationTasks = ["clean-build", "check-dependencies"];

gulp.task("clean-build", () => {
  return gulp.src(paths.build.root, {read: false}).pipe(clean());
});

gulp.task("check-dependencies", () => {
  return checkDependencies().then(result => {
    if (!result.depsWereOk)  {

      console.log("The following dependencies are not installed in the exact same versions " +
                  "that are specified in package.json:");

      result.error.forEach(message => {
        if (!message.includes("to install missing packages")) {
          console.log(" - " + message);
        }
      });

      throw new Error("Invoke npm install to install missing packages.");

    }
  });
});


/* Babel Tasks */

const babelTasks = ["babel-js-compile"];
const babelTasksDev = babelTasks.concat(["babel-js-watch"]);

gulp.task("babel-js-compile", () => {
  return gulp.src(paths.src + "/**/*.js")
    .pipe(babel({
      "presets": ["latest"],
      "plugins": [
        "transform-react-jsx",
        ["babel-plugin-transform-builtin-extend", {
          globals: ["Error", "Array"]
        }]
      ]
    }))
    .pipe(gulp.dest(paths.build.app.root));
});

gulp.task("babel-js-watch", () => {
  return gulp.watch(paths.src + "/**/*.js", ["babel-js-compile"]);
});


/* Assets Tasks */

const assetsTasks = ["assets-package-json-copy", "assets-copy"];
const assetsTasksDev = assetsTasks.concat(["assets-watch"]);
const assetsPath = paths.src + "/**/*.{html,css,sql,png,jpg,jpeg,ico,svg,eot,ttf,woff,woff2,otf}";

gulp.task("assets-package-json-copy", () => {
  return gulp.src(["package.json"]).pipe(gulp.dest(paths.build.app.main));
});

gulp.task("assets-copy", () => {
  return gulp.src(assetsPath).pipe(gulp.dest(paths.build.app.root));
});

gulp.task("assets-watch", () => {
  return gulp.watch(assetsPath, ["assets-copy"]);
});


/* Tests Tasks */

const testsTasks = ["tests-execute"];
const testsTasksDev = testsTasks.concat(["tests-watch"]);

gulp.task("tests-execute", () => {
  return gulp.src(paths.build.app.tests + "/**/*.js", { read: false })
    .pipe(mocha({
      reporter: "spec"
    }));
});

gulp.task("tests-watch", () => {
  return gulp.watch(paths.build.app.tests + "/**/*.*", ["tests-execute"]);
});


/* Electron Tasks */

const electronTasks = ["electron-run", "electron-watch"];

gulp.task("electron-run", () => {
  return gulp.src(paths.build.app.main).pipe(runElectron());
});

gulp.task("electron-watch", () => {
  return gulp.watch(paths.build.app.main + "/**/*.*", ["electron-run"]);
});


/* Distribution Tasks */

gulp.task("install-production-dependencies", shell.task([
  "npm --prefix " + paths.build.app.main + " install " + paths.build.app.main + " --production"
]));

gulp.task("rebuild-production-dependencies", () => {

  const absolutePath = path.normalize(__dirname + "/" + paths.build.app.main);
  const rebuilder = rebuild(absolutePath, electronVersion, undefined, ["sqlite3"], true);

  const lifecycle = rebuilder.lifecycle;

  lifecycle.on("module-found", (moduleName) => {
    console.log("Module found: " + moduleName);
  });

  lifecycle.on("module-done", () => {
    console.log("Module done.");
  });

  return rebuilder
    .then(() => console.info("Rebuild successful."))
    .catch((e) => {
      console.error("Rebuild failed.");
      console.error(e);
    });

});

gulp.task("package:generate-license-file", () => {

  const options = Object.freeze({ encoding: "utf-8" });
  const separator = "---------------------------------------------------------" +
    "-----------------------";

  const ownLicenseFileContent = fs.readFileSync(ownLicenseFile, options) + "\n\n";
  fs.appendFileSync(paths.build.licenseFile, ownLicenseFileContent, options);

  checker.init({ start: "./build/app/main" }, (error, json) => {
    for (let name in json) {

      const p = json[name];

      let output = separator + "\n\n";
      output += "Package:   " + name + "\n";
      output += "Publisher: " + p.publisher + "\n";
      output += "License:   " + p.licenses + "\n\n";

      if (p.licenseFile) {
        output += fs.readFileSync(p.licenseFile, options) + "\n\n";
      }

      fs.appendFileSync(paths.build.licenseFile, output, options);

    }
  });

});

gulp.task("package:add-license-file-to-packages", () => {
  fs.readdir(paths.build.packaged, (error, files) => {
    files.forEach(file => {
      const filePath = path.join(paths.build.packaged, file);
      fs.stat(filePath, (error, stats) => {
        if (stats.isDirectory()) {
          const oldElectronLicenseFile = path.join(filePath, "LICENSE");
          const newElectronLicenseFile= path.join(filePath, "LICENSE-electron");
          fs.rename(oldElectronLicenseFile, newElectronLicenseFile, (error) => {
            fs.createReadStream(paths.build.licenseFile)
              .pipe(fs.createWriteStream(oldElectronLicenseFile));
          });
        }
      });
    });
  });
});

gulp.task("package:linux", shell.task([
  "electron-packager " + paths.build.app.main + " plotify " +
        "--out " + paths.build.packaged + " " +
        "--electron-version=" + electronVersion + " " +
        "--platform=linux " +
        "--arch=x64 " +
        "--icon=" + paths.icons + "/64.png"

]));

gulp.task("installer:linux", shell.task([
  "electron-installer-debian " +
        "--src " + paths.build.packaged + "/plotify-linux-x64 " +
        "--dest " + paths.build.installers + " " +
        "--arch amd64 " +
        "--config linux-package.json"
]));

gulp.task("package:windows", () => {
  return new Promise((resolve, reject) => {

    const options = {
      dir: paths.build.app.main,
      arch: "x64",
      electronVersion: electronVersion,
      icon: paths.icons + "/64.ico",
      name: packageJson.name,
      platform: "win32",
      overwrite: true,
      out: paths.build.packaged,
      asar: true,
      appCopyright: "Copyright (C) 2017 Sebastian Schmidt und Jasper Meyer",
      win32metadata: {
        CompanyName: "Sebastian Schmidt und Jasper Meyer",
        FileDescription: packageJson.productDescription,
        ProductName: packageJson.productName,
        OriginalFilename: packageJson.productName + ".exe"
      }
    };

    winPackager(options, (error, appPaths) => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });

  });
});

gulp.task("installer:windows", () => {
  let result = electronInstaller.createWindowsInstaller({
    appDirectory: paths.build.packaged + "/plotify-win32-x64",
    outputDirectory: paths.installers + "/windows",
    authors: "Sebastian Schmidt und Jasper Meyer",
    exe: "Plotify.exe",
    noMsi: true,
    icon: paths.icons + "/64.ico",
    setupIcon: paths.icons + "/64.ico",
    iconUrl: "https://github.com/SebastianSchmidt/plotify/blob/master/src/main/ui/resources/app-icons/64.ico"
  });
  return result.then(() => {
    console.log("Successfully created Windows Installer!");
  }, (e) => {
    console.log(`No dice: ${e.message}`);
  });
});

gulp.task("package:macos", shell.task([
  "electron-packager " + paths.build.app.main + " plotify " +
        "--out " + paths.build.packaged + " " +
        "--electron-version=" + electronVersion + " " +
        "--platform=darwin " +
        "--arch=x64 " +
        "--icon=" + paths.icons + "/64.icns"
]));

/* Combined Tasks */

const buildTasks = babelTasks.concat(assetsTasks);
const buildTasksDev = babelTasksDev.concat(assetsTasksDev);

gulp.task("default", () => {
  runSequence(preparationTasks, buildTasksDev, testsTasksDev, electronTasks);
});

gulp.task("noui", () => {
  runSequence(preparationTasks, buildTasksDev, testsTasksDev);
});

gulp.task("test", () => {
  runSequence(preparationTasks, buildTasks, testsTasks);
});

gulp.task("distribution:linux", () => {
  runSequence(preparationTasks,
              buildTasks,
              testsTasks,
              "install-production-dependencies",
              "rebuild-production-dependencies",
              "package:linux",
              "package:generate-license-file",
              "package:add-license-file-to-packages",
              "installer:linux");
});

gulp.task("distribution:windows", () => {
  runSequence(preparationTasks,
              buildTasks,
              testsTasks,
              "install-production-dependencies",
              "rebuild-production-dependencies",
              "package:windows",
              "package:generate-license-file",
              "package:add-license-file-to-packages",
              "installer:windows");
});

gulp.task("distribution:macos", () => {
  runSequence(preparationTasks,
              buildTasks,
              testsTasks,
              "install-production-dependencies",
              "rebuild-production-dependencies",
              "package:macos",
              "package:generate-license-file",
              "package:add-license-file-to-packages");
});
