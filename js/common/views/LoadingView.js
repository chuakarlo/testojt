define( function ( require ) {
	'use strict';

	var Marionette     = require( 'marionette' );
	var _              = require( 'underscore' );

	var largeTemplate  = require( 'text!../templates/largeLoading.html' );
	var mediumTemplate = require( 'text!../templates/mediumLoading.html' );
	var smallTemplate  = require( 'text!../templates/smallLoading.html' );

	// If we want to change the spinner for the different sizes, update the map
	// and create a new hash of options
	var spinnerMediumOptions = {
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
		'top'       : '50%',
		'left'      : '50%'
	};

	var spinnerMap = {
		'large'  : spinnerMediumOptions,
		'medium' : spinnerMediumOptions,
		'small'  : spinnerMediumOptions
	};

	return Marionette.ItemView.extend( {

		'ui' : {
			'spinner' : '.spinner-icon-container'
		},

		'className' : 'spinner-container',

		'initialize' : function( options ) {

			this.options = options || { };

			_.defaults( this.options, {
				'size'       : 'medium',
				'text'       : 'Loading...',
				'background' : false
			} );

		},

		'getTemplate' : function() {
			switch (this.options.size) {
				case 'large':
					return _.template( largeTemplate );
				case 'medium':
					return _.template( mediumTemplate );
				case 'small':
					return _.template( smallTemplate );
			}
		},

		'serializeData' : function() {
			return {
				'size' : this.options.size,
				'text' : this.options.text
			};
		},

		'onShow' : function() {
			// check the background
			if ( this.options.background ) {
				this.$el.addClass('spinner-background');
				// update the spinner color
				spinnerMap[ this.options.size ][ 'color' ] = '#FFF';
			}

			// Show the spinner
			this.ui.spinner.spin( spinnerMap[ this.options.size ] );
		},

		'onClose' : function() {
			this.ui.spinner.stop();
		}
	} );
} );
