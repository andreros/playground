# Documentation

Documentation for the Electron Typescript Boilerplate project.


## Table of Contents

*  [Creating a TypeScript project from scratch](index.md#creating-project)
*  [1 - Project Initial Setup](index.md#initial-setup)
*  [2 - The First Project File](index.md#first-file)
*  [3 - Dependencies](chapter2.html#dependencies)
*  [4 - Project File Structure](chapter3.html#file-structure)
*  [5 - Gulp Task Automation](#task-automation)
*  [6 - TypeScript Linting and Compiling](chapter5.html#typescript)
*  [7 - Browserify](chapter6.html#browserify)
*  [8 - CSS Pre-processing](chapter7.html#sass)
*  [9 - HTML Templates Compiling](chapter8.html#handlebars)
*  [10 - Development Server](chapter9.html#browser-sync)


### 5 - Gulp Task Automation <a name="task-automation">

The project uses [Gulp](https://gulpjs.com/) to automate several tasks related to the application. Any of the tasks can be run by simply 
executing `gulp <TASK_NAME>` in the command line inside the application folder. I.e. `gulp clean` or `gulp serve`.

The following table lists the Gulp tasks available to automate the various stages of the application lifecycle. Any precedence tasks are 
automatically ran when running any given task.

| Task | Precedences | Details |
|:---|:---|:---|
| `clean`       |              | This task removes the whole `dist` folder before making a new build. |
| `ts:lint`     |              | This task performs the linting of the application typescript files for errors. |
| `ts:compile`  |              | This task performs the transpiling of the application typescript files into regular Javascript. |
| `browserify`  | `ts:compile` | This task bundles all transpiled javascript files into one file with all the javascript code to be executed. |
| `copy:images` |              | This task copies the application images folder into the `dist` folder. |
| `build:scss`  |              | This task processes the application SASS files converting them into plain CSS. |
| `build:json`  |              | This task bundles the application modules JSON files into one single JSON file. |
| `build:html`  | `build:json` | This task compiles [Handlebars](https://handlebarsjs.com/) templates into HTML. |
| `build:clean` |              | This task removes all the unneeded files for the build from the `dist` folder. |
| `build`       | `ts:lint`, `browserify`, `copy:images`, `build:scss`, `build:html` | This task gathers all the subtasks involved in the building process and launches them in parallel. |
| `serve`       |              | This task launches [Browser Sync](https://browsersync.io/) and sets up file type watchers over the files involved in the development process. If any changes are detected in one of those files, the build process is triggered and subsequently [Browser Sync](https://browsersync.io/) reloads the application in all connected browsers. |
| `default`     | `clean`      | This task bundles and runs all tasks associated with the production of the application in a distributable format. This task also starts the application server in development mode. |


The following table lists the dependencies involved in each [Gulp](https://gulpjs.com/) task.

| Task | Dependencies |
|:---|:---|
| `clean`       | `gulp`, `rimraf` |
| `ts:lint`     | `gulp`, `gulp-tslint`, `tslint` |
| `ts:compile`  | `gulp`, `gulp-typescript` |
| `browserify`  | `gulp`, `browserify`, `vinyl-source-stream`, `vinyl-buffer`, `gulp-uglify-es` |
| `copy:images` | `gulp` |
| `build:scss`  | `gulp`, `gulp-sourcemaps`, `gulp-sass`, `gulp-autoprefixer` |
| `build:json`  | `gulp`, `gulp-merge-json` |
| `build:html`  | `gulp`, `fs`, `gulp-hb` |
| `build:clean` | `gulp`, `rimraf` |
| `build`       | `gulp` |
| `serve`       | `gulp`, `fs`, `browser-sync` |
| `default`     | `gulp` |


### Next: [6 - TypeScript Linting and Compiling](chapter5.html#typescript)
