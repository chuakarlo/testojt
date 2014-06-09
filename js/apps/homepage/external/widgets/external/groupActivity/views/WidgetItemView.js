define( function ( require ) {
	'use strict';

	var App             = require( 'App' );
	var Marionette      = require( 'marionette' );
	var _               = require( 'underscore' );
	var template        = require( 'text!apps/homepage/external/widgets/external/groupActivity/templates/widgetItemView.html' );

	var className    = 'col-md-12 no-padding widget-item';
	var templateBind = _.template( template );

	var getConfig  = require( 'common/helpers/getConfig' );

	var widgetDirectory = 'groups/';

	return Marionette.ItemView.extend( {
		'events'          : {
			'click a.groupActivityLink' : 'redirect'
		},
		'template'        : templateBind,
		'className'       : function () {
			return className;
		},
		'templateHelpers' : function () {
			return {
				'creatorName' : App.Homepage.Utils.limitCharacters( this.model.get( 'LicenseName' ), 37 ),
				'getConfig'   : getConfig( 'groupAvatarWebPath' )
			};
		},
		'redirect'        : function ( e ) {
			App.Homepage.Utils.redirect( e, widgetDirectory );
			return false;
		}
	} );
} );
