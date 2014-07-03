define( function ( require ) {
	'use strict';

	var App        = require( 'App' );
	var _          = require( 'underscore' );
	var Marionette = require( 'marionette' );
	var Session    = require( 'Session' );
	var $          = require( 'jquery' );
	var moment     = require( 'moment' );

	var template           = require( 'text!../templates/groupCommentView.html' );
	var usersTemplate      = require( 'text!../templates/usersGroupCommentView.html' );
	var MiniPersonnelModel = require( 'common/entities/MiniPersonnel' );
	var MiniPersonnelView  = require( 'common/views/MiniPersonnel' );

	var Autolinker = require( 'autolinker' );

	var autolinker = new Autolinker( {
		newWindow   : false,
		stripPrefix : false,
		className   : 'link'
	} );

	return Marionette.ItemView.extend( {

		'tagName' : 'li',

		'ui' : {
			'removeReply' : '.remove-child',
			'creator'     : '.child-creator-name'
		},

		'events' : {
			'click @ui.removeReply' : 'removeReply',
			'click @ui.creator'     : 'showMiniPersonnel'
		},

		'onRender' : function () {
			$( this.el ).find( 'p.wall-comment' ).prepend( autolinker.link( this.model.get( 'Message' ) ) );
		},

		'getTemplate' : function () {

			// add the remove button if user created the message
			if ( String( this.model.get( 'Creator' ) ) === String( Session.personnelId() ) ) {
				return _.template( usersTemplate );
			} else {
				return _.template( template );
			}

		},

		'showMiniPersonnel' : function ( event ) {
			// We disable the event that just captured the click
			// and let the popover library handle the click so we
			// don't have to fetch the model or create the view every
			// time.
			$( this.el ).off( 'click', '.child-creator-name' );

			var model = new MiniPersonnelModel( {
				'persId' : this.model.get( 'Creator' )
			} );

			var view = new MiniPersonnelView( {
				'model' : model
			} );

			// setup the popover
			this.ui.creator.popover( {
				'html'      : true,
				'placement' : 'top',
				'trigger'   : 'click',
				'content'   : function () {
					return view.render().el;
				}
			} );

			// Since spin.js requires element to be in the dom, wait until
			// the popover has been shown to add the spin icon.
			this.ui.creator.on( 'shown.bs.popover', _.bind( function () {
				$( view.ui.spinner ).spin();
				App.vent.trigger( 'show:popover', this );
			}, this ) );

			// Show the popover before we fetch the model, it should show a
			// loading view
			this.ui.creator.popover( 'show' );

			model.fetch( {
				'success' : _.bind( function ( model, res, options ) {
					// Render again once we have attributes
					view.render();
				}, this )
			} );
		},

		'hideMiniPersonnel' : function ( event ) {
			this.ui.creator.popover( 'hide' );
		},

		'onBeforeClose' : function () {
			// Make sure to destroy the popover events
			this.ui.creator.popover( 'destroy' );
		},

		'removeReply' : function ( e ) {
			this.model.destroy();
		},

		'templateHelpers' : {
			'getUserAvatarPath' : require( 'common/helpers/getUserAvatarPath' ),

			'formatDate' : function ( date ) {

				// milliseconds in 24 hours
				var timeToSwitch = 60 * 60 * 24 * 1000;

				// Only show time ago for the first 24 hours
				if ( moment().diff( moment( date ) ) > timeToSwitch ) {
					return moment( date ).format( 'MMMM D, YYYY' );
				}

				return moment( date ).fromNow();

			}
		}

	} );

} );
