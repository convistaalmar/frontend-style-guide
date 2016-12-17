/*!
 * CVAM's Frontend Style Guide
 * https://github.com/convistaalmar/frontend-style-guide
 * Copyright 2014 Con Vista Al Mar SRL
 * Licensed under MIT (https://github.com/convistaalmar/frontend-style-guide/blob/master/LICENSE)
 */

module.exports = function(grunt) {
  'use strict';

  var project = grunt.file.readJSON('project.json');

  // Force use of Unix newlines
  grunt.util.linefeed = '\n';

  // Project configuration
  grunt.initConfig({

    // Get project config
    project: project,

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
          '<%= project.dest_path %>css/styles.css':'<%= project.src_path %>less/styles.less',
          '<%= project.dest_path %>css/samples.css':'<%= project.src_path %>less/samples.less'
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
        src: ['<%= project.dest_path %>css/styles.css', '<%= project.dest_path %>css/samples.css']
      }
    },

    // CSS Linting
    // Docs: https://github.com/gruntjs/grunt-contrib-csslint
    csslint: {
      options: {
        csslintrc: '<%= project.src_path %>less/.csslintrc'
      },
      src: ['<%= project.dest_path %>css/*.css', '!<%= project.dest_path %>css/*.min.css']
    },

    // CSS minification
    // Docs: https://github.com/gruntjs/grunt-contrib-cssmin
    cssmin: {
      options: {
        shorthandCompacting: false,
        roundingPrecision: -1
      },
      target: {
        files: {
          '<%= project.dest_path %>css/styles.min.css': '<%= project.dest_path %>css/styles.css'
        }
      }
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
          '<%= project.dest_path %>js/plugins.js': '<%= project.src_path %>scripts/plugins/**/*.js',
          '<%= project.dest_path %>js/main.js': '<%= project.src_path %>scripts/main/**/*.js'
        }
      }
    },

    // JS linting
    // Docs: https://github.com/gruntjs/grunt-contrib-jshint
    jshint: {
      options: {
        jshintrc: '<%= project.src_path %>scripts/.jshintrc'
      },
      beforeconcat: ['<%= project.src_path %>scripts/plugins/**/*.js', '<%= project.src_path %>scripts/main/**/*.js'],
      afterconcat: ['<%= project.dest_path %>js/plugins.js', '<%= project.dest_path %>js/main.js']
    },

    // Uglify JS
    // Docs: https://github.com/gruntjs/grunt-contrib-uglify
    // TODO!
    uglify: {
      default: {
        files: {
          '<%= project.dest_path %>js/plugins.min.js': '<%= project.dest_path %>js/plugins.js', 
          '<%= project.dest_path %>js/main.min.js': '<%= project.dest_path %>js/main.js'
        }
      }
    },

    // Copy vendor scripts
    // Docs: https://github.com/gruntjs/grunt-contrib-copy
    copy: {
      jquery: {
        expand: true,
        cwd: '<%= project.vendor_path.jquery.src %>',
        src: '*',
        dest: '<%= project.vendor_path.jquery.dest %>',
      },
      modernizr: {
        src: '<%= project.vendor_path.modernizr.src %>modernizr.js',
        dest: '<%= project.vendor_path.modernizr.dest %>modernizr.js'
      }
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
            '<%= project.dest_path %>svg/icons.svg': ['<%= project.src_path %>icons/*.svg']
          },
        }
    },

    // Static HTML build
    // Docs: https://github.com/spatools/grunt-html-build
    htmlbuild: {
        options: {
          scripts: {
            head: '<%= project.vendor_path.modernizr.dest %>modernizr.js',
            body: [
              '<%= project.vendor_path.jquery.dest %>jquery.js',
              '<%= project.dest_path %>js/plugins.js',
              '<%= project.dest_path %>js/main.js'
            ]
          },
          sections: {
            head: '<%= project.src_path %>sections/head.html',
            header: '<%= project.src_path %>sections/header.html',
            footer: '<%= project.src_path %>sections/footer.html',
            foot: '<%= project.src_path %>sections/foot.html',
            icons: '<%= project.dest_path %>svg/icons.svg',
            plugins:'<%= project.src_path %>sections/plugins.html'
          },
          data: {
            lang: '<%= project.lang %>',
            title: '<%= project.title %>',
            assets_path: '<%= project.root_path %><%= project.assets_path %>'
          }
        },
      default: {
        options: {
          styles: {
            styles: '<%= project.dest_path %>css/styles.css'
          }
        },
        src: '<%= project.src_path %>pages/*.html',
        dest: '<%= project.html_path %>',
      },
      samples: {
        options: {
          styles: {
            styles: '<%= project.dest_path %>css/samples.css'
          }
        },
        src: '<%= project.src_path %>samples/*.html',
        dest: '<%= project.html_path %>samples/',
      },
      release: {
        options: {
          styles: {
            styles: '<%= project.dest_path %>css/styles.min.css'
          },
          scripts: {
            head: '<%= project.vendor_path.modernizr.dest %>modernizr.js',
            body: [
              '<%= project.vendor_path.jquery.dest %>jquery.min.js',
              '<%= project.dest_path %>js/plugins.min.js',
              '<%= project.dest_path %>js/main.min.js'
            ]
          }
        },
        src: '<%= project.src_path %>pages/*.html',
        dest: '<%= project.html_path %>',
      }
    },

    // HTML minify
    // Docs: https://github.com/gruntjs/grunt-contrib-htmlmin
    // TODO!
    htmlmin: {
      default: {
        options: {
          removeComments: true,
          collapseWhitespace: true
        },
        files: (function (path) {
          var result = {};
          grunt.file.recurse(path, function callback(abspath, rootdir, subdir, filename) {
            if (filename.indexOf('.html') > 0 && subdir != 'samples') {
              result[abspath] = abspath;
            }
          });
          return result;
        })(project.html_path)
      }
    },

    // Watch tasks
    // Docs: https://www.npmjs.org/package/grunt-contrib-watch
    watch: {
      jquery: {
        files: ['<%= project.vendor_path.jquery.src %>'],
        tasks: ['copy:jquery']
      },
      modernizr: {
        files: ['<%= project.vendor_path.modernizr.src %>'],
        tasks: ['copy:modernizr']
      },
      svg: {
        files: ['<%= project.src_path %>icons/*.svg'],
        tasks: ['svgstore']
      },
      html: {
        files: ['<%= project.src_path %>pages/*.html',
                '<%= project.src_path %>sections/*.html',
                '<%= project.dest_path %>svg/*.svg'],
        tasks: ['htmlbuild']
      },
      samples: {
        files: ['<%= project.src_path %>samples/*.html'],
        tasks: ['htmlbuild:samples']
      },
      js: {
        files: ['<%= project.src_path %>scripts/plugins/*.js', 
                '<%= project.src_path %>scripts/main/*.js',
                '<%= project.src_path %>scripts/plugins/**/*.js', 
                '<%= project.src_path %>scripts/main/**/*.js'],
        tasks: ['concat']
      },
      // Process CSS with Less
      less: {
        files: ['<%= project.src_path %>less/*.less', 
                '<%= project.src_path %>less/**/*.less', 
                '<%= project.src_path %>less/**/**/*.less'], 
        tasks: ['less']
      }
    },

    htmllint: {
      default: {
        options: {
        },
        src: ['<%= project.html_path %>*.html', '<%= project.html_path %>**/*.html']
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-contrib-csslint');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-svgstore');
  grunt.loadNpmTasks('grunt-html-build');
  grunt.loadNpmTasks('grunt-html');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('htmlbuild:development', ['htmlbuild:default', 'htmlbuild:samples']);

  grunt.registerTask('update:vendor', ['copy']);
  grunt.registerTask('update:assets', ['less', 'concat', 'svgstore', 'htmlbuild:development']);

  grunt.registerTask('update', ['update:vendor', 'update:assets']);
  grunt.registerTask('commit', ['less', 'autoprefixer', 'csslint', 'jshint:beforeconcat', 'concat', 'jshint:afterconcat', 'svgstore', 'htmlbuild:development', 'htmllint']);
  grunt.registerTask('release', ['less', 'autoprefixer', 'csslint', 'cssmin', 'jshint:beforeconcat', 'concat', 'jshint:afterconcat', 'uglify', 'svgstore', 'htmlbuild:release', 'htmlmin']);

}; // wrapper
