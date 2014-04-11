define( function ( require ) {
	'use strict';

	var _          = require( 'underscore' );
	var Marionette = require( 'marionette' );
	var Vent       = require( 'Vent' );

	var template  = require( 'text!pd360/templates/PD360.html' );

	var swfobject = window.swfobject;

	var base = 'js/apps/pd360/swf';
	var swf  = base + '/PD360.swf';

	var flashvars;

	var minVersion  = '10.2.159';
	var flashWidth  = '960';
	var flashHeight = '1100';

	var flashAttributes = {
		'id'     : 'PD360',
		'name'   : 'PD360',
		'data'   : swf,
		'width'  : flashWidth,
		'height' : flashHeight
	};

	var flashParams = {
		'allowScriptAccess' : 'sameDomain',
		'allowfullscreen'   : 'true',
		'base'              : base,
		'flashvars'         : flashvars,
		'menu'              : 'false',
		'quality'           : 'high',
		'scale'             : 'noscale',
		'wmode'             : 'opaque'
	};

	return Marionette.ItemView.extend( {

		'template' : _.template( template ),

		'id' : 'wrapper',

		// if they have the minimum required flash version, create the swf
		// `flash` parameter represents the id of the div element on the template
		// first null is for the express install swf
		// second null is for flashvars but we are including them within the `flashParams`
		'embedSWF' : function () {
			swfobject.embedSWF( swf, 'flash', flashWidth, flashHeight, minVersion, null, null, flashParams, flashAttributes, this.embedComplete );
		},

		'embedComplete' : function ( event ) {
			Vent.trigger( 'embed:complete', event.success );
		},

		'onDomRefresh' : function () {
			this.embedSWF();
		}

	} );

} );
