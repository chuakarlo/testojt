//code-review
define( function ( require ) {
	'use strict';

	var Marionette      = require( 'marionette' );
	var _               = require( 'underscore' );
	var template        = require( 'text!apps/homepage/external/widgets/external/groupActivity/templates/widgetItemView.html' );
	var limitCharacters = require( 'apps/homepage/utils/limitCharacters' );

	var className    = 'col-md-12 no-padding groupActivity';
	var templateBind = _.template( template );

	return Marionette.ItemView.extend( {
		'template'        : templateBind,
		'className'       : function () {
			return className;
		},
		'templateHelpers' : function () {
			return {
				'creatorName' : this.limitCharacters( this.model.get( 'LicenseName' ) )
			};
		},
		'limitCharacters' : function ( text ) {
			return limitCharacters( text, 30 );
		}
	} );
} );
