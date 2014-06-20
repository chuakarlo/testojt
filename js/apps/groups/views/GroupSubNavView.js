define( function ( require ) {
	'use strict';

	var _          = require( 'underscore' );
	var $          = require( 'jquery' );
	var Backbone   = require( 'backbone');
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

		'phone' : false,

		'initialize' : function () {
			// While this view is active, listen to navigation events so we
			// can display the active tab correctly
			this.listenTo( Backbone.history, 'route', _.bind( function () {
				var query = this.getCurrentQuery();
				this.setActiveTab( query );
			}, this ) );
		},

		'getCurrentQuery' : function () {
			var current = App.getCurrentRoute();
			var query = _.last( current.split( '/' ) );
			return query;
		},

		'setActiveTab' : function ( query ) {
			var regex = new RegExp(/^\d+$/);
			if ( regex.test( query ) ) {
				query = 'wall';
			}

			$('li', this.el).removeClass( 'active' );
			switch ( query ) {

				case 'wall' :
					this.ui.wallTab.parent().addClass( 'active' );
					break;

				case 'resources' :
					this.ui.resourceTab.parent().addClass( 'active' );
					break;

				case 'forums' :
					this.ui.forumTab.parent().addClass( 'active' );
					break;

				case 'info' :
					this.ui.infoTab.parent().addClass( 'active' );
					break;

				case 'members' :
					this.ui.membersTab.parent().addClass( 'active' );
					break;
			}
		},

		'onShow' : function () {
			var query = this.getCurrentQuery();
			this.setActiveTab( query );

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

		}

	} );

} );
