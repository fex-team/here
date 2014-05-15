module.exports = function(grunt) {

    'use strict';

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        concat: {
            js: {
                src: [
                    'js/*/*.js',
                    'js/*.js'
                ],

                dest: 'dest/app.js'
            },

            css: {
                src: [
                    'css/*/*.css',
                    'css/*.css'
                ],

                dest: 'dest/app.css'
            },

            mobiscrollcss: {
                src: [
                    'lib/mobiscroll/css/mobiscroll.scroller.css',
                    'lib/mobiscroll/css/mobiscroll.scroller.ios7.css',
                    'lib/mobiscroll/css/mobiscroll.animation.css'
                ],

                dest: 'dest/mobiscroll.css'
            },

            mobiscrolljs: {
                src: [
                    'lib/mobiscroll/js/mobiscroll.zepto.js',
                    'lib/mobiscroll/js/mobiscroll.core.js',
                    'lib/mobiscroll/js/mobiscroll.scroller.js',
                    'lib/mobiscroll/js/mobiscroll.datetime.js',
                    'lib/mobiscroll/js/mobiscroll.select.js',
                    'lib/mobiscroll/js/mobiscroll.scroller.ios7.js',
                    'lib/mobiscroll/js/i18n/mobiscroll.i18n.zh.js',
                    'lib/mobiscroll/js/mobiscroll.directive.js'
                ],

                dest: 'dest/mobiscroll.js'
            },

            lib: {
                src: [
                    'lib/js/md5.js',
                    'lib/js/cookie.js',
                    'lib/js/hammer.js',
                    'lib/js/gestures.js',
                    'lib/js/format.js'
                ],

                dest: 'dest/lib.js'
            }
        },

        copy: {
            images: {
                expand: true,
                cwd: 'css/',
                src: 'images/*',
                dest: 'dest/'
            },
            ioniccss: {
                src: 'lib/css/ionic.css',
                dest: 'dest/ionic.css'
            },
            ionicjs: {
                src: 'lib/js/ionic.bundle.js',
                dest: 'dest/ionic.js'
            },
            zepto: {
                src: 'lib/js/zepto.js',
                dest: 'dest/zepto.js'
            },
            font: {
                expand: true,
                cwd: 'lib/',
                src: 'fonts/*',
                dest: 'dest/'
            }
        },

        'string-replace': {
            app: {
                files: {
                    'dest/app-all.js': 'dest/app.js'
                },
                options: {
                    replacements: [{
                        pattern: /templateUrl:\s*"[^"]*"/ig,
                        replacement: function (match, p1, offset, string) {
                            var file = match.replace(/templateUrl:\s*"([^"]*)"/, function($1, $2){return $2});

                            if( !grunt.file.isFile(file) ){
                                return match;
                            }
                            var fileString = grunt.file.read(file).replace(/[\r\n]/g, '').replace(/'/g, '\\\'');

                            return 'template:\'' + fileString + '\'';
                        }
                    }]
                }
            },

            fonts: {
                files: {
                    'dest/ionic-all.css': 'dest/ionic.css'
                },
                options: {
                    replacements: [{
                        pattern: /\.\.\/fonts/ig,
                        replacement: function (match, p1, offset, string) {
                            return 'fonts';
                        }
                    }]
                }
            }
        },

        uglify: {
            options: {
                mangle: true
            },

            js: {
                src: 'dest/app.js',
                dest: 'dest/app.min.js'
            }
        },

        cssmin: {
            minify: {
                expand: true,
                cwd: 'dest/',
                src: ['app.css'],
                dest: 'dest/',
                ext: '.min.css'
            }
        }

    });

    // grunt.loadTasks( 'tasks' );
    
    grunt.loadNpmTasks( 'grunt-string-replace' );

    grunt.loadNpmTasks( 'grunt-contrib-copy' );

    grunt.loadNpmTasks( 'grunt-update-submodules' );

    grunt.loadNpmTasks( 'grunt-contrib-concat' );

    grunt.loadNpmTasks( 'grunt-contrib-uglify' );

    grunt.loadNpmTasks( 'grunt-contrib-cssmin' );

    grunt.registerTask( 'default', [ 'concat', 'string-replace', 'uglify', 'cssmin', 'copy' ]);
};