define( function ( require ) {
	'use strict';

	var _          = require( 'underscore' );
	var Marionette = require( 'marionette' );
	var Vent       = require( 'Vent' );
	var template   = require( 'text!../templates/groupInvitesItemView.html' );

	return Marionette.ItemView.extend( {

		'template'  : _.template( template ),
		'tagName'   : 'li',
		'className' : 'col-xs-12 col-sm-6 col-md-4 col-lg-3',
		'events'    : {
			'click a.js-group-ignore' : 'ignoreGroupClicked',
			'click a.js-group-accept' : 'acceptGroupClicked'
		},

		'ignoreGroupClicked' : function ( e ) {

			e.preventDefault();
			Vent.trigger( 'group:ignoreGroup', this.model );

		},

		'acceptGroupClicked' : function ( e ) {

			e.preventDefault();
			Vent.trigger( 'group:acceptGroup', this.model );

		},

		'templateHelpers' : {

			'getAbbreviation' : require( 'common/helpers/getAbbreviation' ),
			'getAvatarPath'   : require( 'common/helpers/getAvatarPath' ),
			'getBrandingPath' : require( 'common/helpers/getBrandingPath' )

		}

	} );

} );
