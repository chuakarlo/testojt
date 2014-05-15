'use strict';

var childProcess = require( 'child_process' );

module.exports = function ( grunt ) {

	grunt.loadNpmTasks( 'grunt-mocha-phantomjs' );

	// Config for mocha phantomjs - test and coverage
	grunt.config.set( 'mocha_phantomjs', {

		'public-test' : {
			'options' : {
				'reporter' : 'spec',
				'urls'     : [ 'http://localhost:8080/test/public/index.html' ]
			}
		},

		'public-coverage-json' : {
			'options' : {
				'reporter' : 'json-cov',
				'output'   : 'test/coverage-report/coverage-public.json',
				'urls'     : [ 'http://localhost:8080/test/public/index.html' ]
			}
		},

		'public-coverage-html' : {
			'options' : {
				'reporter' : 'html-cov',
				'output'   : 'test/coverage-report/coverage-public.html',
				'urls'     : [ 'http://localhost:8080/test/public/index.html' ]
			}
		}

	} );

	grunt.registerTask( 'test', 'run all tests', [ 'test:phantomjs' ] );

	grunt.registerTask( 'test:phantomjs', 'run tests for public scripts', 'mocha_phantomjs:public-test' );

	grunt.task.registerTask( 'test:selenium', 'run e2e (selenium tests)', function () {
		var done = this.async();

		childProcess.exec( 'e2e',  function ( error, stdout, stderror ) {
			if ( error || stderror ) {
				grunt.fail.fatal( error || stderror );
			}

			console.log( stdout );
			console.log( stderror );

			done();
		} );
	} );

};
