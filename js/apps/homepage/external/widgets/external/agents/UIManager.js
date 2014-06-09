define( function ( require ) {
	'use strict';

	var App = require( 'App' );

	return {
		'limitDescriptionByWidth' : function ( container, model ) {
			var nWidth  = container.find( '.description' ).width();
			var content = model.attributes.COURSENAME;

			if ( nWidth > 0 ) {
				content =  App.Homepage.Utils.limitCharacters( content, ( nWidth / 10 ) );
			}
			return content;
		}
	};

} );
