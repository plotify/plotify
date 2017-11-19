# Vorbereitungen

In diesem Dokument ist beschrieben, welche Software für die Weiterentwicklung von Plotify installiert sein muss und welche weiteren Vorbereitungen getroffen werden müssen.


## Linux

1. Benötigte Software installieren:
    1. [Git](https://git-scm.com/download/linux)
    2. [Node.js 7.x](https://nodejs.org/en/download/package-manager/)
    3. [Python 2.7.x](https://www.python.org/)
    4. [make](https://www.gnu.org/software/make/)
    5. [GCC](https://gcc.gnu.org)
2. Repository von Plotify klonen:
    ```bash
    git clone https://github.com/plotify/plotify.git
    ```
3. Abhängigkeiten von Plotify installieren:
    ```bash
    npm install
    npm run rebuild
    ```


## Windows

1. Benötigte Software installieren:
    1. [Git](https://git-scm.com/download/win)
    2. [Node.js 7.x](https://nodejs.org/download/release/v7.10.1/node-v7.10.1-x64.msi)
    3. [C++ Build Tools Windows](https://github.com/felixrieseberg/windows-build-tools#readme)
2. Repository von Plotify klonen:
    ```bash
    git clone https://github.com/plotify/plotify.git
    ```
3. Abhängigkeiten von Plotify installieren:
    ```bash
    npm install
    npm run rebuild
    ```


## macOS

1. Benötigte Software installieren:
    1. [Git](https://git-scm.com/download/mac)
    2. [Node.js 7.x](https://nodejs.org/download/release/v7.10.1/node-v7.10.1.pkg)
    3. [Python 2.7.x](https://www.python.org/) (Vermutlich bereits installiert.)
    4. [Xcode](https://developer.apple.com/xcode/)
    5. `Command Line Tools` über Xcode: `Xcode -> Preferences -> Downloads`
2. Repository von Plotify klonen:
    ```bash
    git clone https://github.com/plotify/plotify.git
    ```
3. Abhängigkeiten von Plotify installieren:
    ```bash
    npm install
    npm run rebuild
    ```
