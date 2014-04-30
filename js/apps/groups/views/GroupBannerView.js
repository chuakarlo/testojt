define( function ( require ) {
	'use strict';

	var _               = require( 'underscore' );
	var Marionette      = require( 'marionette' );
	var Vent            = require( 'Vent' );
	var Session         = require( 'Session' );
	var App             = require( 'App' );
	var template        = require( 'text!../templates/groupBannerView.html' );
	var leaderTemplate  = require( 'text!../templates/groupLeaderBannerView.html' );
	var creatorTemplate = require( 'text!../templates/groupCreatorBannerView.html' );

	return Marionette.ItemView.extend( {

		'template'  : _.template( template ),
		'className' : 'container-smooth',

		'events'   : {
			'click button.Leave'            : 'leaveGroup',
			'click button.Join'             : 'joinGroup',
			'click button#btn-leader-tools' : 'showLeaderTools'
	    },

	    'initialize' : function ( options ) {
			this.isGroupAdmin = options.userGroupAdmin;

	    },

	    'leaveGroup' : function ( e ) {

			e.preventDefault();
			Vent.trigger( 'group:leaveGroup', this.model );

	    },

	    'joinGroup' : function ( e ) {

			e.preventDefault();
			Vent.trigger( 'group:joinGroup', this.model );

	    },

	    'showLeaderTools' : function ( e ) {

			e.preventDefault();
			App.request( 'group:showLeaderTools', this.model.attributes.LicenseId );

	    },

	    getTemplate : function() {

			// displays group leader tools, but not leave option for creator
			if ( String( this.model.attributes.Creator ) === String( Session.personnelId() ) ){
				return _.template( creatorTemplate );

			}
			// leaders that are not the creator should be allowed to leave group
			else if ( this.isGroupAdmin && ( String( this.model.attributes.Creator ) !== String( Session.personnelId() ) ) ) {
				return _.template( leaderTemplate );

			} else {
				return _.template( template );
			}

	    },

		'templateHelpers' : function () {
			return {

				getMemberStatus : function() {

					var membership = _.find( this.model.attributes.groups, { 'LicenseId': this.model.attributes.LicenseId } );

					if ( !membership ) {
						if( this.model.attributes.PrivateGroup !== 0 ) {
							return 'Join';
						} else {
							return 'Request';
						}
					} else {
						return 'Leave';
					}

				}.bind( this )

			};
		}

	} );

} );
