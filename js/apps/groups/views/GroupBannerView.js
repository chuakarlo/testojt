define( function ( require ) {
	'use strict';

	var _              = require( 'underscore' );
	var Marionette     = require( 'marionette' );
	var Vent           = require( 'Vent' );
	var Session        = require( 'Session' );
	var App            = require( 'App' );
	var template       = require( 'text!../templates/groupBannerView.html' );
	var leaderTemplate = require( 'text!../templates/groupLeaderBannerView.html' );

	return Marionette.ItemView.extend( {

		'template'  : _.template( template ),
		'className' : 'container-smooth',

		'events'   : {
			'click button.Leave'            : 'leaveGroup',
			'click button.Join'             : 'joinGroup',
			'click button#btn-leader-tools' : 'showLeaderTools'
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

	    getTemplate : function(){

			// add the remove button if user created the message
			if ( String( this.model.attributes.Creator ) === String( Session.personnelId() ) ){
				return _.template( leaderTemplate );
			} else {
				return _.template( template );
			}

	    },

		'templateHelpers' : function () {

			return {

				getMemberStatus: function() {

					var membership = _.find( this.model.groups, { 'LicenseId': this.model.attributes.LicenseId } );

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
