define( function ( require ) {
	'use strict';

	var _             = require( 'underscore' );
	var Marionette    = require( 'marionette' );
	var $             = require( 'jquery' );
	var Remoting      = require( 'Remoting' );
	var Session       = require( 'Session' );
	var Vent          = require( 'Vent' );
	var template      = require( 'text!../templates/groupCommentView.html' );
	var usersTemplate = require( 'text!../templates/usersGroupCommentView.html' );

	var path       = 'com.schoolimprovement.pd360.dao.groups.GroupMessagesGateway';
	var objectPath = 'com.schoolimprovement.pd360.dao.groups.GroupMessages';

	return Marionette.ItemView.extend( {

		'tagName' : 'li',

		'events' : {
			'click button.remove-btn' : 'removeComment'
	    },

	    getTemplate : function(){

			// add the remove button if user created the message
			if ( String( this.model.attributes.Creator ) === String( Session.personnelId() ) ) {
				return _.template( usersTemplate );
			} else {
				return _.template( template );
			}

	    },

	    removeComment : function () {

			var message = {};

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

