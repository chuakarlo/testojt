( function () {
	'use strict';

	define( function ( require ) {

		require( 'App' );
		require( 'ColdFusion' );
		require( 'jquery-cookie' );
		require( 'jquery-placeholder' );

		var $            = require( 'jquery' );
		var sinon        = require( 'sinon-chai' );
		var suite        = require( 'spec/suite' );
		var chaiBackbone = require( 'chai-backbone' );
		var chaiChanges  = require( 'chai-changes' );

		// on dom ready require all specs and run
		$( function () {

			require( suite.specs, function () {

				window.chai.should();
				window.chai.use( sinon );
				window.chai.use( chaiBackbone );
				window.chai.use( chaiChanges );

				if ( window.mochaPhantomJS ) {
					window.mochaPhantomJS.run();
				} else {
					window.mocha.run();
				}

			} );

		} );

	} );

} ).call( this );
