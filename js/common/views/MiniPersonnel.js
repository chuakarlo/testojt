define( function( require ) {
	'use strict';

	var _               = require( 'underscore' );
	var $               = require( 'jquery' );
	var Marionette      = require( 'marionette' );
	var template        = require( 'text!../templates/MiniPersonnel.html' );
	var loadingTemplate = require( 'text!../templates/MiniPersonnelLoading.html' );

	return Marionette.ItemView.extend( {

		'className' : 'mini-personnel',

		'template' : _.template( template ),

		'ui' : {
			'spinner' : '.loading-spinner'
		},

		'onShow' : function() {
			// My first implementation doesn't use this method but it's
			// probably a good idea to keep this around
			this.ui.spinner.spin();
		},

		'onBeforeRender' : function() {
			// Since we are just re-rendering with a different template,
			// try and close the spinner before the view is re-rendered
			$(this.ui.spinner).spin(false);
		},

		'getTemplate' : function() {
			// If we don't have any data, we are probably still loading
			var fn = this.model.get('FirstName');
			var ln = this.model.get('LastName');

			if ( fn === '' && ln === '') {
				return _.template( loadingTemplate );
			}
			return _.template( template );
		},

		'templateHelpers' : {

			'BuildAvatar' : function() {
				if ( this.Avatar === '' ) {
					return 'Default.png';
				}
				return this.Avatar;
			}
			
		}

	} );
} );
