# Electron JSONPlaceholder API Consumer

JSONPlaceholder API consumer application built with Electron, Typescript, SASS / Materialize for CSS and Handlebars for HTML templating.

## Main Window

<p align="center">
    <img src="https://raw.githubusercontent.com/andreros/playground/master/electron-to-do-list/src/assets/img/to-do-list-main-window.png" width="600">
</p>










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

To test the project in development mode, set the variable `process.env.NODE_ENV = 'development'`. This will put
Electron in development mode. From the project directory run the command `gulp` to launch your application.

```javascript
// set the process environment variable
// process.env.NODE_ENV = 'production';
process.env.NODE_ENV = 'development';
```

While in development mode you will be able to reload the application by pressing the `opt+R` (mac or linux) or
`ctrl+R` (windows).

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


## Author

**André Rosa**

* <https://bitbucket.org/candrelsrosa>
* <https://github.com/andreros/>
* <https://facebook.com/candrelsrosa>
* <https://twitter.com/candrelsrosa>


## License

This is free and unencumbered software released into the [public domain](UNLICENSE.txt). For more information,
please refer to [http://unlicense.org](http://unlicense.org).
