(function () {
    'use strict';

    module.exports = function (grunt) {
        // load all grunt tasks
        require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);


        // configurable paths
        var yeomanConfig = {
            app: 'src',
            dist: 'dist'
        };

        grunt.initConfig({
                yeoman: yeomanConfig,
                watch: {
                    js: {
                        files: [
                            '<%= yeoman.app %>/**/{,*/}*.js'
                        ],
                        tasks: ['preprocess:js']
                    }
                },
                jshint: {
                    options: {
                        jshintrc: '.jshintrc'
                    },
                    all: [
                        'Gruntfile.js',
                        '<%= yeoman.app %>/**/{,*/}*.js',
                        'spec/**/{,*/}*.js'
                    ]
                },
                preprocess: {
                    js: {
                        src: '<%= yeoman.app %>/zx_timeline.js',
                        dest: '<%= yeoman.dist %>/zx_timeline.js'
                    }
                }
            }
        );

        grunt.renameTask('regarde', 'watch');

        grunt.registerTask('build', [
            'jshint',
            'preprocess'
        ]);

        grunt.registerTask('default', ['build','watch']);
    };

}());