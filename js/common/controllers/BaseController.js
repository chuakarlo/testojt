define( function ( require ) {
	'use strict';

	var App        = require( 'App' );

	var Marionette = require( 'marionette' );
	var _ = require( 'underscore' );

	App.module( 'Common.Controllers', function ( Mod ) {

		Mod.BaseController = null;

		var parentKlass = Marionette.Controller.prototype;

		( function ( parentKlass ) {

			Mod.BaseController = parentKlass.constructor.extend( {
				'constructor' : function ( options ) {
					// this.region = options.region || null;

					this.instanceId = _.uniqueId( 'controller' );

					App.execute( 'register:instance', this, this.instanceId );
					parentKlass.constructor.apply( this, arguments );
				},

				/*
				'show' : function ( view, options ) {
					options = options || {};

					_.defaults( options, {
						'loading' : false,
						'region' : this.region
					} );

					this.setMainView( view );
					return this.manageView( view, options );

				},
				*/

				'close' : function () {
					App.execute( 'unregister:instance', this, this.instanceId );
					return Marionette.Controller.prototype.close.apply( this, arguments );
				}

				/*
				'setMainView' : function ( view ) {
					if ( this.mainView ) {
						return;
					}

					this.mainView = view;
					// Once the main view closes, controller should be closed
					return this.listenTo( view, 'close', this.close );
				},

				'manageView' : function ( view, options ) {
					if ( options.loading ) {
						// TODO
						return;
					} else {
						options.region.show( view );
					}
				}
				*/

			} );

		} )( parentKlass );

	} );

} );
