define( function ( require ) {
	'use strict';

	var Backbone = require( 'backbone' );
	var App      = require( 'App' );
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
					'icon' : 'fa-youtube-play'
				},
				{
					'name' : 'Learning Targets',
					'url'  : 'resources/learning',
					'icon' : 'fa-bullseye'
				},
				{
					'name' : 'Observation 360',
					'url'  : 'resources/observation/me',
					'icon' : 'fa-eye'
				},
				{
					'name' : 'Communities',
					'url'  : 'resources/communities',
					'icon' : 'fa-users'
				},
				{
					'name' : 'Lumibook',
					'url'  : 'resources/lumibook',
					'icon' : 'fa-book'
				},
				{
					'name' : '{User Video Uploader}',
					'url'  : '',
					'icon' : 'fa-film'
				},
				{
					'name' : '{Training}',
					'url'  : '',
					'icon' : 'fa-bullhorn'
				},
				{
					'name' : '{Learning Progression}',
					'url'  : '',
					'icon' : 'fa-puzzle-piece'
				},

			] );

		};

		var API = {

			'getResources' : function () {

				if ( Entities.resources === undefined ) {
					var defer = $.Deferred();

					initializeResources();

					App.request( 'user:isAdmin' ).done( function ( isAdmin ) {

						if ( isAdmin === true ) {

							var adminModel = new Entities.Resources( {
								'name' : '{Admin}',
								'icon' : 'fa-wrench',
								'url'  : ''
							} );

							Entities.resources.add( adminModel );
						}

						defer.resolve( Entities.resources );

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
