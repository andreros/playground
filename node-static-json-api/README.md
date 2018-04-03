# Node.js Static JSON API

[![Awesome](https://cdn.rawgit.com/sindresorhus/awesome/d7305f38d29fed78fa85652e3a63e154dd8e8829/media/badge.svg)](https://github.com/andreros/)
[![License: Unlicense](https://img.shields.io/badge/license-Unlicense-blue.svg)](http://unlicense.org/)

Example of a RESTful API implemented in Node.js which retrieves static JSON for testing purposes. The example implements
a sorting and a searching mechanisms over the static data. These mechanisms are implemented resorting to
[Underscore.js](http://underscorejs.org/).


## Prerequisites

### [Node.js](https://nodejs.org/en/download/)

#### Node installation

Please, read the [Node.js official installation guide](https://github.com/nodejs/node/wiki/Installation).


## Installation

Clone or download this project. From the project directory run the command `npm install`.


## Run Your Application

To run your application, from the project directory run the command `npm start`. The API will
be started and accessible in the `http://localhost:5000/api/v1/` endpoint.


## API Methods

Note: Please, refer to the code for the implementation details.

| Verb | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/options` | Retrieve all options. |
| `GET` | `/options/:searchTerm` | Retrieve all options matching the search term. The search performed is case insensitive. |


## Built With

*  Node.js: [https://nodejs.org/](https://nodejs.org/)
*  Express: [https://expressjs.com/](https://expressjs.com/)
*  Underscore: [http://underscorejs.org/](http://underscorejs.org/)


## Author

**André Rosa**

* <https://bitbucket.org/candrelsrosa>
* <https://github.com/andreros/>
* <https://facebook.com/candrelsrosa>
* <https://twitter.com/candrelsrosa>


## License

This is free and unencumbered software released into the [public domain](UNLICENSE.txt). For more information,
please refer to [http://unlicense.org](http://unlicense.org).
