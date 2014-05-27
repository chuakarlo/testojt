define( function ( require ) {
	'use strict';

	var App        = require( 'App' );
	var Marionette = require( 'marionette' );
	var _          = require( 'underscore' );
	var template   = require( 'text!apps/homepage/external/widgets/external/focusObjective/templates/widgetItemView.html' );
	var getConfig  = require( 'common/helpers/getConfig' );

	return Marionette.ItemView.extend( {
		'template'        : _.template( template ),
		'className'       : 'col-md-12 no-padding widget-item',
		'templateHelpers' : function () {
			return {
				'content' : App.Homepage.Utils.limitCharacters( this.model.get( 'ContentName' ), 37 ),
				'url'     : '#resources/videos/' + this.model.get( 'ContentId' ),
				'imgIcon' : getConfig( 'contentThumbnailPath' ) + this.model.get( 'ImageURL' )
			};
		}
	} );
} );
