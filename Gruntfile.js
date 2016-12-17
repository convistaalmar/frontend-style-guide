/*!
 * CVAM's Frontend Style Guide
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

    // 
    project: grunt.file.readJSON('project.json'),

    // Task configuration

    // Less CSS preprocessor
    // Docs: https://www.npmjs.org/package/grunt-contrib-less
    less: {
      default: {
        options: {
          strictMath: true,
          sourceMap: true,
          sourceMapRootpath: '<%= project.root_path %>'
        },
        files: {
          '<%= project.assets_path %>css/styles.css':'<%= project.sources_path %>less/styles.less',
          '<%= project.assets_path %>css/samples.css':'<%= project.sources_path %>less/samples.less'
        }
      }
    },

    // CSS Autoprefixer
    // Docs: https://www.npmjs.com/package/grunt-autoprefixer
    autoprefixer: {
      options: {
        browsers: ['last 2 versions', 'ie 9']
      },
      default: {
        options: {
          map: true
        },
        src: ['<%= project.assets_path %>css/styles.css', '<%= project.assets_path %>css/samples.css']
      }
    },

    // CSS Linting
    // Docs: https://github.com/gruntjs/grunt-contrib-csslint
    csslint: {
      options: {
        csslintrc: '<%= project.sources_path %>less/.csslintrc'
      },
      src: ['<%= project.assets_path %>css/*.css']
    },

    // Concat JS
    // Docs: https://github.com/gruntjs/grunt-contrib-concat
    concat: {
      default: {
        options: {
          sourceMap: true,
          sourceMapStyle: 'inline'
        },
        files: {
          '<%= project.assets_path %>js/plugins.js': '<%= project.sources_path %>scripts/plugins/**/*.js',
          '<%= project.assets_path %>js/main.js': '<%= project.sources_path %>scripts/main/**/*.js'
        }
      }
    },

    // JS linting
    // Docs: https://github.com/gruntjs/grunt-contrib-jshint
    jshint: {
      options: {
        jshintrc: '<%= project.sources_path %>scripts/.jshintrc'
      },
      beforeconcat: ['<%= project.sources_path %>scripts/plugins/**/*.js', '<%= project.sources_path %>scripts/main/**/*.js'],
      afterconcat: ['<%= project.assets_path %>js/plugins.js', '<%= project.assets_path %>js/main.js']
    },

    // Create symbols definition
    // Docs: https://github.com/FWeinb/grunt-svgstore
    svgstore: {
      options: {
        prefix: 'icon-', // This will prefix each ID
        svg: { // will add and overide the the default xmlns="http://www.w3.org/2000/svg" attribute to the resulting SVG
          display: 'none',
          width: '0',
          height: '0',
          xmlns: 'http://www.w3.org/2000/svg'
        },
        cleanup: ['fill', 'stroke', 'style'],
        includeTitleElement: false
      },
        default: {
          files: {
            '<%= project.assets_path %>svg/icons.svg': ['<%= project.sources_path %>icons/*.svg']
          },
        }
    },

    // Static HTML build
    // Docs: https://github.com/spatools/grunt-html-build
    htmlbuild: {
        options: {
          scripts: {
            head: '<%= project.assets_path %>js/vendor/modernizr-3.3.1-custom.js',
            body: [
              '<%= project.assets_path %>js/vendor/jquery-1.12.4.js',
              '<%= project.assets_path %>js/plugins.js',
              '<%= project.assets_path %>js/main.js'
            ]
          },
          sections: {
            head: '<%= project.sources_path %>sections/head.html',
            header: '<%= project.sources_path %>sections/header.html',
            footer: '<%= project.sources_path %>sections/footer.html',
            foot: '<%= project.sources_path %>sections/foot.html',
            icons: '<%= project.assets_path %>svg/icons.svg',
            plugins:'<%= project.sources_path %>sections/plugins.html'
          },
          data: {
            lang: '<%= project.lang %>',
            title: '<%= project.title %>',
            assets_path: '<%= project.root_path %><%= project.assets_path %>',
            content_path: '<%= project.root_path %><%= project.content_path %>'
          }
        },
      default: {
        options: {
          styles: {
            styles: '<%= project.assets_path %>css/styles.css'
          }
        },
        src: '<%= project.sources_path %>pages/*.html',
        dest: '<%= project.html_path %>',
      },
      samples: {
        options: {
          styles: {
            styles: '<%= project.assets_path %>css/samples.css'
          }
        },
        src: '<%= project.sources_path %>samples/*.html',
        dest: '<%= project.assets_path %>samples/',
      }
    },

    // Watch tasks
    // Docs: https://www.npmjs.org/package/grunt-contrib-watch
    watch: {
      svg: {
        files: ['<%= project.sources_path %>icons/*.svg'],
        tasks: ['svgstore']
      },
      html: {
        files: ['<%= project.sources_path %>pages/*.html',
                '<%= project.sources_path %>sections/*.html',
                '<%= project.assets_path %>svg/*.svg'],
        tasks: ['htmlbuild:default']
      },
      samples: {
        files: ['<%= project.sources_path %>samples/*.html',
                '<%= project.sources_path %>sections/*.html',
                '<%= project.assets_path %>svg/*.svg'],
        tasks: ['htmlbuild:samples']
      },
      js: {
        files: ['<%= project.sources_path %>scripts/plugins/*.js', 
                '<%= project.sources_path %>scripts/main/*.js',
                '<%= project.sources_path %>scripts/plugins/**/*.js', 
                '<%= project.sources_path %>scripts/main/**/*.js'],
        tasks: ['concat']
      },
      // Process CSS with Less
      less: {
        files: ['<%= project.sources_path %>less/*.less', 
                '<%= project.sources_path %>less/**/*.less', 
                '<%= project.sources_path %>less/**/**/*.less'], 
        tasks: ['less']
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-contrib-csslint');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-html-build');
  grunt.loadNpmTasks('grunt-svgstore');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('dev', ['svgstore', 'concat', 'less', 'htmlbuild']);

  grunt.registerTask('commit', ['svgstore', 'jshint:beforeconcat', 'concat', 'jshint:afterconcat', 'less', 'autoprefixer', 'csslint', 'htmlbuild']);

}; // wrapper
