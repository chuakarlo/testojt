( function () {
	'use strict';

	require.config( {

		'baseUrl' : '../../js',

		'paths' : {
			// Test suites
			'spec' : '../test/public/spec',

			// Libraries and utility scripts
			'async'               : 'libs/async/lib/async',
			'backbone'            : 'libs/backbone-amd/backbone',
			'backbone.babysitter' : 'libs/backbone.babysitter/lib/amd/backbone.babysitter',
			'backbone.wreqr'      : 'libs/backbone.wreqr/lib/amd/backbone.wreqr',
			'bootstrap'           : 'libs/bootstrap/docs/assets/js/bootstrap',
			'chai'                : 'libs/chai/chai',
			'jquery'              : 'libs/jquery/jquery',
			'jquery-cookie'       : 'libs/jquery-cookie/jquery.cookie',
			'jquery-placeholder'  : 'libs/jquery-placeholder/jquery.placeholder.min',
			'json'                : 'libs/requirejs-plugins/src/json',
			'marionette'          : 'libs/backbone.marionette/lib/core/amd/backbone.marionette',
			'MiddlewareRouter'    : 'libs/MiddlewareRouter',
			'mocha'               : 'libs/mocha/mocha',
			'modernizr'           : 'libs/modernizr/modernizr',
			'sinon'               : 'libs/sinonjs/sinon',
			'sinon-chai'          : 'libs/sinon-chai/lib/sinon-chai',
			'text'                : 'libs/requirejs-text/text',
			'underscore'          : 'libs/lodash/lodash',

			// base app folders
			'communities'         : 'apps/communities',
			'header'              : 'apps/header/',
			'learningProgression' : 'apps/learningProgression',
			'lumibook'            : 'apps/lumibook',
			'observation'         : 'apps/observation',
			'pd360'               : 'apps/pd360',
			'search'              : 'apps/search',
			'user'                : 'apps/user/',
			'resources'           : 'apps/resources',

			// Base application level classes
			'Vent'    : 'Vent',
			'App'     : 'App',
			'Session' : 'apps/user/models/SessionModel'

		},

		'shim' : {
			
			'backbone' : {
				'deps'    : [ 'underscore', 'jquery' ],
				'exports' : 'Backbone'
			},

			'marionette' : {
				'deps' : [ 'backbone' ],
				'exports' : 'Backbone.Marionette'
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
	},

	require(
		[ 'App', 'jquery', 'jquery-cookie', 'jquery-placeholder', 'spec/suite', 'sinon-chai' ],
		function ( App, $, cookie, placeholder, suite, sinon ) {

			// on dom ready require all specs and run
			$( function () {
				require( suite.specs, function () {

					if ( window.mochaPhantomJS ) {
						window.mochaPhantomJS.run();
					} else {
						window.mocha.run();
						window.chai.should();
						window.chai.use( sinon );
					}

				} );
			} );
		} )
	);

} ).call( this );
