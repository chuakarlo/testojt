( function () {
	'use strict';

	define( function ( require ) {

		// polyfill for Function.prototype.bind
		require( 'polyfills/function' );

		require( 'App' );
		require( 'ColdFusion' );
		require( 'jquery-cookie' );
		require( 'jquery-placeholder' );

		var sinon        = require( 'sinon-chai' );
		var suite        = require( 'spec/suite' );
		var chaiBackbone = require( 'chai-backbone' );
		var chaiChanges  = require( 'chai-changes' );

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

		//Load Homepage Widget Module first
		require( 'common/views' );
		require( '../js/apps/homepage/external/widgets/manifest' );

	} );

} ).call( this );
