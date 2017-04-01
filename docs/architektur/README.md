# Architektur

In diesem Dokument wird die Architektur der Software auf technischer Ebene beschrieben.


## Grundlagen

Die folgenden Technologien sind die Grundlage für die Architektur.


### Electron

In Electron gibt es immer einen [Main Process](https://electron.atom.io/docs/tutorial/quick-start/#main-process)
und keinen oder beliebig viele [Renderer Processes](https://electron.atom.io/docs/tutorial/quick-start/#renderer-process).
Der `Main Process` wird beim Starten einer Electron Anwendung gestartet und kann
auf die nativen Ressourcen des Betriebssystems zugreifen. Darüber hinaus ist der
`Main Process` dafür zuständig, einen `Renderer Process` zu starten.
Jeder `Renderer Process` ist dafür zuständig, ein `BrowserWindow` mit einer
Benutzeroberfläche anzuzeigen. Der `Main Process` und die `Renderer Processes`
können über Interprozesskommunikation (IPC) miteinander kommunizieren und Daten
austauschen. Dafür werden die Module [ipcMain](https://electron.atom.io/docs/api/ipc-main)
und [ipcRenderer](https://electron.atom.io/docs/api/ipc-renderer) verwendet.

Siehe auch: [Electron Documentation](https://electron.atom.io/docs/)
