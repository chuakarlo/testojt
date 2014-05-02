define( function ( require ) {
	'use strict';

	var _          = require( 'underscore' );
	var $          = require( 'jquery' );
	var Marionette = require( 'marionette' );
	var App        = require( 'App' );
	var template   = require( 'text!../templates/groupSubNavView.html' );

	return Marionette.ItemView.extend( {

		'template'          : _.template( template ),

		'ui' : {
			'infoTab'     : '#tab-info',
			'wallTab'     : '#tab-wall',
			'resourceTab' : '#tab-resources',
			'forumTab'    : '#tab-forums',
			'membersTab'  : '#tab-members'
		},

		'events' : {
			'click @ui.infoTab'     : 'showInfo',
			'click @ui.wallTab'     : 'resetInfoClass',
			'click @ui.resourceTab' : 'resetInfoClass',
			'click @ui.forumTab'    : 'navigateForums',
			'click @ui.membersTab'  : 'resetInfoClass'
		},

		'phone' : false,

		'onRender' : function () {
			// add handler
			$( window ).on( 'resize', this.resizeHandler.bind( this ) );
		},

		'onClose' : function () {
			// remove handler
			$( window ).off( 'resize', this.resizeHandler );
		},

		'resetInfoClass' : function () {
			$( '.left-side' ).addClass( 'hidden-xs' );
			$( '.right-side' ).show();
		},

		'resizeHandler' : function () {

			this.phone = true;
			if ( $( window ).width() > 767 ) {
				this.phone = false;
			}

			if ( !this.phone && $( '#tab-info' ).closest( 'li' ).hasClass( 'active' ) ) {
				// Change back to the wall
				$( '#tab-info' ).closest( 'li' ).removeClass( 'active' );
				$( '#tab-wall' ).trigger( 'click' );
				this.resetInfoClass();
			}

		},

		'showInfo' : function ( event ) {
			event.preventDefault();

			// Hide main content
			$( '.right-side' ).hide();
			$( '.left-side' ).removeClass( 'hidden-xs' );
			this.phone = true;

		},

		'navigateForums' : function ( event ) {
			// This doesn't belong here
			event.preventDefault();

			App.request( 'group:showForums', this.model.attributes.LicenseId );

		}

	} );

} );
