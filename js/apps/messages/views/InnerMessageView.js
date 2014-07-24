define( function ( require ) {
	'use strict';

	var Marionette = require( 'marionette' );
	var template   = require( 'text!apps/messages/templates/innerMessage.html' );
	var _          = require( 'underscore' );
	var moment     = require( 'moment' );
	var $          = require( 'jquery' );

	return Marionette.ItemView.extend( {
		'template'          : _.template( template ),
		'className'         : 'toggle-btn',
		'templateHelpers'   : function () {
			var msgSplit = this.getMessageLink();
			return {
				'date'    : moment( this.model.get( 'Created' ) ).format( 'MM/DD/YYYY' ),
				'status'  : this.model.get( 'Viewed' ) === '' ? 'unread fa-clock-o' : 'read fa-check',
				'link'    : msgSplit.link,
				'message' : msgSplit.message
			};
		},
		'toggleActiveClass' : function ( event ) {
			var target    = ( event.currentTarget ) ? event.currentTarget : event.srcElement;
			$( target ).closest( '.toggle-btn' ).toggleClass( 'active' );
		},
		'events'            : {
			'click .title-holder a' : 'toggleActiveClass'
		},
		'getMessageLink'    : function () {
			var splitter = 'http';
			var prefix   = '#resources/videos/';
			var spltData = this.model.get( 'Message' ).split( splitter );
			return {
				'link'    : prefix + spltData.pop().split( prefix )[ 1 ],
				'message' : spltData.join( splitter )
			};
		}
	} );
} );
