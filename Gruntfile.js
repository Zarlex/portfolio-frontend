(function () {
    'use strict';

    var lrSnippet = require('grunt-contrib-livereload/lib/utils').livereloadSnippet;
    var mountFolder = function (connect, dir) {
        return connect.static(require('path').resolve(dir));
    };

    module.exports = function (grunt) {
        // load all grunt tasks
        require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

        // configurable paths
        var yeomanConfig = {
            app: 'app',
            dist: 'dist'
        };

        grunt.initConfig({
                yeoman: yeomanConfig,
                watch: {
                    compass: {
                        files: ['<%= yeoman.app %>/styles/{,*/}*.scss', '<%= yeoman.app %>/modules/**/*.scss'],
                        tasks: ['compass']
                    },
                    livereload: {
                        files: [
                            '<%= yeoman.app %>/**/*.html',
                            '{.tmp,<%= yeoman.app %>}/modules/**/{,*/}*.js',
                            '<%= yeoman.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
                        ],
                        tasks: ['livereload']
                    }
                },
                connect: {
                    options: {
                        port: 9000,
                        // Change this to '0.0.0.0' to access the server from outside.
                        hostname: '0.0.0.0'
                    },
                    livereload: {
                        options: {
                            middleware: function (connect) {

                                return [
                                    //screenShotSnipet,
                                    lrSnippet,
                                    mountFolder(connect, '.tmp'),
                                    mountFolder(connect, yeomanConfig.app)
                                ];

                            }
                        }
                    },
                    combined: {
                        combine: [
                            'livereload',
                            'livereload2'
                        ]
                    },
                    dist: {
                        options: {
                            port: 9009,
                            middleware: function (connect) {
                                return [
                                    mountFolder(connect, yeomanConfig.dist)
                                ];
                            }
                        }
                    }
                },
                clean: {
                    dist: {
                        files: [
                            {
                                dot: true,
                                src: [
                                    '.tmp',
                                    '<%= yeoman.dist %>/*',
                                    '!<%= yeoman.dist %>/.git*'
                                ]
                            }
                        ]
                    },
                    server: '.tmp',
                    docs: 'docs'
                },
                jshint: {
                    options: {
                        jshintrc: '.jshintrc'
                    },
                    all: [
                        'Gruntfile.js',
                        '<%= yeoman.app %>/modules/**/{,*/}*.js',
                        '!<%= yeoman.app %>/modules/**/node_modules/**/{,*/}*.js',
                        '!<%= yeoman.app %>/modules/**/src/**/{,*/}*.js',
                    ]
                },
                compass: {
                    options: {
                        sassDir: '<%= yeoman.app %>/styles',
                        cssDir: '.tmp/styles',
                        imagesDir: '<%= yeoman.app %>/modules',
                        javascriptsDir: '<%= yeoman.app %>/modules',
                        fontsDir: '<%= yeoman.app %>/fonts',
                        importPath: ['<%= yeoman.app %>/components', '<%= yeoman.app %>/modules'],
                        relativeAssets: true
                    },
                    dist: {},
                    server: {
                        options: {
                            debugInfo: true
                        }
                    }
                },
                useminPrepare: {
                    portfolio: {
                        src: ['<%= yeoman.app %>/index.html'],
                        options: {
                            dest: '<%= yeoman.dist %>'
                        }
                    }
                },
                usemin: {
                    html: ['<%= yeoman.dist %>/**/{,*/}*.html'],
                    css: ['<%= yeoman.dist %>/styles/{,*/}*.css'],
                    options: {
                        dirs: ['<%= yeoman.dist %>']
                    }
                },
                imagemin: {
                    dist: {
                        files: [
                            {
                                expand: true,
                                cwd: '<%= yeoman.app %>/images',
                                src: '**/{,*/}*.{png,jpg,jpeg}',
                                dest: '<%= yeoman.dist %>/images'
                            }
                        ]
                    }
                },
                cssmin: {
                    dist: {
                        files: {
                            '<%= yeoman.dist %>/styles/main.css': [
                                '.tmp/styles/{,*/}*.css'
                            ]
                        }
                    }
                },
                cdnify: {
                    dist: {
                        html: ['<%= yeoman.dist %>/*.html']
                    }
                },
                ngmin: {
                    dist: {
                        files: [
                            {
                                expand: true,
                                cwd: '<%= yeoman.dist %>/modules',
                                src: '*.js',
                                dest: '<%= yeoman.dist %>/modules'
                            }
                        ]
                    }
                },
                uglify: {
                    options: {
                        mangle:true //obfuscation
                    }
                },
                rev: {
                    dist: {
                        files: {
                            src: [
                                '<%= yeoman.dist %>/modules/{,*/}*.js',
                                '<%= yeoman.dist %>/styles/{,*/}*.css'
                            ]
                        }
                    }
                },
                copy: {
                    dist: {
                        files: [
                            {
                                expand: true,
                                dot: true,
                                cwd: '<%= yeoman.app %>',
                                dest: '<%= yeoman.dist %>',
                                src: [
                                    '*.{ico,txt,png}',
                                    '.htaccess',
                                    'modules/i18n/*',
                                    'modules/**/images/{,*/}*.{gif,webp,jpg,png}'
                                ]
                            }
                        ]
                    },
                    tmp: {
                        expand: true,
                        cwd: '<%= yeoman.app %>',
                        src: ['*.html'],
                        dest: '<%= yeoman.dist %>'
                    },
                    fonts: {
                        files: [
                            { expand: true, cwd: '<%= yeoman.app %>/components/bootstrap-sass', src: 'fonts/**/*', dest: '<%= yeoman.app %>' },
                            { expand: true, cwd: '<%= yeoman.app %>/components/font-awesome', src: 'fonts/**/*', dest: '<%= yeoman.app %>' }
                        ]
                    }
                },
                replace: {
                    bumpVersion: {
                        src: ['app/modules/common/services/config_service.js'],
                        overwrite: true,                 // overwrite matched source files
                        replacements: [
                            {
                                from: /version = '(\d+\.\d+.\d+ r)(\d+)'/,
                                to: function (match, index, fullText, regexMatches) {
                                    var inc = parseInt(regexMatches[1], 0);
                                    inc++;
                                    var version = 'version = \'' + regexMatches[0] + '' + inc + '\'';
                                    return version;
                                }
                            },
                            {
                                from: /lastBuildTime = '\d*'/,
                                to: function () {
                                    return 'lastBuildTime = \'' + (+new Date()) + '\'';
                                }
                            }
                        ]
                    }
                },
                ngtemplates: {
                    app: {
                        src: '<%= yeoman.app %>/modules/**/*.html',
                        dest: '.tmp/concat/modules/portfolio.ui.js',
                        options: {
                            url: function (url) {
                                return url.replace('app/', '');
                            },
                            bootstrap: function (module, script) {
                                return 'angular.module("Portfolio").run(["$templateCache", function($templateCache) {' + script + '}]);';
                            }
                        }
                    }
                },
                shell: {

                    canvas: {
                        options: {
                            stdout: true,
                            failOnError: true,
                            callback: function (/*err, stdout, stderr, cb*/) {

                            }
                        },
                        command: 'cd app/modules/zx_canvas; grunt;'
                    },
                    backbone: {
                        options: {
                            stdout: true,
                            failOnError: true,
                            callback: function (/*err, stdout, stderr, cb*/) {

                            }
                        },
                        command: 'cd app/modules/zx_backbone; grunt;'
                    }
                }
            }
        );

        grunt.renameTask('regarde', 'watch');

        grunt.registerTask('server', [
            'copy:fonts',
            'clean:server',
            'compass:server',
            'livereload-start',
            'connect:livereload',
            'watch'
        ]);

        grunt.registerTask('build', [
            'clean:dist',
            'jshint',
            'compass:dist',
            'useminPrepare',
            'imagemin',
            'copy:tmp',
            'concat',
            'ngtemplates',
            'copy:dist',
            'cdnify',
            'cssmin',
            'ngmin',
            'uglify',
            'rev',
            'usemin'
        ]);

        grunt.registerTask('default', ['server']);
    };

}());