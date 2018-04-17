# Vorbereitungen

In diesem Dokument ist beschrieben, welche Software für die Weiterentwicklung von Plotify installiert sein muss und welche weiteren Vorbereitungen getroffen werden müssen.


## Linux

1. Benötigte Software installieren:
    1. [Git](https://git-scm.com/download/linux)
    2. [Node.js 8.x](https://nodejs.org/en/download/package-manager/)
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
    2. [Node.js 8.x](https://nodejs.org/dist/v8.9.4/node-v8.9.4-x86.msi)
    3. [C++ Build Tools Windows](https://github.com/felixrieseberg/windows-build-tools#readme)
2. Pfad zur Installation von Python zur PATH-Umgebungsvariable von Windows hinzufügen:
   `C:\Users\%username%\.windows-build-tools\python27\`
3. Repository von Plotify klonen:
    ```bash
    git clone https://github.com/plotify/plotify.git
    ```
4. Abhängigkeiten von Plotify installieren:
    ```bash
    npm install
    npm run rebuild
    ```


## macOS

1. Benötigte Software installieren:
    1. [Homebrew](https://brew.sh/)
    2. Die benötigten [Command Line Tools](https://developer.apple.com/xcode/features/) werden bei der Installation von Homebrew automatisch installiert.
    3. [Git](https://git-scm.com/download/mac) (z.B. über Homebrew im Terminal: `brew install git`)
    4. [Node.js 8.x](https://nodejs.org/dist/v8.9.4/node-v8.9.4.pkg)
2. Repository von Plotify klonen:
    ```bash
    git clone https://github.com/plotify/plotify.git
    ```
3. Abhängigkeiten von Plotify installieren:
    ```bash
    npm install
    npm run rebuild
    ```
