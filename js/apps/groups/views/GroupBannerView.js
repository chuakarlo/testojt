define( function ( require ) {
	'use strict';

	var _               = require( 'underscore' );
	var Marionette      = require( 'marionette' );
	var Vent            = require( 'Vent' );
	var Session         = require( 'Session' );
	var template        = require( 'text!../templates/groupBannerView.html' );
	var leaderTemplate  = require( 'text!../templates/groupLeaderBannerView.html' );
	var creatorTemplate = require( 'text!../templates/groupCreatorBannerView.html' );

	return Marionette.ItemView.extend( {

		'template'  : _.template( template ),
		'className' : 'container-smooth',

		'events'   : {
			'click button.Leave' : 'leaveGroup',
			'click button.Join'  : 'joinGroup'
		},

		'initialize' : function ( options ) {
			this.isGroupAdmin = options.userGroupAdmin;
		},

		'onRender' : function () {
			var getBrandingPath = require( 'common/helpers/getBrandingPath' );
			this.$el.css( 'background-image', 'url(\'' + getBrandingPath( this.model.get( 'BrandingImage' ), 'lg' ) + '\')' );
		},

		'leaveGroup' : function ( e ) {

			e.preventDefault();
			Vent.trigger( 'group:leaveGroup', this.model );

		},

		'joinGroup' : function ( e ) {

			e.preventDefault();
			Vent.trigger( 'group:joinGroup', this.model );

		},

		'getTemplate' : function () {

			// displays group leader tools, but not leave option for creator
			var persId = Session.personnelId();

			if ( String( this.model.get( 'Creator' ) ) === persId ) {
				return _.template( creatorTemplate );

			// leaders that are not the creator should be allowed to leave group
			} else if ( this.isGroupAdmin && this.model.get( 'Creator' ) !== persId ) {
				return _.template( leaderTemplate );

			} else {
				return _.template( template );
			}

		},

		'templateHelpers' : function () {
			return {

				getMemberStatus : function () {

					if ( !this.model.isMember ) {
						if ( this.model.get( 'PrivateGroup' ) !== 0 ) {
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
