define( function ( require ) {
	'use strict';

	var _          = require( 'underscore' );
	var Marionette = require( 'marionette' );
	var $          = require( 'jquery' );

	var template  = require( 'text!../templates/PD360.html' );

	var swfobject = window.swfobject;

	var base = 'js/apps/pd360/swf';
	var swf  = base + '/PD360.swf';

	var minVersion = '10.2.159';
	var flashvars;

	var flashAttributes = {
		'id'     : 'PD360',
		'name'   : 'PD360',
		'data'   : swf,
		'width'  : '960',
		'height' : '1100'
	};

	var flashParams = {
		'allowScriptAccess' : 'sameDomain',
		'allowfullscreen'   : 'true',
		'base'              : base,
		'flashvars'         : flashvars,
		'menu'              : 'false',
		'quality'           : 'high',
		'scale'             : 'noscale'
	};

	return Marionette.ItemView.extend( {

		'template' : _.template( template ),

		'id' : 'wrapper',

		'createSWF' : function () {
			// if they have the minimum required flash version, create the swf
			if ( swfobject.hasFlashPlayerVersion( minVersion ) ) {
				swfobject.createSWF( flashAttributes, flashParams, this.id );
			}
		},

		'onDomRefresh' : function () {
			this.createSWF();
		}

	} );

} );
