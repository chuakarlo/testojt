( function () {
	'use strict';

	require.config( {

		'baseUrl' : '../../js',

		'paths' : {

			// Test suites
			'spec' : '../test/public/spec',

			//                      Libraries and utility scripts
			'async'                 : 'libs/async/lib/async',
			'backbone'              : 'libs/backbone-amd/backbone',
			'backbone.babysitter'   : 'libs/backbone.babysitter/lib/amd/backbone.babysitter',
			'backbone.wreqr'        : 'libs/backbone.wreqr/lib/amd/backbone.wreqr',
			'bootstrap'             : 'libs/bootstrap/dist/js/bootstrap',
			'chai'                  : 'libs/chai/chai',
			'carouselSnap'          : 'libs/carouselSnap/js/carousel-snap',
			'filterable.collection' : 'libs/backbone.filterable-collection/src/backbone.filterable-collection',
			'jquery'                : 'libs/jquery/dist/jquery',
			'jquery.autogrow'       : 'libs/jquery.autogrow/jquery.autogrow',
			'jquery-cookie'         : 'libs/jquery-cookie/jquery.cookie',
			'jquery-placeholder'    : 'libs/jquery-placeholder/jquery.placeholder.min',
			'json'                  : 'libs/requirejs-plugins/src/json',
			'marionette'            : 'libs/backbone.marionette/lib/core/amd/backbone.marionette',
			'mocha'                 : 'libs/mocha/mocha',
			'modernizr'             : 'libs/modernizr/modernizr',
			'moment'                : 'libs/momentjs/moment',
			'moment-timezone'       : 'libs/moment-timezone/moment-timezone',
			'sinon'                 : 'libs/sinonjs/sinon',
			'sinon-chai'            : 'libs/sinon-chai/lib/sinon-chai',
			'slick'                 : 'libs/slick-carousel/slick/slick',
			'text'                  : 'libs/requirejs-text/text',
			'timezone'              : 'common/Timezone',
			'videojs'               : 'libs/videojs/video.dev',
			'underscore'            : 'libs/lodash/lodash',
			//                      libs added by ContentNavigation
            'jquery.bum-smack'      : 'libs/jquery.bum-smack/src/jquery.bum-smack',
            'spin'                  : 'libs/spin.js/spin',
            'jquery.spin'           : 'libs/spin.js/jquery.spin',
            'jquery.pscrollbar'     : 'libs/perfect-scrollbar/src/perfect-scrollbar',
            'jquery.mousewheel'     : 'libs/perfect-scrollbar/src/jquery.mousewheel',
            'chai-backbone'         : 'libs/chai-backbone/chai-backbone',
            'chai-changes'          : 'libs/chai-changes/chai-changes',

			// base app folders
			'communities'           : 'apps/communities',
			'header'                : 'apps/header/',
			'learningProgression'   : 'apps/learningProgression',
			'lumibook'              : 'apps/lumibook',
			'observation'           : 'apps/observation',
			'pd360'                 : 'apps/pd360',
			'search'                : 'apps/search',
			'user'                  : 'apps/user/',
			'groups'                : 'apps/groups',
			'contentNavigation'     : 'apps/contentNavigation/',
			'videoPlayer'           : 'apps/videoPlayer',

			'pc-linq'             : 'libs/nakautot.linq/linq.min',
			'pc-nivo'             : 'libs/nivo-slider/jquery.nivo.slider',
			'pc-progressCircle'   : 'libs/progress-circle/progress-circle',
			'pc-mouseWheel'       : 'libs/perfect-scrollbar/jquery.mousewheel',
			'pc-carouselSnap'     : 'libs/circular-snap-carousel/carousel-snap',
			'pc-htmlconcat'       : 'libs/htmlConcat/htmlconcat',

			// Base application level classes
			'Session'    : 'apps/user/models/SessionModel',
			'config'     : 'config/index',
			'ColdFusion' : 'plugins/Backbone.CF'

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

			'ColdFusion' : {
				'deps' : [ 'backbone', 'App' ]
			},

			'pc-nivo' : {
				'exports' : '$',
				'deps'    : ['jquery']
			},
			'pc-progressCircle' : {
				'exports' : '$',
				'deps'    : ['jquery']
			},
			'pc-carouselSnap' : {
				'exports' : '$',
				'deps'    : ['jquery']
			},
			'pc-htmlconcat' : {
				'exports' : '$',
				'deps'    : ['jquery']
			}

		}
	} );

	define( function ( require ) {

		require( 'ColdFusion' );
		require( 'App' );
		require( 'jquery-cookie' );
		require( 'jquery-placeholder' );

		var $            = require( 'jquery' );
		var sinon        = require( 'sinon-chai' );
		var suite        = require( 'spec/suite' );
		var chaiBackbone = require( 'chai-backbone' );
		var chaiChanges  = require( 'chai-changes' );

		// on dom ready require all specs and run
		$( function () {

			require( suite.specs, function () {

				window.chai.should();
				window.chai.use( sinon );
				window.chai.use( chaiBackbone );
				window.chai.use( chaiChanges );

				if ( window.mochaPhantomJS ) {
					window.mochaPhantomJS.run();
				} else {
					window.mocha.run();
				}

			} );

		} );

	} );

} ).call( this );
