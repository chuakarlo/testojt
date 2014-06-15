define( function ( require ) {
	'use strict';

	var App = require( 'App' );
	var $   = require( 'jquery' );

	App.module( 'Homepage.Utils', function ( Utils ) {

		var allUtils = [
			Utils,
			require( 'apps/homepage/utils/limitCharacters'),
			require( 'apps/homepage/utils/modelGet'),
			require( 'apps/homepage/utils/progressCircle'),
			require( 'apps/homepage/utils/compareDate'),
			require( 'apps/homepage/utils/timeDiff'),
			require( 'apps/homepage/utils/navigate'),
			require( 'apps/homepage/utils/redirect'),
			require( 'apps/homepage/utils/stringExec'),
			require( 'apps/homepage/utils/proceedHomeAction')
		];

		$.extend.apply( null, allUtils );

		require( [ 'text!apps/homepage/configuration/messages.json' ], function ( json ) {
			Utils.message = JSON.parse( json );
		} );

		Utils.loadMessages = function ( json ) {
			$.extend( Utils.message, JSON.parse( json ) );
		};

		Utils.defaults = {
			'func' : function () {}
		};

		Utils.activeCollections = {};

		Utils.addActiveCollection = function ( key, view ) {
			Utils.activeCollections[ key ] = view.collection;
		};

	} );
} );
