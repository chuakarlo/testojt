define( function ( require ) {
	'use strict';

	var $        = require( 'jquery' );
	var _        = require( 'underscore' );
	var App      = require( 'App' );
	var Vent     = require( 'Vent' );
	var Backbone = require( 'backbone' );
	var Bugsnag  = window.Bugsnag;

	App.module( 'Session', function ( Session ) {

		// Setup cookie names
		Session.cookies = {
			'username'     : 'UID',
			'personnel'    : 'PID',
			'eula'         : 'EULA',
			'eulaInitials' : 'EULA_INITIALS',
			'cf'           : 'CFAUTHORIZATION_PD360',
			'useWizards'   : 'USEWIZARDS'
		};

		var initializeSession = function ( loginObject ) {

			Bugsnag.user = {
				'id'    : loginObject.personnel.PersonnelId,
				'name'  : loginObject.personnel.FirstName + ' ' + loginObject.personnel.LastName,
				'email' : loginObject.personnel.EmailAddress,
				'login' : loginObject.personnel.LoginName
			};

			Session.config    = loginObject.config.DATA;
			Session.license   = new App.Entities.LicenseCollection( loginObject.license );
			Session.personnel = loginObject.personnel;
			Session.privilege = loginObject.privilege;
			Session.profile   = loginObject.profile;

			Vent.trigger( 'session:initialized' );

		};

		var refreshSession = function ( route ) {

			var cfToken     = $.cookie( 'CFTOKEN' );
			var personnelId = $.cookie( Session.cookies.personnel );

			$.ajax( {
				'url' : 'com/schoolimprovement/pd360/dao/RespondService.cfc?method=RespondGetPersonnelObjects&cfToken=' + cfToken + '&personnelId=' + personnelId + '&returnformat=json'
			} )

			.done( function ( data, textStatus, jqXHR ) {

				initializeSession( JSON.parse( data ) );

				App.vent.trigger( 'session:deferredResources' );

				route = route || App.getCurrentRoute();

				// reload route if page was refreshed
				Backbone.history.loadUrl( route );

				if ( route ) {
					window.location.hash = route;
				}

			} )

			.fail( function ( error ) {

				// call logout on fail to clear cookies and redirect to login
				App.navigate( 'logout', { 'trigger' : true } );

			} );

		};

		var API = {
			'initializeSession' : function ( loginObject ) {
				if ( Session.personnel === undefined ) {
					initializeSession( loginObject );
				}
			},

			'refreshSession' : function ( route ) {
				refreshSession( route );
			},

			'getObject' : function ( object, key ) {
				if ( Session[ object ] === undefined ) {
					return false;
				}

				if ( key !== undefined ) {
					return Session[ object ][ key ];
				}

				return Session[ object ];
			},

			'getPersonnelId' : function () {
				if ( Session.personnel !== undefined ) {
					return Session.personnel.PersonnelId;
				}

				return false;
			},

			'authenticated' : function () {
				var cookies = [
					'CFAUTHORIZATION_PD360',
					'CFID',
					'CFTOKEN',
					'PID',
					'UID'
				];

				// IE9 + supports array.every but why not use underscore
				return _.every( cookies, function ( cookie ) {
					return Boolean( $.cookie( cookie ) );
				} ) ;
			}

		};

		// --------------------------
		// Setup and Initialize
		// --------------------------
		App.reqres.setHandler( 'session:initialize', function ( loginObject ) {
			return API.initializeSession( loginObject );
		} );

		App.reqres.setHandler( 'session:refresh', function ( route ) {
			return API.refreshSession( route );
		} );

		// --------------------------
		// Get entire session object or specific key
		// --------------------------
		App.reqres.setHandler( 'session:cookies', function ( key ) {
			return API.getObject( 'cookies', key );
		} );

		App.reqres.setHandler( 'session:personnel', function ( key ) {
			return API.getObject( 'personnel', key );
		} );

		App.reqres.setHandler( 'session:profile', function ( key ) {
			return API.getObject( 'profile', key );
		} );

		App.reqres.setHandler( 'session:license', function () {
			return API.getObject( 'license' );
		} );

		App.reqres.setHandler( 'session:privilege', function ( key ) {
			return API.getObject( 'privilege', key );
		} );

		App.reqres.setHandler( 'session:config', function ( key ) {
			return API.getObject( 'config', key );
		} );

		// --------------------------
		// Convenience methods
		// --------------------------
		App.reqres.setHandler( 'session:personnelId', function () {
			return API.getPersonnelId();
		} );

		App.reqres.setHandler( 'session:authenticated', function () {
			return API.authenticated();
		} );

	} );

} );
