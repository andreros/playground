# Lerna Mathstuff - Monorepositories with Lerna

[![Awesome](https://cdn.rawgit.com/sindresorhus/awesome/d7305f38d29fed78fa85652e3a63e154dd8e8829/media/badge.svg)](https://github.com/andreros/)
[![License: Unlicense](https://img.shields.io/badge/license-Unlicense-blue.svg)](http://unlicense.org/)

"Monorepo - A single repository holding the code of many modules".

A project to demonstrate a monorepo with Lerna, by [Bruce Campbell](https://github.com/eatrocks) as shown in this youtube video tutorial
"[Managing a Monorepo with Lerna](https://www.youtube.com/watch?v=e7VBl4Kra5E)". For further details, please visit
[Lerna Mathstuff Git Repository](https://github.com/eatrocks/lerna-mathstuff) or view the presentation
[Monorepo with Lerna](https://slides.com/eatrocks/monorepos-with-lerna/).


## Prerequisites

### [Node.js](https://nodejs.org/en/download/)

#### Node installation

Please, read the [Node.js official installation guide](https://github.com/nodejs/node/wiki/Installation).

### [Lerna](https://github.com/lerna/lerna)

#### Lerna installation

Install Lerna globally with [npm](https://www.npmjs.com/).

```sh
$ npm install --global lerna
```

### [Verdaccio](https://github.com/verdaccio/verdaccio)

Verdaccio is a lightweight private npm proxy registry. For further details, please visit
[https://github.com/verdaccio/verdaccio](https://github.com/verdaccio/verdaccio).

#### Verdaccio installation

Install Verdaccio globally (application will create default config in config.yaml you can edit later).

```sh
$ npm install --global verdaccio
```

Run verdaccio in your terminal (preferably in a separate terminal window).

```sh
$ verdaccio
```

## Commands ran during the tutorial

1. `lerna bootstrap` - Bootstraps all the repository modules, creating the "node_modules" folder for each repo module and downloading its dependencies.
1. `lerna publish` - Publishes the modules into git and the NPM registry.
1. `lerna updated` - Lists the repo modules which suffered changes, either because they were changed or because their repo dependencies were changed.
1. `lerna run test` - Invokes the script "test" for each repo module that has this command defined.
1. `lerna run test --scope @mathstuff/divide` - Invokes the script "test" for the repo "@mathstuff/divide" module.
1. `git add .` - Adds new files to git.
1. `git commit -m'lerna-mathstuff - Update divide'` - Commits changes to git.
1. `git push origin head` - Pushes changes to git.
1. `lerna publish` - Publishes the modules into git and the NPM registry.
1. `git tag` - Shows the repo available tags in git.

## Author

**André Rosa**

* <https://bitbucket.org/candrelsrosa>
* <https://github.com/andreros/>
* <https://facebook.com/candrelsrosa>
* <https://twitter.com/candrelsrosa>


## License

This is free and unencumbered software released into the [public domain](UNLICENSE.txt). For more information,
please refer to [http://unlicense.org](http://unlicense.org).
