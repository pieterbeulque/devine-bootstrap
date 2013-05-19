var jspaths = [
        'src/js-dev/Settings.js',
        'src/js-dev/model/*.js',
        'src/js-dev/view/*.js',
        'src/js-dev/collection/*.js',
        'src/js-dev/App.js',
        'src/js-dev/main.js'
    ], csspaths = [
        'src/sass/*.scss'
    ], templatepaths = [
        'src/templates/*.hbs'
    ], concatpaths = ['src/js/templates.js'].concat(jspaths);

module.exports = function (grunt) {
    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        concat: {
            options: {
                banner: '(function(){\n\n',
                footer: '\n\n})();',
                separator: '\n\n'
            },
            dist: {
                src: concatpaths,
                dest: 'src/js/main.js'
            }
        },

        watch: {
            scripts: {
                files: jspaths,
                tasks: ['jshint', 'handlebars', 'concat', 'clean']
            },
            css: {
                files: csspaths,
                tasks:['compass:development']
            },
            handlebars: {
                files: templatepaths,
                tasks: ['handlebars','concat','clean']
            }
        },

        uglify: {
            default: {
                options: {
                    wrap: true
                },
                files: {
                    'out/js/main.js': concatpaths
                }
            }
        },

        compass: {
            development: {
                options: {
                    sassDir: 'src/sass',
                    cssDir: 'src/css',
                    environment: 'development'
                }
            },
            production: {
                options: {
                    sassDir: 'src/sass',
                    cssDir: 'out/css',
                    environment: 'production',
                    outputStyle: 'compressed',
                    force: true
                }
            }
        },

        copy: {
            production: {
                files: [
                    {
                        expand: true,
                        cwd: 'src/',
                        src: ['index.html', 'images/*', 'js/vendor/*'],
                        dest: 'out/'
                    }
                ]
            }
        },

        handlebars: {
            compile: {
                options: {
                    namespace: 'tpl',
                    processName: function (filePath) {
                        var pieces = filePath.split('/');
                        return pieces[pieces.length - 1].split('.')[0];
                    },
                    partialsUseNamespace: true
                },
                files: {
                    'src/js/templates.js': templatepaths
                }
            }
        },

        jshint: {
            default: {
                options: {
                    browser: true,
                    curly: true,
                    eqeqeq: true,
                    eqnull: true,
                    globals: {
                        $: true,
                        _: true,
                        Backbone: true,
                        console: true,
                        Handlebars: true,
                        Settings: true,
                        tpl: true
                    },
                    immed: true,
                    latedef: true,
                    noarg: true,
                    noempty: true,
                    sub: true,
                    trailing: true,
                    undef: true
                },
                files: {
                    src: jspaths
                }
            }
        },

        clean: ['src/js/templates.js']

    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-handlebars');
    grunt.loadNpmTasks('grunt-contrib-jshint');

    grunt.registerTask('default', ['jshint', 'handlebars', 'concat', 'compass:development', 'clean', 'watch']);
    grunt.registerTask('production', ['jshint', 'handlebars', 'uglify', 'compass:production', 'copy:production']);
};