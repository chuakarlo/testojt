define( function ( require ) {
	'use strict';

	var App      = require( 'App' );
	var Backbone = require( 'backbone' );

	var contents = [
		require( 'apps/homepage/external/content2/external/queue/base' ),
		require( 'apps/homepage/external/content2/external/recommended/base' )
	];

	App.module( 'Homepage.Sections.Content', function ( Content ) {
		Content.allContents       = contents;
		Content.contentCollection = function () {
			return new Backbone.Collection( Content.allContents );
		};
	} );
} );
