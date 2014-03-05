'use strict';

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

	grunt.registerTask( 'test', 'run tests for public scripts', [ 'mocha_phantomjs:public-test' ] );
};