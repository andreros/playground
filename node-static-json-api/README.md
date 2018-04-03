# Node.js Static JSON API

[![Awesome](https://cdn.rawgit.com/sindresorhus/awesome/d7305f38d29fed78fa85652e3a63e154dd8e8829/media/badge.svg)](https://github.com/andreros/)
[![License: Unlicense](https://img.shields.io/badge/license-Unlicense-blue.svg)](http://unlicense.org/)

Example of a RESTful API implemented in Node.js which retrieves static JSON for testing purposes.


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

Note: Bear in mind the following methods are implemented for demonstration purposes. The `POST` method for creating a new task or the `PUT`
for updating a task accept no parameters (which in a real world situation they would). Please, refer to the code for the implementation
details.

| Verb | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/tasks` | Retrieve all tasks. |
| `GET` | `/tasks/:taskId` | Retrieve one task details, given its ID. |
| `POST` | `/tasks` | Create a new task. |
| `PUT` | `/tasks/:taskId` | Update one task, given its ID. |
| `DELETE` | `/tasks/:taskId` | Delete one task, given its ID. |


## Built With

*  Node.js: [https://nodejs.org/](https://nodejs.org/)
*  Express: [https://expressjs.com/](https://expressjs.com/)


## Author

**André Rosa**

* <https://bitbucket.org/candrelsrosa>
* <https://github.com/andreros/>
* <https://facebook.com/candrelsrosa>
* <https://twitter.com/candrelsrosa>


## License

This is free and unencumbered software released into the [public domain](UNLICENSE.txt). For more information,
please refer to [http://unlicense.org](http://unlicense.org).
