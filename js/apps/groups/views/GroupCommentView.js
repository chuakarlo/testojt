define( function ( require ) {
	'use strict';

	var _          = require( 'underscore' );
	var Marionette = require( 'marionette' );
	var Session    = require( 'Session' );
	var $          = require( 'jquery' );

	var template           = require( 'text!../templates/groupCommentView.html' );
	var usersTemplate      = require( 'text!../templates/usersGroupCommentView.html' );
	var MiniPersonnelModel = require( 'common/entities/MiniPersonnel' );
	var MiniPersonnelView  = require( 'common/views/MiniPersonnel' );
	var stripHtml          = require( 'common/helpers/stripHtml' );

	return Marionette.ItemView.extend( {

		'tagName' : 'li',

		'ui' : {
			'removeReply' : '.remove-child',
			'creator'     : '.child-creator-name'
		},

		'events' : {
			'click @ui.removeReply'  : 'removeReply',
			'mouseenter @ui.creator' : 'showMiniPersonnel'
		},

		initialize : function () {
			// strip html before deciding whether to show goals section or not
			this.model.set( 'Message', stripHtml( this.model.get( 'Message' ) ) );
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
			// We disable the event that just captured the mouseenter
			// and let the popover library handle the click so we
			// don't have to fetch the model or create the view every
			// time.
			$( this.el ).off( 'mouseenter', '.child-creator-name' );

			var model = new MiniPersonnelModel( {
				'persId' : this.model.get('Creator')
			} );

			var view = new MiniPersonnelView( {
				'model' : model
			} );

			// setup the popover
			this.ui.creator.popover( {
				'html'      : true,
				'placement' : 'top',
				'trigger'   : 'hover',
				'content'   : function () {
					return view.render().el;
				}
			} );

			// Since spin.js requires element to be in the dom, wait until
			// the popover has been shown to add the spin icon.
			this.ui.creator.on( 'shown.bs.popover', function () {
				$(view.ui.spinner).spin();
			} );

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
			this.ui.creator.popover('destroy');
		},

		'removeReply' : function ( e ) {
			this.model.destroy();
		},

		'templateHelpers' : {
			'getUserAvatarPath' : require( 'common/helpers/getUserAvatarPath' )
		}

	} );

} );
