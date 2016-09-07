/*!
 * CVAM's Starter Gruntfile
 * https://github.com/convistaalmar/frontend-style-guide
 * Copyright 2014 Con Vista Al Mar SRL
 * Licensed under MIT (https://github.com/convistaalmar/frontend-style-guide/blob/master/LICENSE)
 */

module.exports = function(grunt) {
  'use strict';

  // Force use of Unix newlines
  grunt.util.linefeed = '\n';

  // Project configuration
  grunt.initConfig({

    // Task configuration

   // Bootstrap tasks
   // TODO: 
   // - Autoprefixer

    // Less CSS preprocessor
    // Docs: https://www.npmjs.org/package/grunt-contrib-less
    less: {
      inline: {
        options: {
          strictMath: true,
          sourceMap: true,
          outputSourceFiles: true,
          sourceMapFilename: 'assets/css/inline.css.map',
          sourceMapRootpath: '/frontend-style-guide/',
          compress: false
        },
        src: 'less/inline.less',
        dest: 'assets/css/inline.css'
      },
      base: {
        options: {
          strictMath: true,
          sourceMap: true,
          outputSourceFiles: true,
          sourceMapFilename: 'assets/css/base.css.map',
          sourceMapRootpath: '/frontend-style-guide/',
          compress: false
        },
        src: 'less/base.less',
        dest: 'assets/css/base.css'
      }
    },

    // Static HTML build
    // Docs: https://github.com/spatools/grunt-html-build
    htmlbuild: {
      dist: {
        src: 'src/*.html',
        dest: 'public/',
        options: {
          styles: {
            inline: 'assets/css/inline.css',
            base: 'assets/css/base.css'
          }
        }
      }
    },

    // Watch tasks
    // Docs: https://www.npmjs.org/package/grunt-contrib-watch
    watch: {
      html: {
        files: ['src/*.html'],
        tasks: ['htmlbuild:dist']
      },
      // Process CSS with Less
      less: {
        files: ['less/*.less', 'less/base/*.less', 'less/base/mixins/*.less', 'less/components/*.less'],
        tasks: ['less:inline', 'less:base', 'htmlbuild:dist']
      }
    }

  });


  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-html-build');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['watch']);

}; // wrapper
