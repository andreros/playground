# Documentation

Documentation for the Electron Typescript Boilerplate project.


## Table of Contents

*  [Creating a TypeScript project from scratch](index.md#creating-project)
*  [1 - Project Initial Setup](index.md#initial-setup)
*  [2 - The First Project File](index.md#first-file)
*  [3 - Dependencies](chapter2.html#dependencies)
*  [4 - Project File Structure](chapter3.html#file-structure)
*  [5 - Gulp Task Automation](chapter4.html#task-automation)
*  [6 - TypeScript Linting and Compiling](chapter5.html#typescript)
*  [7 - Browserify](chapter6.html#browserify)
*  [8 - CSS Pre-processing](#sass)
*  [9 - HTML Templates Compiling](chapter8.html#handlebars)
*  [10 - Development Server](chapter9.html#browser-sync)


### 8 - CSS Pre-processing <a name="sass">

A CSS pre-processor is a program or software that receives a set of input data to produce a CSS output. We have one 
or several files in a special syntax (depending on the preprocessor) which will be transformed into CSS language.
CSS pre-processors bring the CSS development many useful features that the CSS specification lacks. Among others 
we have:

*  Nested syntax
*  Variables
*  Mixins
*  Mathematical functions
*  Operational functions (such as “lighten” or “darken”)

which allows us to:

*  Reuse CSS rules avoiding repetitions
*  Better organize our project CSS
*  Split our CSS into multiple files generating only one as output
*  Easily integrate tools to optimize and/or compress the resulting CSS

There are several CSS pre-processors available. For this project we use [SASS](https://sass-lang.com/). This CSS 
pre-processing is performed by the `build:scss` gulp task.

```javascript
// Build SCSS gulp task

const gulp = require('gulp'),
      sourcemaps = require('gulp-sourcemaps'),
      sass = require('gulp-sass'),
      autoprefixer = require('gulp-autoprefixer');

gulp.task('build:scss', function () {
    return gulp.src(SRC_FOLDER + '/index.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.write())
        .pipe(autoprefixer({
            browsers: ['last 2 versions']
        }))
        .pipe(gulp.dest(DIST_FOLDER));
});
```

The `sourcemaps` dependency generates sourcemaps for the processed CSS, allowing the debugging of the uncompressed
CSS code inside browsers consoles. The `autoprefixer` dependency ensures the browser compatibility of any rule used
in our CSS by adding vendor prefixes to CSS rules. The list of prefixes used comes from [Can I Use](https://caniuse.com/).


### Next: [9 - HTML Templates Compiling](chapter8.html#handlebars)
