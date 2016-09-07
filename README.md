Starter Kit
===========

A set of development tools to start a project. 

It is based on:

* [HTML5 Boilerplate](http://html5boilerplate.com/)
* [Bootstrap](http://getbootstrap.com/)
* [jQuery](http://http://jquery.com/)

And relies on a bunch of automated tasks and tools that will help you to write code quickly.

## Getting started

The front-end development workflow take advantage of [Grunt](http://gruntjs.com/) to automate some tasks. This guide is intended to give you a reference about the tools used through that workflow and about the code styling followed.

## Working environment

In order to setup Grunt, you need:
* Download an install [Node.js](http://nodejs.org/download/) in your computer. 
* Install the [Grunt's command line interface (CLI)](http://gruntjs.com/getting-started#installing-the-cli) globally:
```
C:\nodejs\npm install -g grunt-cli
```

After installing, be sure that both are added to your `PATH` environment variable. Some modules also need [Git](http://git-scm.com/downloads) installed and added to `PATH`.

Now you to have two commands available to run through the command line from any directory:
* The `npm` command  to download and install [Node Package Modules](https://www.npmjs.org/)
* The `grunt` command to run tasks through your workflow.

Copy the starter kit files to your project directory. Then, browse to it using the command line and type:
```
C:\path_to_project\npm install
```

This will download and install all the dependencies needed to start working in your project.

To see a list of available options and tasks type:
```
C:\path_to_project\grunt -h
```

To make Grunt to watch for changes in your development files, type:
```
C:\path_to_project\grunt watch
``

To learn more about Grunt, cheack the [Getting Started](http://gruntjs.com/getting-started) guide. 

## Directory structure

The porpouse of each directory is:
```
/assets
    /css
        inline.css
        base.css
        scaffolding.css
        print.css
    /img
    /js
/doc
/less
    inline.less
    base.less
    scaffolding.less
    print.less
    /lib
    /components
        /navbar.less
    /layouts
        /home.less
/vendor
    /bootstrap
```


