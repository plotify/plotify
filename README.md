# ![Plotify](docs/header.png)

Plotify ist eine Software für Schriftsteller/innen, die dir dabei hilft,
die Charaktere deiner Geschichte zu planen und zu organisieren.
Behalte stets den Überblick und erschaffe eine fantastische Geschichte!

![Screenshot von Plotify](docs/screenshot.png)


## Download

**Achtung: Plotify befindet sich noch in einer sehr frühen Entwicklungsphase.**
**Es sollten keine Informationen ausschließlich in Plotify gespeichert werden.**

Lade dir Plotify kostenlos für dein Betriebssystem herunter:

<table>
    <tr>
        <td align="center" width="50%">
            <a href="https://github.com/plotify/plotify/releases/download/v0.1.0/plotify-0.1.0-windows-x64.exe">
                <img src="docs/windows-logo.png" />
            </a>
         </td>
        <td align="center" width="50%">
            <a href="https://github.com/plotify/plotify/releases/download/v0.1.0/plotify-0.1.0-linux-amd64.deb">
                <img src="docs/linux-logo.png" />
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

[![Build status](https://img.shields.io/travis/SebastianSchmidt/plotify/master.svg)](https://travis-ci.org/SebastianSchmidt/plotify)
[![Dependencies status](https://img.shields.io/david/SebastianSchmidt/plotify.svg)](https://david-dm.org/SebastianSchmidt/plotify)
[![Development dependencies status](https://img.shields.io/david/dev/SebastianSchmidt/plotify.svg)](https://david-dm.org/SebastianSchmidt/plotify?type=dev)
[![Optional dependencies status](https://img.shields.io/david/optional/SebastianSchmidt/plotify.svg)](https://david-dm.org/SebastianSchmidt/plotify?type=optional)


```bash
git clone https://github.com/SebastianSchmidt/plotify.git
cd plotify
npm install
npm run rebuild
npm start
```

Wichtig: Das Modul `electron-rebuild` verwendet das Modul `node-gyp`. Prüfen Sie,
ob alle notwendige Software für `node-gyp` installiert ist: [Preconditions for node-gyp](https://github.com/nodejs/node-gyp#installation)
