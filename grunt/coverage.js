'use strict';

module.exports = function ( grunt ) {

	grunt.loadNpmTasks( 'grunt-blanket-mocha' );

	grunt.config.set( 'blanket_mocha', {
		'test' : {
			'src' : [ 'test/public/coverage.html' ],

			'options' : {
				'threshold' : 80,
				'log'       : true,
				'logErrors' : true
			}
		}

	} );

	grunt.registerTask( 'coverage', 'blanket_mocha' );

};
