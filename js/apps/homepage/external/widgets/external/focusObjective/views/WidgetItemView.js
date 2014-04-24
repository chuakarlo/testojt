define( function ( require ) {
	'use strict';

	var Marionette = require( 'marionette' );
	var _          = require( 'underscore' );
	var template   = require( 'text!apps/homepage/external/widgets/external/focusObjective/templates/widgetItemView.html' );

	return Marionette.ItemView.extend( {
		'template'        : _.template( template ),
		'className'       : 'col-md-12 no-padding whatsnew',
		'templateHelpers' : function () {
			return {
				'content' : this.limitCharacter( this.model.get( 'ContentName' ) ),
				'url'     : '/dev.html#resources/videos/'+this.model.get( 'ContentId' ),
				'imgIcon' : this.model.get( 'ImageURL' )
			};
		},
		'limitCharacter' : function ( text ) {
			return ( text.length > 27 ) ? text.substr( 0, 27 ) + '...' : text;
		}
	} );
} );
