define( function ( require ) {
	'use strict';

	var Marionette      = require( 'marionette' );
	var _               = require( 'underscore' );
	var template        = require( 'text!apps/homepage/external/widgets/external/groupActivity/templates/widgetItemView.html' );
	var limitCharacters = require( 'apps/homepage/utils/limitCharacters' );

	return Marionette.ItemView.extend( {
		'template'        : _.template( template ),
		'className'       : 'col-md-12 no-padding groupActivity',
		'templateHelpers' : function () {
			var creatorName = this.limitCharacter(this.model.get( 'LicenseName' ));
			return {
				'type'        : this.model.get( 'LicenseContentTypeId' ),
				'creatorName' : creatorName,
				'url'         : this.model.get( 'LicenseId' ),
				'imgIcon'     : this.model.get( 'Avatar' )
			};
		},
		'limitCharacter'  : function ( text ) {
			return limitCharacters( text, 30 );
		}
	} );
} );
