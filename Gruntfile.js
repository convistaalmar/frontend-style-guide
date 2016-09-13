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
      dev: {
        options: {
          strictMath: true,
          sourceMap: true,
          outputSourceFiles: true,
          sourceMapRootpath: '/frontend-style-guide/'
        },
        files: {
          'assets/css/base.css':'less/base.less',
          'assets/css/screen.css':'less/screen.less'
        }
      },
      samples: {
        options: {
          strictMath: true,
          sourceMap: true,
          outputSourceFiles: true,
          sourceMapRootpath: '/frontend-style-guide/'
        },
        files: {
          'assets/css/base.css':'less/base.less',
          'assets/css/samples.css':'less/samples/components.less'
        }
      },
      dist: {
        options: {
          strictMath: true,
          compress: true
        },
        files: {
          'assets/css/base.css':'less/base.less',
          'assets/css/screen.css':'less/screen.less'
        }
      }
    },

    // Static HTML build
    // Docs: https://github.com/spatools/grunt-html-build
    htmlbuild: {
      dev: {
        src: 'src/*.html',
        dest: 'public/',
        options: {
          styles: {
            base: 'assets/css/base.css',
            screen: 'assets/css/screen.css'
          },
          scripts: {
            head: 'assets/js/vendor/modernizr-2.8.3.min.js',
            bottom: [
              'assets/js/vendor/jquery-1.12.0.min.js',
              'assets/js/plugins.js',
              'assets/js/main.js'
            ]
          }
        }
      },
      samples: {
        src: 'src/samples/*.html',
        dest: 'public/samples',
        options: {
          styles: {
            base: 'assets/css/base.css',
            samples: 'assets/css/samples.css'
          },
          scripts: {
            head: 'assets/js/vendor/modernizr-2.8.3.min.js',
            bottom: [
              'assets/js/vendor/jquery-1.12.0.min.js',
              'assets/js/plugins.js',
              'assets/js/main.js'
            ]
          }
        }
      },
      dist: {
        src: 'src/*.html',
        dest: 'public/',
        options: {
          styles: {
            base: 'assets/css/base.css',
            screen: 'assets/css/screen.css'
          },
          scripts: {
            head: 'assets/js/vendor/modernizr-2.8.3.min.js',
            bottom: [
              'assets/js/vendor/jquery-1.12.0.min.js',
              'assets/js/plugins.js',
              'assets/js/main.js'
            ]
          }
        }
      }
    },

    // Watch tasks
    // Docs: https://www.npmjs.org/package/grunt-contrib-watch
    watch: {
      html: {
        files: ['src/*.html'],
        tasks: ['htmlbuild:dev']
      },
      html_samples: {
        files: ['src/samples/*.html'],
        tasks: ['htmlbuild:samples']
      },
      // Process CSS with Less
      less: {
        files: ['less/*.less', 
                'less/base/*.less', 
                'less/base/mixins/*.less', 
                'less/base/mixins/content/*.less', 
                'less/base/mixins/forms/*.less', 
                'less/base/mixins/informative/*.less', 
                'less/base/mixins/layout/*.less', 
                'less/base/mixins/navigation/*.less', 
                'less/base/mixins/skins/*.less', 
                'less/base/mixins/tables/*.less', 
                'less/base/mixins/text/*.less', 
                'less/base/mixins/utilities/*.less', 
                'less/components/*.less'],
        tasks: ['less:dev', 
                'htmlbuild:dev']
      },
      less_samples: {
        files: ['less/samples/*.less'],
        tasks: ['less:samples', 
                'htmlbuild:samples']
      }
    }

  });


  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-html-build');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['watch']);
  grunt.registerTask('dist', ['htmlbuild:dist', 'less:dist']);

}; // wrapper
