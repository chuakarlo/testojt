define( function ( require ) {
	'use strict';

	var _          = require( 'underscore' );
	var Marionette = require( 'marionette' );
	var Vent       = require( 'Vent' );
	var template   = require( 'text!../templates/groupBannerView.html' );

	return Marionette.ItemView.extend( {

		'template'  : _.template( template ),
		'className' : 'container-smooth',

		'events'   : {
			'click button.Leave' : 'leaveGroup',
			'click button.Join'  : 'joinGroup'
	    },

	    'leaveGroup' : function ( e ) {

			e.preventDefault();
			Vent.trigger( 'group:leaveGroup', this.model );

	    },

	    'joinGroup' : function ( e ) {

			e.preventDefault();
			Vent.trigger( 'group:joinGroup', this.model );

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
