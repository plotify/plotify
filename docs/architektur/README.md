# Architektur

In diesem Dokument wird die Architektur der Software auf technischer Ebene beschrieben.


## Grundlagen

Die folgenden Technologien sind die Grundlage für die Architektur.


### Electron

[Electron](https://electron.atom.io/) ermöglicht die Entwicklung von Desktopanwendungen für Linux,
Windows und Mac OS auf Basis von Webtechnologien wie JavaScript, HTML und CSS.
In Electron gibt es immer einen [Main Process](https://electron.atom.io/docs/tutorial/quick-start/#main-process)
und keinen oder beliebig viele [Renderer Processes](https://electron.atom.io/docs/tutorial/quick-start/#renderer-process).
Der `Main Process` wird beim Starten einer Electron Anwendung gestartet und kann auf die nativen
Ressourcen des Betriebssystems zugreifen. Darüber hinaus ist der `Main Process` dafür zuständig,
einen `Renderer Process` zu starten. Jeder `Renderer Process` ist dafür zuständig, ein `BrowserWindow`
mit einer Benutzeroberfläche anzuzeigen. Der `Main Process` und die `Renderer Processes` können über
Interprozesskommunikation (IPC) miteinander kommunizieren und Daten  austauschen. Dafür werden die
Module [ipcMain](https://electron.atom.io/docs/api/ipc-main) und
[ipcRenderer](https://electron.atom.io/docs/api/ipc-renderer) verwendet.

Siehe auch: [Electron Documentation](https://electron.atom.io/docs/)


### Redux

> Redux is a predictable state container for JavaScript apps.

Die Konzepte und die Funktionsweise von [Redux](http://redux.js.org/) sind in der
[Dokumentation](http://redux.js.org/) gut beschrieben. Für das Verständnis der Architektur sind die
Konzepte ausreichend, die in der [Einleitung](http://redux.js.org/docs/introduction/) zusammengefasst
sind.


### React

[React](https://facebook.github.io/react/) ist eine JavaScript Bibliothek für das Erstellen von
Benutzeroberflächen. Die einzelnen Bestandteile einer Benutzeroberfläche werden durch getrennte
React `Components` abgebildet. Der Zustand dieser `Components` ist von dem Zustand (`state`) der
Anwendung abhängig. Dieser `state` kann beispielsweise durch Redux verwaltet werden.

Siehe auch: [React Quickstart](https://facebook.github.io/react/docs/hello-world.html)

### Material Design Lite
> Google's Material Design Lite CSS Library

[Material Design Lite](http://www.getmdl.io/) Material Design Lite lets you add a Material Design look and feel to your websites. It doesn’t rely on any JavaScript frameworks and aims to optimize for cross-device use, gracefully degrade in older browsers, and offer an experience that is immediately accessible.