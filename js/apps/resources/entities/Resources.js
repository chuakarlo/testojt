define( function ( require ) {
	'use strict';

	var Backbone = require( 'backbone' );
	var App      = require( 'App' );
	var Remoting = require( 'Remoting' );
	var Session  = require( 'Session' );
	var $        = require( 'jquery' );

	App.module( 'Entities', function ( Entities ) {

		Entities.Resources = Backbone.Model.extend();

		Entities.ResourcesCollection = Backbone.Collection.extend( {
			'model'      : Entities.Resources,
			'comparator' : 'name'
		} );

		var initializeResources = function () {

			Entities.resources = new Entities.ResourcesCollection( [
				{
					'name' : 'Videos',
					'url'  : 'resources/videos',
					'icon' : 'fa-youtube-play',
					'id'   : 'link-more-videos'
				},
				{
					'name' : 'Learning Targets',
					'url'  : 'resources/learning',
					'icon' : 'fa-bullseye',
					'id'   : 'link-more-targets'
				},
				{
					'name' : 'Observation 360',
					'url'  : 'resources/observation/me',
					'icon' : 'fa-eye',
					'id'   : 'link-more-observation'
				},
				{
					'name' : 'Communities',
					'url'  : 'resources/communities',
					'icon' : 'fa-users',
					'id'   : 'link-more-communities'
				},
				{
					'name' : 'LumiBook',
					'url'  : 'resources/lumibook',
					'icon' : 'fa-book',
					'id'   : 'link-more-lumibook'
				},
				{
					'name' : '{User Video Uploader}',
					'url'  : '',
					'icon' : 'fa-film',
					'id'   : 'link-more-uploader'
				},
				{
					'name' : '{Training}',
					'url'  : '',
					'icon' : 'fa-bullhorn',
					'id'   : 'link-more-training'
				},
				{
					'name' : '{Learning Progression}',
					'url'  : '',
					'icon' : 'fa-puzzle-piece',
					'id'   : 'link-more-progression'
				}

			] );

		};

		var API = {

			'getResources' : function () {

				if ( Entities.resources === undefined ) {

					var defer = $.Deferred();

					initializeResources();

					var adminRequest    = App.request( 'user:roles' );
					var thereNowRequest = App.request( 'user:isThereNow' );

					$.when( adminRequest, thereNowRequest ).done( function ( isAdmin, isThereNow ) {

						if ( isAdmin === true ) {

							var adminModel = new Entities.Resources( {
								'name' : '{Admin}',
								'icon' : 'fa-wrench',
								'url'  : '',
								'id'   : 'link-more-admin'
							} );

							Entities.resources.add( adminModel );
						}

						// only make request if they have access
						if ( isThereNow ) {

							// request the link containing the token for thereNow
							var thereNowRequest = {
								'path'   : 'com.schoolimprovement.pd360.dao.AdminService',
								'method' : 'genThereNowTokenandURL',
								'args'   : {
									'personnelId' : Session.personnelId()
								}
							};

							var requests     = [ thereNowRequest ];
							var fetchingData = Remoting.fetch( requests );

							$.when( fetchingData ).done( function ( results ) {

								var thereNowResult = results [ 0 ];
								var thereNowToken  = thereNowResult.url.replace( '{token}', thereNowResult.Token );
								var thereNowUrl    = thereNowToken.replace( '{action}{id}{tag}', 'index' );

								// create link in more resources menu
								var adminModel = new Entities.Resources( {
									'name' : 'ThereNow',
									'icon' : 'fa-hand-o-right',
									'url'  : thereNowUrl,
									'id'   : 'link-more-thereNow'
								} );

								Entities.resources.add( adminModel );

								defer.resolve( Entities.resources );

							} );

						} else {
							defer.resolve( Entities.resources );
						}

					} );

					return defer.promise();
				}

				return Entities.resources;

			}

		};

		App.reqres.setHandler( 'resource:entities', function () {
			return API.getResources();
		} );

	} );

} );
