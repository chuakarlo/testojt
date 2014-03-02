( function () {
	'use strict';

	require.config( {

		'baseUrl' : '/js/',

		'paths' : {

			// Libraries
			'async'               : 'libs/async/lib/async',
			'backbone'            : 'libs/backbone-amd/backbone',
			'backbone.babysitter' : 'libs/backbone.babysitter/lib/amd/backbone.babysitter',
			'backbone.wreqr'      : 'libs/backbone.wreqr/lib/amd/backbone.wreqr',
			'bootstrap'           : 'libs/bootstrap/dist/js/bootstrap.min',
			'jquery'              : 'libs/jquery/jquery',
			'jquery-cookie'       : 'libs/jquery-cookie/jquery.cookie',
			'jquery-placeholder'  : 'libs/jquery-placeholder/jquery.placeholder.min',
			'marionette'          : 'libs/backbone.marionette/lib/core/amd/backbone.marionette',
			'modernizr'           : 'libs/modernizr/modernizr',
			'shim'                : 'libs/es5-shim/es5-shim.min',
			'text'                : 'libs/requirejs-text/text',
			'underscore'          : 'libs/lodash/lodash',
			'MiddlewareRouter'    : 'libs/MiddlewareRouter',

			// Base application level classes
			'Vent'    : 'Vent',
			'App'     : 'App',
			'Session' : 'apps/user/models/SessionModel',

			// app base folders
			'communities'         : 'apps/communities',
			'header'              : 'apps/header',
			'learningProgression' : 'apps/learningProgression',
			'lumibook'            : 'apps/lumibook',
			'observation'         : 'apps/observation',
			'pd360'               : 'apps/pd360',
			'search'              : 'apps/search',
			'user'                : 'apps/user'

		},

		'shim' : {

			'backbone' : {
				'deps'    : [ 'underscore', 'jquery' ],
				'exports' : 'Backbone'
			},

			'marionette' : {
				'deps' : [ 'backbone' ]
			},

			'bootstrap' : {
				'deps' : [ 'jquery' ]
			},

			'jquery' : {
				'exports': '$'
			},

			'jquery-cookie' : {
				'deps' : [ 'jquery' ]
			},

			'jquery-placeholder' : {
				'deps' : [ 'jquery' ]
			},

			'MiddlewareRouter' : {
				'deps' : [ 'marionette' ]
			},

			'App' : {
				'deps' : [ 'MiddlewareRouter' ]
			}

		}

	}, require( [ 'App', 'jquery-placeholder', 'modernizr', 'bootstrap', 'MiddlewareRouter' ], function ( App ) {
		return App.start();
	} ) );


} ).call( this );
