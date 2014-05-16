define( function ( require ) {
	'use strict';

	var Marionette      = require( 'marionette' );
	var _               = require( 'underscore' );
	var template        = require( 'text!apps/homepage/external/widgets/external/focusObjective/templates/widgetItemView.html' );
	var limitCharacters = require( 'apps/homepage/utils/limitCharacters' );
	var getConfig       = require( 'common/helpers/getConfig' );

	return Marionette.ItemView.extend( {
		'template'        : _.template( template ),
		'className'       : 'col-md-12 no-padding widget-item',
		'templateHelpers' : function () {
			return {
				'content' : this.limitCharacter( this.model.get( 'ContentName' ) ),
				'url'     : '/#resources/videos/' + this.model.get( 'ContentId' ),
				'imgIcon' : getConfig( 'contentThumbnailPath' ) + this.model.get( 'ImageURL' )
			};
		},
		'limitCharacter'  : function ( text ) {
			return limitCharacters( text, 37 );
		}
	} );
} );
