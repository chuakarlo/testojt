define( function ( require ) {
	'use strict';

	var Backbone = require( 'backbone' );
	var Remoting = require( 'Remoting' );
	var Session  = require( 'Session' );
	var App      = require( 'App' );

	var menuOptions = require( 'resources/data/menus' );

	App.module( 'Entities', function ( Entities ) {

		Entities.Resources = Backbone.Model.extend();

		Entities.ResourcesCollection = Backbone.Collection.extend( {
			'model'      : Entities.Resources,
			'comparator' : 'name'
		} );

		var initializeResources = function () {
			Entities.resources = new Entities.ResourcesCollection( menuOptions.resources );
		};

		var API = {

			'getResources' : function () {

				if ( Entities.resources === undefined ) {

					var defer = App.Deferred();

					initializeResources();

					var adminRequest    = App.request( 'user:isAdmin' );
					var thereNowRequest = App.request( 'user:isThereNow' );
					var obsRequest      = App.request( 'user:hasObsAccess' );


					App.when( adminRequest, thereNowRequest, obsRequest ).done( function ( isAdmin, isThereNow, hasObservation ) {

						if ( isAdmin === true ) {

							var adminModel = new Entities.Resources( menuOptions.admin );

							Entities.resources.add( adminModel );
						}

						if ( hasObservation === true ) {
							Entities.resources.add( new Entities.Resources( menuOptions.observation ) );
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

							App.when( fetchingData ).done( function ( results ) {

								var thereNowResult = results [ 0 ];
								var thereNowToken  = thereNowResult.url.replace( '{token}', thereNowResult.Token );
								var thereNowUrl    = thereNowToken.replace( '{action}{id}{tag}', 'index' );

								// create link in more resources menu
								var adminModel = new Entities.Resources( {
									'name'   : 'ThereNow',
									'icon'   : 'sinet-therenow',
									'url'    : thereNowUrl,
									'id'     : 'link-more-thereNow',
									'target' : '_blank'
								} );

								Entities.resources.add( adminModel );

								defer.resolve( Entities.resources );

							} ).fail( function () {
								defer.reject();
							} );

						} else {
							defer.resolve( Entities.resources );
						}

					} ).fail( function () {
						defer.reject();
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
