'use strict';

module.exports = function ( grunt ) {

	grunt.loadNpmTasks( 'grunt-contrib-less' );
	grunt.loadNpmTasks( 'assemble-less' );
	grunt.loadNpmTasks( 'grunt-contrib-requirejs' );

	var lessFiles = {
		'css/styles.min.css' : [ 'css/styles.less' ]
	};

	grunt.config.set( 'less', {
		'compile' : {
			'files' : lessFiles,

			'options' : {
				'compress' : true,
				'ieCompat' : true
			}
		}
	} );

	grunt.config.set( 'requirejs', {
		'compile' : {
			'options' : {
				'baseUrl'                 : 'js/',
				'mainConfigFile'          : 'js/config/require.js',
				'out'                     : 'js/main.min.js',
				'optimize'                : 'uglify2',
				'include'                 : 'main',
				'findNestedDependencies'  : true,
				'insertRequire'           : [ 'main' ],
				'generateSourceMaps'      : true,
				'preserveLicenseComments' : false
			}
		}
	} );

	grunt.registerTask( 'compile', 'compiles f/e', function () {
		grunt.task.run( [ 'compile:js', 'compile:less', 'bust', 'meta-data', 'bugsnag' ] );
	} );

	grunt.registerTask( 'compile:js', 'compiles f/e with requirejs optimizer (r.js)', [ 'requirejs' ] );

	grunt.registerTask( 'uglify:js', 'uglifies main.compile.js', [ 'uglify:requirejs' ] );

	grunt.registerTask( 'compile:less', 'compiles LESS source to CSS', [ 'less' ] );

};
