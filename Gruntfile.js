/*!
 * CVAM's Starter Gruntfile
 * https://github.com/convistaalmar/starter
 * Copyright 2014 Con Vista Al Mar SRL
 * Licensed under MIT (https://github.com/convistaalmar/starter/blob/master/LICENSE)
 */

module.exports = function(grunt) {
  'use strict';

  // Force use of Unix newlines
  grunt.util.linefeed = '\n';

  // Project configuration
  grunt.initConfig({

    // Metadata
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*!\n' +
            ' * <%= pkg.description %> v<%= pkg.version %> (<%= pkg.homepage %>)\n' +
            ' * Built on <%= grunt.template.today("yyyy-mm-dd") %> by <%= pkg.author %>\n' +
            ' */\n',

    // Task configuration

    // Stylist: CSS selector extractor
    // Docs: https://www.npmjs.org/package/grunt-stylist
    stylist: {
      extract: {
        src: "*.html",
        dest: "dev/css/main.css",
        options: {
          ignore: "css/vendor/*.css",
          style: "css"
        }
      }
    },
    // Myth: CSS processor for site's styles
    // Docs: https://www.npmjs.org/package/grunt-myth
    myth: {
      dist: {
        files: {
          "css/main.css": "dev/css/main.css"
        }
      }
    },

   // Bootstrap tasks
   // TODO: glyphicons, fonts

    // Less CSS preprocessor
    // Docs: https://www.npmjs.org/package/grunt-contrib-less
    less: {
      main: {
        files: {
          'css/main.css': 'dev/less/main.less'
        }
      },
      bootstrap: {
        files: {
          'css/vendor/bootstrap.css': 'dev/less/custom/custom-bootstrap.less',
          'css/vendor/bootstrap-theme.css': 'dev/less/custom/custom-theme.less'
        }
      },
      minify: {
        options: {
          cleancss: true,
          report: 'min'
        },
        files: {
          'css/vendor/bootstrap.min.css': 'css/vendor/bootstrap.css',
          'css/vendor/bootstrap-theme.min.css': 'css/vendor/bootstrap-theme.css'
        }
      }
    },

    // Watch tasks
    // Docs: https://www.npmjs.org/package/grunt-contrib-watch
    watch: {
    	// Extract CSS selectors after HTML files are saved
      html: {
        files: "*.html",
        tasks: ["stylist"]
      },
      // Process CSS with Myth after source CSS files are saved
      css: {
        files: "dev/css/*.css",
        tasks: ["myth"]
      },
      // Process main CSS with Less
      main: {
        files: 'dev/less/*.less',
        tasks: ['less:main']
      },
      // Update customized Bootstrap after Less files are saved
      bootstrap: {
        files: 'dev/less/custom/*.less',
        tasks: ['less:bootstrap']
      }
    },

	  // Distribution tasks
	  // TODO: contrib-clean, html-validation, csslint, csscomb, jshint, jscs?, docs

    // Banner 
    // Docs: https://www.npmjs.org/package/grunt-banner
    usebanner: {
      dist: {
        options: {
          position: 'top',
          banner: '<%= banner %>'
        },
        files: {
          src: [
            'css/vendor/*.css',
            'css/*.css'
          ]
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-myth');
  grunt.loadNpmTasks('grunt-stylist');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-banner');
  grunt.registerTask('dist', ['less:minify', 'usebanner']);

}; // wrapper
