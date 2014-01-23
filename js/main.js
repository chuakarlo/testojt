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
			'bootstrap'           : 'libs/bootstrap/docs/assets/js/bootstrap',
			'jquery'              : 'libs/jquery/jquery',
			'jquery-cookie'       : 'libs/jquery.cookie/jquery.cookie',
			'jquery-placeholder'  : 'libs/jquery-placeholder/jquery.placeholder.min',
			'marionette'          : 'libs/backbone.marionette/lib/core/amd/backbone.marionette',
			'modernizr'           : 'libs/modernizr/modernizr',
			'shim'                : 'libs/es5-shim/es5-shim.min',
			'text'                : 'libs/requirejs-text/text',
			'underscore'          : 'libs/lodash/lodash',

			// root folders
			'collections' : 'collections',
			'controllers' : 'controllers',
			'models'      : 'models',
			'routers'     : 'routers',
			'views'       : 'views',
			'templates'   : '../templates',

			// Base application level classes
			'Vent' : 'Vent',
			'App'  : 'App'

		},

		'shim' : {

			'backbone' : {
				'deps'    : [ 'underscore', 'jquery' ],
				'exports' : 'Backbone'
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
			}

		}

	}, require( [ 'App', 'jquery-placeholder', 'modernizr' ], function ( App ) {
		return App.start();
	} ) );


} ).call( this );