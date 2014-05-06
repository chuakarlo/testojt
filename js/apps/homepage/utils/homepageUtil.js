define( function ( require ) {
	'use strict';

	var App = require( 'App' );

	var Remoting = require( 'Remoting' );
	var Session  = require( 'Session' );
	var Backbone = require( 'backbone' );

	var NullView              = require( 'apps/homepage/views/BaseEmptyView' );
	var manifest              = require( 'apps/homepage/manifest' );
	var SectionCollectionView = require( 'apps/homepage/views/SectionCollectionView' );

	var setUserTags = require( 'apps/homepage/utils/setUserTags' );

	// to show the user's personal info, grab the ClientPersonnel object
	function clientProfileParams ( personnelId ) {
		return [
			{
				'path'   : 'com.schoolimprovement.pd360.dao.core.ClientPersonnelGateway',
				'method' : 'getById',
				'args'   : {
					'id' : personnelId
				}
			}, {
				'path'   : 'com.schoolimprovement.pd360.dao.core.ClientPersonnelProfileGateway',
				'method' : 'getById',
				'args'   : {
					'id' : personnelId
				}
			}
		];
	}

	function setUserProfileReqres ( model ) {
		App.reqres.setHandler( 'homepage:userProfile', function () {
			return model;
		} );
	}

	function setUserTagsReqRes ( model ) {
		App.reqres.setHandler( 'homepage:userTags', function () {
			return setUserTags( model );
		} );
	}

	return {
		'loadHomepage' : function ( layout ) {
			var fetchingModels = Remoting.fetch( clientProfileParams( Session.personnelId() ) );

			App.when( fetchingModels ).done( function ( models ) {

				setUserProfileReqres( models[ 0 ] );
				setUserTagsReqRes( models[ 1 ] );

				var externalSections = manifest();
				var collection       = new Backbone.Collection(externalSections);
				var sectionView      = new SectionCollectionView( {
					'collection' : collection
				} );

				layout.contentRegion.show(sectionView);

			} ).fail( function ( ) {
				App.content.show( new NullView() );
			} );
		}
	};
} );
