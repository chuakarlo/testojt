define( function ( require ) {
	'use strict';

	var App        = require( 'App' );
	var Marionette = require( 'marionette' );
	var _          = require( 'underscore' );
	var template   = require( 'text!apps/homepage/external/widgets/external/focusObjective/templates/widgetItemView.html' );

	var getConfig  = require( 'common/helpers/getConfig' );
	var widgetCompositeController = require('apps/homepage/external/widgets/controllers/widgetCompositeController');

	var widgetDirectory = 'resources/videos/';

	return Marionette.ItemView.extend( {
		'events'          : {
			'click a.focusObjectiveLink' : 'redirect'
		},
		'template'        : _.template( template ),
		'className'       : 'col-md-12 no-padding widget-item',
		'templateHelpers' : function () {
			return {
				'content'   : App.Homepage.Utils.limitCharacters( this.model.get( 'ContentName' ), 37 ),
				'getConfig' : getConfig( 'contentThumbnailPath' )
			};
		},
		'redirect'        : function ( e ) {
			widgetCompositeController.doRedirect( e, widgetDirectory );
			return false;
		}
	} );
} );
