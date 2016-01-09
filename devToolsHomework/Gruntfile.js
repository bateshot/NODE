module.exports = function(grunt) {
  'use strict';
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    coffee: {
      serve: {
        expand: true,
        flatten: true,
        cwd: 'APP',
        src: ['*.coffee'],
        dest: 'DEV/scripts',
        ext: '.js'
      },
      build:{
        expand: true,
        flatten: true,
        cwd: 'APP',
        src: ['*.coffee'],
        dest: 'DEV/compiled',
        ext: '.js'
      }

    },
    jshint: {
      serve: ['Gruntfile.js', 'DEV/scripts/*.js'],
      build:['DEV/compiled/*.js']
    },
    jade: {
      serve: {
        options: {
          data: {
            debug: false
          }
        },
        files: {
          "DEV/home.html": "APP/home.jade",
          "DEV/index.html": "APP/index.jade"
        }
      },
      build: {
        options: {
          data: {
            debug: false
          }
        },
        files: {
          "DIST/home.html": "APP/home.jade",
          "DIST/index.html": "APP/index.jade"
        }
      }
    },
    stylus: {
      serve: {
        files: {
          "DEV/styles/colors.css": "APP/colors.styl",
          "DEV/styles/mixins.css": "APP/mixins.styl",
          "DEV/styles/style.css": "APP/style.styl"
        }
      },
      build: {
        expand: true,
        flatten: true,
        cwd: 'APP/',
        src: '*.styl',
        dest: 'DEV/compiled',
        ext: '.css'
      }
    },
    copy: {
      serve: {
        files: [
          {expand: true, cwd: './APP/images/', src: ['*.*'], dest: './DEV/images'}
        ]
      },
      build: {
        files: [
          {expand: true, cwd: './APP/images/', src: ['*.*'], dest: './DIST/images'}
        ]
      }
    },
    connect: {
      server: {
        options: {
          port: 9578,
          directory: './DEV',
          //keepalive: true,
          hostname: '*',
          onCreateServer: function(server, connect, options) {
            var io = require('socket.io').listen(server);
            io.sockets.on('connection', function(socket) {
              // do something with socket
            });
          }
        }
      }
    },
    watch: {
      options: {
        livereload: true,
      },
      css: {
        files: ['APP/*.styl'],
        tasks: ['stylus']
      },
      js: {
        files: ['APP/*.coffee'],
        tasks: ['coffee']
      },
      jade: {
        files: ['APP/*.jade'],
        tasks: ['jade']
      }
    },
    csslint: {
      src: ['DEV/compiled/*.css']
    },
    cssmin: {
      options: {
        shorthandCompacting: false,
        roundingPrecision: -1
      },
      target: {
        files: {
          'DIST/styles/styles.min.css': ['DEV/compiled/*.css']
        }
      }
    },
    uglify: {
      options: {
        mangle: true
      },
      my_target: {
        files: {
          'DIST/scripts/script.min.js': ['DEV/compiled/*.js']
        }
      }
    },
    htmlmin: {
      all: {
        options: {
          removeComments: true,
          collapseWhitespace: true
        },
        files: {
          'DIST/index.html': 'DIST/index.html',
          'DIST/home.html': 'DIST/home.html'
        }
      },
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-contrib-stylus');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-csslint');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');


  grunt.registerTask('Serve', ['coffee:serve', 'jshint:serve', 'jade:serve', 'stylus:serve', 'copy:serve', 'connect', 'watch']);
  grunt.registerTask('Build', ['coffee:build', 'jshint:build', 'jade:build' , 'stylus:build', 'csslint', 'cssmin', 'uglify', 'htmlmin', 'copy:build']);
  grunt.registerTask('default', ['Serve']);

};
