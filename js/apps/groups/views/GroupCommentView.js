define( function ( require ) {
	'use strict';

	var _                  = require( 'underscore' );
	var Marionette         = require( 'marionette' );
	var $                  = require( 'jquery' );
	var Remoting           = require( 'Remoting' );
	var Session            = require( 'Session' );
	var Vent               = require( 'Vent' );
	var template           = require( 'text!../templates/groupCommentView.html' );
	var usersTemplate      = require( 'text!../templates/usersGroupCommentView.html' );
	var MiniPersonnelModel = require('../../common/entities/MiniPersonnel');
	var MiniPersonnelView  = require('../../common/views/MiniPersonnel');

	var path       = 'com.schoolimprovement.pd360.dao.groups.GroupMessagesGateway';
	var objectPath = 'com.schoolimprovement.pd360.dao.groups.GroupMessages';

	return Marionette.ItemView.extend( {

		'tagName' : 'li',

		'ui' : {
			'removeReply' : '.remove-reply',
			'creator'     : '.child-creator-name'
		},

		'events' : {
			'click @ui.removeReply' : 'removeReply',
			'click @ui.creator'     : 'showMiniPersonnel'

	    },

	    getTemplate : function(){

			// add the remove button if user created the message
			if ( String( this.model.attributes.Creator ) === String( Session.personnelId() ) ) {
				return _.template( usersTemplate );
			} else {
				return _.template( template );
			}

	    },

		showMiniPersonnel : function( event ) {
			// We disabled the event that just captured the click
			// and let the popover library handle the click so we
			// don't have to fetch the model or create the view every
			// time.
			$(this.el).off( 'click', '.child-creator-name' );

			var model = new MiniPersonnelModel({
				'persId' : this.model.get('Creator')
			});

			var view = new MiniPersonnelView( {
				'model' : model
			} );

			// setup the popover
			this.ui.creator.popover( {
				'html'      : true,
				'placement' : 'top',
				'trigger'   : 'click',
				'content'   : function() {
					return view.render().el;
				}
			} );

			// Since spin.js requires element to be in the dom, wait until
			// the popover has been shown to add the spin icon.
			this.ui.creator.on( 'shown.bs.popover', function() {
				$(view.ui.spinner).spin();
			} );

			// Show the popover before we fetch the model, it should show a
			// loading view
			this.ui.creator.popover( 'show' );

			model.fetch( {
				'success': _.bind( function( model, res, options ) {
					// Render again once we have attributes
					view.render();
				}, this )
			} );
		},

	    onBeforeClose : function() {
			// Make sure to destroy the popover events
			this.ui.creator.popover('destroy');
	    },

	    removeReply : function ( e ) {

			e.preventDefault();

			var message = { };

			message.MessageThreadId = this.model.attributes.MessageThreadId;
			message.MessageId       = this.model.attributes.MessageId;
			message.LicenseId       = this.model.attributes.LicenseId;
			message.Message         = this.model.attributes.Message;
			message.Creator         = this.model.attributes.Creator;
			message.Created         = this.model.attributes.Created;
			message.Remover         = this.model.attributes.Remover;
			message.Removed         = this.model.attributes.Removed;

			var request = {
				'path'       : path,
				'objectPath' : objectPath,
				'method'     : 'deleteByObj',
				'args'       : message
			};

			var requests     = [ request ];
			var fetchingData = Remoting.fetch( requests );

			$.when( fetchingData ).done( function ( results ) {

				Vent.trigger( 'group:removeReply', this.model );

			}.bind( this ) ).fail( function ( error ) {
				// TODO: error handling

			} );

	    }

	} );

} );

