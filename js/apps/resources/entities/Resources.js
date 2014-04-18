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
					'icon' : 'glyphicon-info-sign'
				},
				{
					'name' : 'Learning Targets',
					'url'  : 'resources/learning',
					'icon' : 'glyphicon-info-sign'
				},
				{
					'name' : 'Observation 360',
					'url'  : 'resources/observation/me',
					'icon' : 'glyphicon-info-sign'
				},
				{
					'name' : 'Communities',
					'url'  : 'resources/communities',
					'icon' : 'glyphicon-info-sign'
				},
				{
					'name' : 'Lumibook',
					'url'  : 'resources/lumibook',
					'icon' : 'glyphicon-info-sign'
				},
				{
					'name' : '{User Video Uploader}',
					'url'  : '',
					'icon' : 'glyphicon-info-sign'
				},
				{
					'name' : '{Training}',
					'url'  : '',
					'icon' : 'glyphicon-info-sign'
				},
				{
					'name' : '{Learning Progression}',
					'url'  : '',
					'icon' : 'glyphicon-info-sign'
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
								'icon' : 'glyphicon-info-sign',
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
