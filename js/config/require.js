require.config( {

	'baseUrl' : '/js/',

	'paths' : {

		// Tests
		'SpecRunner'    : '../test/public/SpecRunner',
		'spec'          : '../test/public/spec',
		'polyfills'     : '../test/public/polyfills',
		'chai'          : 'libs/chai/chai',
		'sinon'         : 'libs/sinonjs/sinon',
		'sinon-chai'    : 'libs/sinon-chai/lib/sinon-chai',
		'chai-backbone' : 'libs/chai-backbone/chai-backbone',
		'chai-changes'  : 'libs/chai-changes/chai-changes',

		// Libraries
		'async'                 : 'libs/async/lib/async',
		'analytics'             : 'libs/ga',
		'backbone'              : 'libs/backbone-amd/backbone',
		'backbone.babysitter'   : 'libs/backbone.babysitter/lib/backbone.babysitter',
		'backbone.validation'   : 'libs/backbone.validation/dist/backbone-validation-amd',
		'backbone.stickit'      : 'libs/backbone.stickit/backbone.stickit',
		'carouselSnap'          : 'libs/carouselSnap/js/carousel-snap',
		'backbone.wreqr'        : 'libs/backbone.wreqr/lib/amd/backbone.wreqr',
		'bootstrap'             : 'libs/bootstrap/dist/js/bootstrap.min',
		'filterable.collection' : 'libs/backbone.filterable-collection/src/backbone.filterable-collection',
		'jquery.bum-smack'      : 'libs/jquery.bum-smack/src/jquery.bum-smack',
		'spin'                  : 'libs/spin.js/spin',
		'jquery.spin'           : 'libs/spin.js/jquery.spin',
		'jquery.autogrow'       : 'libs/jquery.autogrow/jquery.autogrow',
		'jquery.pscrollbar'     : 'libs/perfect-scrollbar/src/perfect-scrollbar',
		'jquery.mousewheel'     : 'libs/perfect-scrollbar/src/jquery.mousewheel',
		'jquery'                : 'libs/jquery/dist/jquery',
		'jquery-cookie'         : 'libs/jquery-cookie/jquery.cookie',
		'jquery-placeholder'    : 'libs/jquery-placeholder/jquery.placeholder.min',
		'marionette'            : 'libs/backbone.marionette/lib/core/amd/backbone.marionette',
		'moment'                : 'libs/momentjs/moment',
		'moment-timezone'       : 'libs/moment-timezone/moment-timezone',
		'modernizr'             : 'libs/modernizr/modernizr',
		'shim'                  : 'libs/es5-shim/es5-shim.min',
		'slick'                 : 'libs/slick-carousel/slick/slick',
		'text'                  : 'libs/requirejs-text/text',
		'timezone'              : 'common/Timezone',
		'videojs'               : 'libs/videojs/video.dev',
		'underscore'            : 'libs/lodash/lodash',
		'validation'            : 'plugins/validation',
		'rotate'                : 'libs/rotate/index',
		'ColdFusion'            : 'plugins/Backbone.CF',
		'config'                : 'config/index',
		'fine-uploader'         : 'libs/fine-uploader/build/jquery.fineuploader.min',
		'ladda'                 : 'libs/ladda/dist/ladda.min',
		'ladda-jquery'          : 'libs/ladda/dist/ladda.jquery.min',
		'jquery-browser'        : 'libs/jquery.browser/dist/jquery.browser.min',
		'validator-js'          : 'libs/validator-js/validator.min',


		'pc-linq'             : 'libs/nakautot.linq/linq.min',
		'pc-nivo'             : 'libs/nivo-slider/jquery.nivo.slider',
		'pc-progressCircle'   : 'libs/progress-circle/progress-circle',
		'pc-mouseWheel'       : 'libs/perfect-scrollbar/jquery.mousewheel',
		'pc-carouselSnap'     : 'libs/circular-snap-carousel/carousel-snap',
		'pc-htmlconcat'       : 'libs/htmlConcat/htmlconcat',

		// Base application level classes
		'Session' : 'apps/user/models/SessionModel',

		// app base folders
		'communities'         : 'apps/communities',
		'header'              : 'apps/header',
		'learningProgression' : 'apps/learningProgression',
		'lumibook'            : 'apps/lumibook',
		'observation'         : 'apps/observation',
		'pd360'               : 'apps/pd360',
		'search'              : 'apps/search',
		'user'                : 'apps/user',
		'groups'              : 'apps/groups',
		'videoPlayer'         : 'apps/videoPlayer',
		'contentNavigation'   : 'apps/contentNavigation',
		'learningTargets'     : 'apps/learningTargets',
		'resources'           : 'apps/resources',
		'admin'               : 'apps/admin'
	},

	'shim' : {

		'backbone' : {
			'deps'    : [ 'underscore', 'jquery' ],
			'exports' : 'Backbone'
		},

		'backbone.babysitter' : {
			'deps' : [ 'backbone' ]
		},

		'backbone.wreqr' : {
			'deps' : [ 'backbone' ]
		},

		'backbone.stickit' : {
			'deps' : [ 'backbone' ]
		},

		'backbone.validation' : {
			'deps' : [ 'backbone' ]
		},

		'marionette' : {
			'deps'    : [ 'backbone', 'backbone.babysitter', 'backbone.wreqr' ],
			'exports' : 'Backbone.Marionette'
		},

		'bootstrap' : {
			'deps' : [ 'jquery' ]
		},

		'carouselSnap' : {
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

		'jquery-browser' : {
			'deps' : [ 'jquery' ]
		},

		'jquery.bum-smack' : {
			'deps' : [ 'jquery' ]
		},

		'jquery.spin' : {
			'deps' : [ 'jquery', 'spin' ]
		},

		'jquery.pscrollbar' : {
			'deps' : [ 'jquery' , 'jquery.mousewheel' ]
		},

		'rotate' : {
			'deps' : [ 'jquery' ]
		},

		'slick' : {
			'deps' : [ 'jquery' ]
		},

		'underscore' : {
			'deps' : [ 'jquery' ],
			'exports' : '_'
		},

		'videojs' : {
			'exports' : 'videojs'
		},

		'ColdFusion' : {
			'deps' : [ 'backbone', 'App' ]
		},

		'modules' : {
			'deps' : [ 'ColdFusion' ]
		},

		'pc-nivo' : {
			'exports' : '$',
			'deps'    : [ 'jquery' ]
		},

		'pc-progressCircle' : {
			'exports' : '$',
			'deps'    : [ 'jquery' ]
		},

		'pc-carouselSnap' : {
			'exports' : '$',
			'deps'    : [ 'jquery' ]
		},

		'pc-htmlconcat' : {
			'exports' : '$',
			'deps'    : [ 'jquery' ]
		}

	}

} );
