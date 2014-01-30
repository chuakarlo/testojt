define( function ( require ) {
	'use strict';

	var $          = require( 'jquery' );
	var _          = require( 'underscore' );
	var Backbone   = require( 'backbone' );
	var Marionette = require( 'marionette' );

	var layouts = {
		'Nav' : require( 'views/nav/NavView' )
	};

	var views = {
		'LoginView' : require( 'views/users/LoginView' )
	};

	return Marionette.Controller.extend( {

		'requestedRoute' : '',

		'initialize' : function ( options ) {
			var self = this;
			_.bindAll( this );

			_.each( options, function ( value, key, list ) {
				self[ key ] = value;
			} );

			this._setMenu();

			return this;
		},

		'_setContent' : function ( View, options ) {
			var view;

			if ( typeof View === 'function' ) {
				options = options || {};
				view = new View( options );
			} else {
				view = View;
			}

			this.regions.content.show( view );

			return view;
		},

		'_setMenu' : function () {
			this.regions.menu.show( new layouts.Nav() );
		},

		'showDefault' : function ( actions ) {
			if ( this.requestedRoute !== '' ) {
				this.App.Router.navigate( this.requestedRoute, true );
				this.requestedRoute = '';
			} else {
				this.App.Router.navigate( 'login', true );
			}
		},

		'showLogin' : function () {
			this._setContent( views.LoginView );
		}

	} );

} );