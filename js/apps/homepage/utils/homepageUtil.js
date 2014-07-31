define( function ( require ) {
	'use strict';

	var App      = require( 'App' );
	var Backbone = require( 'backbone' );

	var manifest              = require( 'apps/homepage/manifest' );
	var SectionCollectionView = require( 'apps/homepage/views/SectionCollectionView' );

	function setUserProfileReqres ( model ) {
		App.reqres.setHandler( 'homepage:userProfile', function () {
			return model;
		} );
	}

	return {
		'loadHomepage' : function ( layout ) {

			if ( App.request( 'homepage:isHomeRoute' ) ) {
				setUserProfileReqres( App.request( 'session:personnel' ) );

				var externalSections = manifest();
				var collection       = new Backbone.Collection( externalSections );
				var sectionView      = new SectionCollectionView( {
					'collection' : collection
				} );

				if ( layout.contentRegion ) {
					layout.contentRegion.show( sectionView );
				}
			}

		}
	};
} );
