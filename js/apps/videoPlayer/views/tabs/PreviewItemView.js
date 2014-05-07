define( function ( require ) {
	'use strict';

	var $          = require( 'jquery' );
	var _          = require( 'underscore' );
	var Marionette = require( 'marionette' );
	var template   = require( 'text!videoPlayer/templates/tabs/previewItemView.html' );

	require( 'jquery-browser' );

	return Marionette.ItemView.extend( {

		'template'        : _.template( template ),
		'className'       : 'modal-dialog modal-lg',
		'templateHelpers' : {
			'getContent' : function () {
				// Chrome pdf in iframe has issues with displaying
				// pdf files. Use `embed` tag instead.
				if ( $.browser.name === 'chrome' ) {
					return '<embed id="modal-iframe" src=' + this.previewPath + '></embed>';
				} else {
					return '<iframe id="modal-iframe" src=' + this.previewPath + '></iframe>';
				}
			}
		}

	} );

} );
