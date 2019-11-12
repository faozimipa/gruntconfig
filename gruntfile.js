module.exports = function (grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        separator: ';'
      },
      components: {
        src: ['www/components/**/*.js'],
        dest: 'www/dist/<%= pkg.name %>.js'

      },
      css: {
        src: ['www/css/components/**/*.css'],
        dest: 'www/dist/<%= pkg.name %>.component.css'
      }
    },
    remove_comments: {
      js: {
        options: {
          multiline: false,
          singleline: false,
          keepSpecialComments: false
        },
        src: ['www/components/**/*.js'],
        // dest: 'www/dist/<%= pkg.name %>.js',
        expand: true,
      },
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n',
        compress: {
          drop_console: true
        },
        sourceMap: true,
        sourceMapName: 'pruforceMap.map'
      },
      components: {
        files: {
          'www/dist/components/<%= pkg.name %>.min.js': ['<%= concat.components.dest %>']
        }
      }
      // ,
      // css:{
      //   files: {
      //     'www/dist/css/<%= pkg.name %>.min.js': ['<%= concat.css.dest %>']
      //   }
      // }
    },
    // qunit: {
    //   files: ['www/**/*.html']
    // },
    jshint: {
      files: [ //'Gruntfile.js', 
        'www/components/lms_*/**/*.js'
      ],
      options: {
        //reporter: require('jshint-html-reporter'),
        //  reporterOutput: 'jshint-report.html',
        // options here to override JSHint defaults
        globals: {
          Angular: true,
          jQuery: true,
          console: true,
          module: true,
          document: true
        }
      },
      target: ['file.js']
    },
    watch: {
      files: ['<%= jshint.files %>'],
      tasks: ['jshint']
    },
    ngAnnotate: {
      options: {
        singleQuotes: true,
      },
      // app1: {
      //     files: {
      //         'a.js': ['a.js'],
      //         'c.js': ['b.js'],
      //         'f.js': ['d.js', 'e.js'],
      //     },
      // },
      PRUforce: {
        files: [{
          expand: true,
          src: ['www/components/**/*js']
          //dest: 'www/dist'//,
          // ext: '.annotated.js', // Dest filepaths will have this extension.
          // extDot: 'last',       // Extensions in filenames begin after the last dot
        }],
      },
      // app3: {
      //     files: [
      //         {
      //             expand: true,
      //             src: ['g.js'],
      //             rename: function (dest, src) { return src + '-annotated'; },
      //         },
      //     ],
      // },
    },clean: {
      // folder: ['path/to/dir/'],
      // folder_v2: ['path/to/dir/**'],
      dist: ['www/dist/*'],
      js: ['www/components/**/*.js', 'www/dist/pruforce.js'],
      css: ['www/css/**/*.css', '!www/css/**/*.min.css']
      //componentcss: ['www/*/'],
      // css: ['path/to/dir/*.css'],
      // all_css: ['path/to/dir/**/*.css']
    },
    cssmin: {
      minify: {
        files: [{
          expand: true,
          cwd: 'www/css',
          src: ['**/*.css', '!**/*.min.css'],
          dest: 'www/css',
          ext: '.min.css'
        }]
      },
      options: {
        shorthandCompacting: false,
        roundingPrecision: -1
      }
      //,
      //   combine: {
      //     files: {
      //       'public/assets/styles/style.css': ['!public/assets/styles/**/*.min.css', 'public/assets/styles/**/*.css']
      //     }
      //   }
    },
    replace: {
      indexHtml: {
        src: ['www/index.html'],
        dest: 'www/index.html',
        // options: {
        //   processTemplates: true
        // },
        replacements: [
          // {
          //   from: /css\/components.*\.css/g,
          //   to: function (matchedWord,index,fullText,regexMatches) {

          //     try{
          //       matchedWord = matchedWord.slice(0,-4);
          //       matchedWord = matchedWord+".min.css";
          //       console.log(matchedWord);
          //     }catch(err){
          //       console.log("error on: "+matchedWord);
          //       console.log(err);
          //     }

          //     return matchedWord;
          //   }
          // },
          {
            from: /.*src\=\"components.*/g,
            to: function (matchedWord, index, fullText, regexMatches) {
              console.log(matchedWord);
              return "";
            }
          },
          {
            from: "<!--js change here-->",
            to: function (matchedWord, index, fullText, regexMatches) {
              console.log(matchedWord);
              return "<script src=\"dist/components/<%= pkg.name %>.min.js\"></script>";
            }
          }

        ]
      }
    },
    unused: {
      options: {
        reference: 'www/img/',
        directory: ['www/dist/components/**/*.js', 'www/components/**/*.html', 'www/css/**/*.css', 'www/lib/*'],
        days: 1,
        remove: true, // set to true to delete unused files from project
        reportOutput: 'report.txt', // set to false to disable file output
        fail: false // set to true to make the task fail when unused files are found
      },
      //IONIC
      // options: {
      //   reference: 'www/img/ionic',
      //   directory: ['www/components/**/*.js','www/components/**/*.html','www/css/**/*.css', 'www/lib/*'],
      //   days: 30,
      //   remove: false, // set to true to delete unused files from project
      //   reportOutput:'report.txt', // set to false to disable file output
      //   fail: false // set to true to make the task fail when unused files are found
      // },
      ///img/lms
      // options: {
      //   reference: 'www/img/lms',
      //   directory: ['www/components/**/*.js','www/components/**/*.html','www/css/**/*.css', 'www/lib/*'],
      //   days: 30,
      //   remove: false, // set to true to delete unused files from project
      //   reportOutput:'report.txt', // set to false to disable file output
      //   fail: false // set to true to make the task fail when unused files are found
      // },
    },
    eslint: {
      target: ['www/components/**/*js']
    }

  });


  grunt.loadNpmTasks('grunt-contrib-uglify-es');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-remove-comments');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-ng-annotate');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-text-replace');
  grunt.loadNpmTasks('grunt-unused');
  grunt.loadNpmTasks('grunt-eslint');

  grunt.registerTask('eslint-check', ['eslint']);
  grunt.registerTask('annotate', ['ngAnnotate']);
  grunt.registerTask('jshint-check', ['jshint']);
  grunt.registerTask('manualcheck', ['jshint']);
  grunt.registerTask('concatcss', ['concat:css']);
  grunt.registerTask('production', ['clean:dist', 'ngAnnotate', 'concat:components', 'uglify', 'clean:js', 'replace:indexHtml']); //,'clean:css']);
  grunt.registerTask('default', ['jshint', 'concat', 'uglify']);

  grunt.registerTask('cssmin-minify', ['cssmin:minify']);
  grunt.registerTask('clean-css', ['clean:css']);
  grunt.registerTask("replaces", ['replace']);
  grunt.registerTask('unuseds', ['unused']);

  grunt.registerTask('automaticcheck', ['watch']);

};
