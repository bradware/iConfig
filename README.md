Follow these instructions to get iConfigurator2.0 up and running.

## Prerequisites
* Node.js - Download and Install [Node.js](http://www.nodejs.org/download/). You can also follow [this gist](https://gist.github.com/isaacs/579814) for a quick and easy way to install Node.js and npm
* MongoDB - Download and Install [MongoDB](http://docs.mongodb.org/manual/installation/) - Make sure `mongod` is running on the default port (27017).

### Tools Prerequisites
* NPM - Node.js package manage; should be installed when you install node.js.
* Bower - Web package manager. Installing [Bower](http://bower.io/) is simple when you have `npm`:


### GRUNT [![Built with Grunt](https://cdn.gruntjs.com/builtwith.png)](http://gruntjs.com/)
* Grunt - Download and Install [Grunt](http://gruntjs.com).
```
$ npm install -g grunt-cli

## Additional Packages
* Express - Defined as npm module in the [package.json](package.json) file.
* Mongoose - Defined as npm module in the [package.json](package.json) file.
* AngularJS - Defined as bower module in the [bower.json](bower.json) file.
* Twitter Bootstrap - Defined as bower module in the [bower.json](bower.json) file.


## Getting My Repository
  My code is stored on GitHub at the respository address: https://github.com/bware225/iConfig
  First, you should have git running on your machine

  Download my repository from Git:

    $ cd to/preferred/directory/
    $ git init
    $ git clone https://github.com/bware225/iConfig.git
    $ git add .
    $ cd ./iConfig
    $ npm install
    $ grunt

  I recommend using [Grunt](https://github.com/gruntjs/grunt-cli) to start the server, this command will also start a mongod instance on port 27017:

    $ grunt

  Alternatively, when not using `grunt` you can run:

    $ mongod --dbpath /YourPathTo/iconfigurator2-0/data/db/
    $ node server

  Then, open a browser and go to:

    http://localhost:3000/index.html    OR
    http://localhost:3000/#/apps

BOOM. You are now permitted to enter the top-secret project iConfigurator2.0! Proceed with caution.
