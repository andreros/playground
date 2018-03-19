# Node.js API with MongoDB Database

[![Awesome](https://cdn.rawgit.com/sindresorhus/awesome/d7305f38d29fed78fa85652e3a63e154dd8e8829/media/badge.svg)](https://github.com/andreros/)
[![License: Unlicense](https://img.shields.io/badge/license-Unlicense-blue.svg)](http://unlicense.org/)

Example of a RESTful API implemented in Node.js with MongoDB database interaction.


## Prerequisites

### [Node.js](https://nodejs.org/en/download/)

#### Node installation

Please, read the [Node.js official installation guide](https://github.com/nodejs/node/wiki/Installation).

### [Homebrew](https://brew.sh/)

#### Homebrew installation (for Mac only)

From a Mac computer, copy the following command, paste it at a Terminal prompt and hit enter.

`/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"`

If you already have [Homebrew](https://brew.sh/) installed on your system, please run the following command.

`brew update`

For further details, please, read the [Homebrew project official page](https://brew.sh/)

### [MongoDB](https://www.mongodb.com/)

#### MongoDB installation

From a Mac computer, the easiest method to install MongoDB is through Homebrew. Assuming Homebrew is installed on
your system, from a Terminal prompt, please run the following command.

`brew install mongodb`

In order to confirm the successful MongoDB installation on your system, please run the following command.

`mongod --version`

You should see the following output (example below).

`db version v3.6.3
git version: 9586e557d54ef70f9ca4b43c26892cd55257e1a5
OpenSSL version: OpenSSL 1.0.2n  7 Dec 2017
allocator: system
modules: none
build environment:
    distarch: x86_64
    target_arch: x86_64`

For further details on how to install MongoDB on other systems, please read the
[MongoDB official instalation guide](https://docs.mongodb.com/manual/administration/install-community/)

#### MongoDB server instance bootstrap / startup

1. Create the default data folder for your MongoDB instances.

`sudo mkdir -p /data/db`

1. Give the right permissions to the newly created folder.

`sudo chown -R <your_username> /data/db/`

1. Boot the MongoDB server instance.

`mongod`

#### Optional MongoDB tools

Although not being completely necessary, it is highly recommended you install a GUI (Graphical User Interface) for
your MongoDB database instance. The official MongoDB GUI is [Compass](https://www.mongodb.com/download-center?#compass).
For learning purposes we recommend you install the Community Edition. For further details on how to install the application,
please read the [Compass official installation guide](https://docs.mongodb.com/compass/current/install/).


## Installation

Clone or download this project. From the project directory run the command `npm install`.


## Run Your Application

To run your application, from the project directory run the command `npm start`. The API will
be started and accessible in the `http://localhost:5000/api/v1/` endpoint.


## Database Structure

<p align="center">
    To be defined.
</p>


## API Methods

| Verb | Endpoint | Description |
| --- | --- | --- |


## Built With

*  Node.js: [https://nodejs.org/](https://nodejs.org/)
*  Express: [https://expressjs.com/](https://expressjs.com/)
*  MongoDB: [https://www.mongodb.com](https://www.mongodb.com/)


## Author

**André Rosa**

* <https://bitbucket.org/candrelsrosa>
* <https://github.com/andreros/>
* <https://facebook.com/candrelsrosa>
* <https://twitter.com/candrelsrosa>


## License

This is free and unencumbered software released into the [public domain](UNLICENSE.txt). For more information,
please refer to [http://unlicense.org](http://unlicense.org).
