define( function ( require ) {
	'use strict';

	var _          = require( 'underscore' );
	var Marionette = require( 'marionette' );
	var Spinner    = require( 'spin' );

	return Marionette.ItemView.extend( {

		'initialize' : function () {
			var opts = this._getOptions();
			this.spinner = new Spinner( opts );
		},

		'template' : _.template( '' ),

		'className' : 'loading-container',

		'onShow' : function () {
			this.spinner.spin();
			this.$el.append( this.spinner.el );
		},

		'onClose' : function () {
			this.spinner.stop();
		},

		'_getOptions' : function () {
			return {
				'lines'     : 10,
				'length'    : 6,
				'width'     : 2.5,
				'radius'    : 7,
				'corners'   : 1,
				'rotate'    : 9,
				'direction' : 1,
				'color'     : '#000',
				'speed'     : 1,
				'trail'     : 60,
				'shadow'    : !1,
				'hwaccel'   : !0,
				'className' : 'spinner',
				'zIndex'    : 2e9,
				'top'       : '0px',
				'left'      : '0px'
			};
		}

	} );

} );
