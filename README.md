<p align="center">
  <a href="https://github.com/plotify/plotify"><img src="docs/assets/header.png" alt="Plotify" /></a>
</p>

<p align="center">
  <strong>
    Plotify ist eine Software für Schriftsteller/innen, die dir dabei hilft, die Charaktere deiner Geschichte zu planen und zu organisieren.
    Behalte stets den Überblick und erschaffe eine fantastische Geschichte!
  </strong>
</p>

<p align="center">
  <img src="docs/assets/screenshot-0.1.0-win.png" alt="Plotify Version 0.1.0 Windows" />
</p>


## Download

**Achtung: Plotify befindet sich noch in einer sehr frühen Entwicklungsphase.**
**Es sollten keine Informationen ausschließlich in Plotify gespeichert werden.**

Lade dir Plotify kostenlos für dein Betriebssystem herunter:

<table>
    <tr>
        <td align="center" width="50%">
            <a href="https://github.com/plotify/plotify/releases/download/v0.1.0/plotify-0.1.0-windows-x64.exe">
                <img src="docs/assets/windows-logo.png" />
            </a>
         </td>
        <td align="center" width="50%">
            <a href="https://github.com/plotify/plotify/releases/download/v0.1.0/plotify-0.1.0-linux-amd64.deb">
                <img src="docs/assets/linux-logo.png" />
            </a>
        </td>
    </tr>
    <tr>
        <td align="center">
            <a href="https://github.com/plotify/plotify/releases/download/v0.1.0/plotify-0.1.0-windows-x64.exe">
                <b>Windows</b><br />
                Windows 7, 8, 10
            </a>
        </td>
        <td align="center">
            <a href="https://github.com/plotify/plotify/releases/download/v0.1.0/plotify-0.1.0-linux-amd64.deb">
                <b>Linux</b><br />
                Ubuntu, Linux Mint, elementary OS
            </a>
        </td>
    </tr>
</table>


## Lizenz

Plotify ist eine freie Software. Jeder darf die Software kostenlos verwenden,
weiterverbreiten, deren Quelltext studieren, verändern und verbessern.
Plotify ist lizenziert unter der [GNU General Public License Version 3](LICENSE).
Erfahre mehr über die Bedeutung von [freier Software](https://www.gnu.org/philosophy/free-sw.de.html).


## Entwicklung

[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![Build status](https://img.shields.io/travis/plotify/plotify/master.svg)](https://travis-ci.org/plotify/plotify)
[![Build status](https://ci.appveyor.com/api/projects/status/ygbl9aajfsddq6ye?svg=true)](https://ci.appveyor.com/project/plotify/plotify)
[![Dependencies status](https://img.shields.io/david/plotify/plotify.svg)](https://david-dm.org/plotify/plotify)
[![Development dependencies status](https://img.shields.io/david/dev/plotify/plotify.svg)](https://david-dm.org/plotify/plotify?type=dev)
[![Optional dependencies status](https://img.shields.io/david/optional/plotify/plotify.svg)](https://david-dm.org/plotify/plotify?type=optional)

Quellcode von Plotify herunterladen und die Abhängigkeiten installieren.

```bash
git clone git@github.com:plotify/plotify.git
git checkout reborn
npm install
npm run rebuild
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

Wichtig: Das Modul `electron-rebuild` verwendet das Modul `node-gyp`. Prüfen Sie,
ob alle notwendige Software für `node-gyp` installiert ist: [Preconditions for node-gyp](https://github.com/nodejs/node-gyp#installation)
