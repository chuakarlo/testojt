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
			'jquery.bum-smack'    : 'libs/jquery.bum-smack/src/jquery.bum-smack',
			'spin'                : 'libs/spin.js/spin',
			'jquery.spin'         : 'libs/spin.js/jquery.spin',
			'jquery.pscrollbar'   : 'libs/perfect-scrollbar/src/perfect-scrollbar',
			'jquery.mousewheel'   : 'libs/perfect-scrollbar/src/jquery.mousewheel',
			'jquery'              : 'libs/jquery/dist/jquery',
			'jquery-cookie'       : 'libs/jquery-cookie/jquery.cookie',
			'jquery-placeholder'  : 'libs/jquery-placeholder/jquery.placeholder.min',
			'marionette'          : 'libs/backbone.marionette/lib/core/amd/backbone.marionette',
			'modernizr'           : 'libs/modernizr/modernizr',
			'shim'                : 'libs/es5-shim/es5-shim.min',
			'text'                : 'libs/requirejs-text/text',
			'underscore'          : 'libs/lodash/lodash',
			'MiddlewareRouter'    : 'MiddlewareRouter',
			'rotate'              : 'libs/rotate/index',

			// Base application level classes
			'Session'  : 'apps/user/models/SessionModel',

			// app base folders
			'communities'         : 'apps/communities',
			'header'              : 'apps/header',
			'learningProgression' : 'apps/learningProgression',
			'lumibook'            : 'apps/lumibook',
			'observation'         : 'apps/observation',
			'pd360'               : 'apps/pd360',
			'search'              : 'apps/search',
			'user'                : 'apps/user',
			'groups'              : 'apps/groups'

		},

		'shim' : {

			'backbone' : {
				'deps'    : [ 'underscore', 'jquery' ],
				'exports' : 'Backbone'
			},

			'backbone.babysitter' : {
				'deps' : [ 'backbone' ],
			},

			'backbone.wreqr' : {
				'deps' : [ 'backbone' ]
			},

			'marionette' : {
				'deps'    : [ 'backbone', 'backbone.babysitter', 'backbone.wreqr' ],
				'exports' : 'Backbone.Marionette'
			},

			'bootstrap' : {
				'deps' : [ 'jquery' ]
			},

			'jquery' : {
				'exports': '$'
			},

			'underscore' : {
				'deps' : [ 'jquery' ],
				'exports' : '_'
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

			'rotate' : {
				'deps' : [ 'jquery' ]
			},

			'App' : {
				'deps' : [ 'MiddlewareRouter' ]
			},

			'jquery.bum-smack' : {
				'deps'	: [ 'jquery' ]
			},

			'jquery.spin' : {
				'deps'	: [ 'jquery', 'spin' ]
			},

			'jquery.pscrollbar' : {
				'deps'	: [ 'jquery' , 'jquery.mousewheel' ]
			}

		}

	} );

	define( function ( require ) {
		var App = require( 'App' );

		require( 'jquery-cookie' );
		require( 'jquery-placeholder' );
		require( 'modernizr' );
		require( 'bootstrap' );
		require( 'rotate' );

		require( 'modules' );

		App.start();

	} );

} ).call( this );
