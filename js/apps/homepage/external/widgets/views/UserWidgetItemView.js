define( function ( require ) {
	'use strict';

	var Marionette = require( 'marionette' );
	var _          = require( 'underscore' );

	var template   = require( 'text!apps/homepage/external/widgets/templates/userWidgetItemView.html' );

	var tagName = 'li';

	return Marionette.CollectionView.extend( {
		'tagName'  : tagName,
		'template' : function () {
			return _.template( template );
		},
		'templateHelpers' : function () {
			return {
				'header' : 'header',
				'footer' : 'footer'
			};
		}
	} );
} );