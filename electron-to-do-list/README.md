# Electron Typescript Boilerplate

Boilerplate for building an Electron application written in Typescript, with SASS for CSS and Handlebars for HTML templating.

<p align="center">
    <img src="https://raw.githubusercontent.com/andreros/electron-typescript-boilerplate/master/src/assets/img/electron-typescript-boilerplate.png" width="600">
</p>


## Motivation

Derived from the [TypeScript Boilerplate](https://github.com/andreros/typescript-boilerplate) project, the creation of this 
boilerplate project comes both from the necessity of learning how to properly assemble, configure and troubleshoot an Electron 
application coded in TypeScript, including all the needed dependencies and specificities, as well as, have a ready-to-go code 
base for new projects to come.

This project also intends to be a comprehensive guide to anyone wanting to follow the same path and assemble his own
project from scratch. If you are planning to do so, please take a look at the
[project documentation](https://andreros.github.io/electron-typescript-boilerplate/).


## Prerequisites

### [Node.js](https://nodejs.org/en/download/)

#### Node installation

Please, read the [Node.js official installation guide](https://github.com/nodejs/node/wiki/Installation).

### [Electron](https://electronjs.org/)

#### Electron Installation

To install prebuilt Electron binaries, use [`npm`](https://docs.npmjs.com/).
The preferred method is to install Electron as a development dependency in your
app:

```sh
npm install electron -g
```

For more installation options and troubleshooting tips, see
[installation](https://github.com/electron/electron/blob/master/docs/tutorial/installation.md).

### [Gulp](https://gulpjs.com/)

Gulp uses Node for core processing, npm to manage project dependencies, and gulp.js to run tasks and interface with the core library. Node version 8 or higher suffices. You can follow the directions for installing Node on the Node website if you haven't done so already. Installation of Node will include npm. In order to run this project gulp tasks it is highly recommended that you install gulp globally.

#### Gulp installation

From the command line (Windows, Mac or Linux), please execute the following command:

```sh
npm install --global gulp-cli
```


## Installation

Clone or download this project. From the project directory run the command `npm install`.


## Local Development

To run the project in development mode, from the project directory run the command `npm run dev`. Your default
browser should open a window with the project running from [http://localhost:3000/](http://localhost:3000/).

## Run Your Application

To run your application, from the project directory run the command `gulp` or `gulp default`. The application 
will build and executed by Electron. If all went well, a window with your application will open.

## Pack Your Application for Distribution

To pack your application, from the project directory run one of the following commands, depending on the operating
system you are on:

*  `npm run package-mac`: Build a distribution version for Mac systems.
*  `npm run package-win`: Build a distribution version for Windows systems.
*  `npm run package-linux`: Build a distribution version for Linux systems.

## Built With

*  SASS CSS Pre-processor: [https://sass-lang.com/](https://sass-lang.com/)
*  Handlebars Templating Engine: [http://handlebarsjs.com/](http://handlebarsjs.com/)
*  TypeScript Scripting Language: [https://www.typescriptlang.org/](https://www.typescriptlang.org/)
*  Electron cross platform desktop apps with JavaScript, HTML, and CSS: [https://electronjs.org/](https://electronjs.org/)
*  Gulp Task Automator: [https://gulpjs.com/](https://gulpjs.com/)
*  Browser Sync Server Synchronizing Tool: [https://browsersync.io/](https://browsersync.io/)


## Contributing

1. Fork this project: [https://github.com/andreros/electron-typescript-boilerplate/fork](https://github.com/andreros/electron-typescript-boilerplate/fork)
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request


## Author

**André Rosa**

* <https://bitbucket.org/candrelsrosa>
* <https://github.com/andreros/>
* <https://facebook.com/candrelsrosa>
* <https://twitter.com/candrelsrosa>


## License

This is free and unencumbered software released into the [public domain](UNLICENSE.txt). For more information,
please refer to [http://unlicense.org](http://unlicense.org).
