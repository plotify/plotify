# Plotify

![Downloads](https://img.shields.io/github/downloads/plotify/plotify/total.svg)


## Entwicklung

[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![Build status](https://img.shields.io/travis/plotify/plotify/reborn.svg)](https://travis-ci.org/plotify/plotify)

Quellcode von Plotify herunterladen und die Abhängigkeiten installieren.

```bash
git clone git@github.com:plotify/plotify.git
git checkout reborn
npm install
```

Plotify im Entwicklungsmodus starten:

```bash
npm start
```

Installationsprogramme für Plotify erzeugen:

```bash
npm run dist:linux
npm run dist:win
npm run dist:mac
```

## story-Dateien unter Linux mit Plotify öffnen

- MIME-Typ `application/org.plotify.story` der Desktop-Datei hinzufügen.
  Da `electron-builder` aktuell keine eigenen Deskop-Dateieinträge erlaubt,
  wird der MIME-Typ über den Category-Eintrag und einen Zeilenumbruch eingefügt.
