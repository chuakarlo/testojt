define( function ( require ) {
	'use strict';

	var App        = require( 'App' );
	var template   = require( 'text!apps/homepage/external/content/external/your-queue/templates/queueHeaderView.html' );
	var _          = require( 'underscore' );

	return {
		'doSetHeader' : function () {
			var str = App.request( 'homepage:userProfile' ).FirstName;
			str = str.split( ' ' )[0];
			str = str.toLowerCase().replace( /\b[a-z]/g, function ( letter ) {
				return letter.toUpperCase();
			});
			str = str + '\'' + ( 'sz'.indexOf( str[ str.length - 1 ] ) !== -1 ? '' : 's' );
			return _.template( template, {
				'name' : str
			});
		},

		'doFetchLogic' : function ( collectionParam ) {
			return {
				'collection' : collectionParam,
				'count'      : collectionParam.length
			};
		}
	};
} );