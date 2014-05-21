define( function ( require ) {
	'use strict';

	var Backbone = require( 'backbone' );
	var _        = require( 'underscore' );
	var App      = require( 'App' );

	App.module( 'Entities', function ( Entities ) {

		Entities.NavModel = Backbone.Model.extend( {

			'defaults' : {
				'active' : false
			}

		} );

		Entities.NavCollection = Backbone.Collection.extend( {

			'model' : Entities.NavModel,

			'setActive' : function ( filter ) {
				this.deactiveAll();

				if ( filter ) {
					var model = this.findWhere( { 'filter' : filter } );

					if ( model ) {
						model.set( 'active', true );
					} else {
						App.content.show( new App.Common.NotFoundView() );
					}

				} else {
					this.get( 'Profile' ).set( 'active', true );
				}
			},

			'deactiveAll' : function () {
				_.each( this.models, function ( model ) {
					model.set( 'active', false );
				} );
			}

		} );

	} );

} );
