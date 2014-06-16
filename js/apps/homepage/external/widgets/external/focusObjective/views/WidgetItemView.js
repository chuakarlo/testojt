define( function ( require ) {
	'use strict';

	var App        = require( 'App' );
	var Marionette = require( 'marionette' );
	var _          = require( 'underscore' );
	var template   = require( 'text!apps/homepage/external/widgets/external/focusObjective/templates/widgetItemView.html' );

	var getConfig  = require( 'common/helpers/getConfig' );

	var widgetDirectory = 'resources/videos/';

	return Marionette.ItemView.extend( {
		'events'          : {
			'click a.focusObjectiveLink' : 'redirect'
		},
		'template'        : _.template( template ),
		'className'       : 'col-md-12 no-padding widget-item',
		'templateHelpers' : function () {
			return {
				'content'   : this.model.get( 'ContentName' ),
				'getConfig' : getConfig( 'contentThumbnailPath' )
			};
		},
		'redirect'        : function ( e ) {
			App.Homepage.Utils.redirect( e, widgetDirectory );
			return false;
		}
	} );
} );
