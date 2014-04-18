define( function ( require ) {
	'use strict';

	var Session  = require( 'Session' );
	var Remoting = require( 'Remoting' );
	var App      = require( 'App' );
	var $        = require( 'jquery' );
	var _        = require( 'underscore' );
	var Backbone = require( 'backbone' );

	var userData              = require( 'apps/homepage/configuration/userDataLookup' );
	var HomeView              = require( 'apps/homepage/views/BaseItemView' );
	var NullView              = require( 'apps/homepage/views/BaseEmptyView' );
	var manifest              = require( 'apps/homepage/manifest' );
	var SectionCollectionView = require( 'apps/homepage/views/SectionCollectionView' );
	var DistrictMessageView   = require( 'apps/homepage/views/DistrictMessageView' );
	var DistrictMessageModel  = require( 'apps/homepage/entities/DistrictMessageModel' );



	function hasOwnProperty ( object, key, value ) {
		return object && object.hasOwnProperty( key ) ? object[ key ] : value;
	}

	function setUserTags ( model ) {
		var userTags = [];

		var GradeLevelId     = hasOwnProperty( model, 'GradeLevelId', 0 );
		var EducationLevelId = hasOwnProperty( model, 'EducationLevelId', 0 );
		var EducatorType     = hasOwnProperty( model, 'EducatorType', '' );
		var CCSubjectId      = hasOwnProperty( model, 'CCSubjectId', 0 );

		if( GradeLevelId !== 0 ) {
			userTags.push( userData.gradeLevels[ GradeLevelId ] );
		}
		if( EducationLevelId !== 0 ) {
			userTags.push( userData.gradeLevels[ EducationLevelId ] );
		}
		if( EducatorType !== '' ) {
			userTags.push( userData.educatorTypes[ EducatorType ] );
		}
		if( CCSubjectId !== 0 ) {
			userTags.push( userData.subjects[ CCSubjectId ] );
		}

		return userTags.join(',');
	}

	App.module( 'Homepage.Show', function ( Show ) {

		// to show the user's personal info, grab the ClientPersonnel object
		function clientProfileParams( personnelId ) {
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
			} ];
		}

		Show.Controller = {
			'showHomepage' : function () {

				var fetchingModels = Remoting.fetch( clientProfileParams( Session.personnelId() ) );

				var homeLayout = new HomeView();

				App.content.show( homeLayout );

				// we can show loading here if we want.

				// Fetch the models required to display the content
				$.when( fetchingModels ).done( function ( models ) {

					App.reqres.setHandler( 'homepage:userProfile', function () {
						return models[0];
					} );

					App.reqres.setHandler( 'homepage:userTags', function () {
						return setUserTags( models[1] );
					} );


					// Generate the sub views?
					var externalSections = manifest();
					var collection       = new Backbone.Collection(externalSections);
					var sectionView      = new SectionCollectionView( {
						'collection': collection
					} );

					homeLayout.contentRegion.show(sectionView);


				} ).fail( function ( error ) {

					App.content.show( new NullView() );

				} );

				// Check to see if they have a district message
				var licenses = App.request( 'user:licenses' );
				$.when( licenses ).done( function( licenses ) {

					var ids = licenses.pluck('LicenseId');
					var districtMessageModel = new DistrictMessageModel( {
						'licIds' : ids
					} );

					districtMessageModel.fetch( {

						'success' : function( model ) {
							if ( model.isValidMessage() ) {
								var districtMessageView = new DistrictMessageView( {
									'model' : model
								} );
								homeLayout.messageRegion.show( districtMessageView );
							}
						}
					} );

				} );


			}

		};

	} );

} );