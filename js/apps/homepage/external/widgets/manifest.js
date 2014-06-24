define( function ( require ) {
	'use strict';

	var App                 = require( 'App' );
	var courseMessages      = require( 'text!apps/homepage/external/widgets/external/courses/configuration/messages.json' );
	var focusMessages       = require( 'text!apps/homepage/external/widgets/external/focusObjective/configuration/messages.json' );
	var groupMessages       = require( 'text!apps/homepage/external/widgets/external/groupActivity/configuration/messages.json' );
	var nullMessages        = require( 'text!apps/homepage/external/widgets/external/null/configuration/messages.json' );
	var observationMessages = require( 'text!apps/homepage/external/widgets/external/observationsOfMe/configuration/messages.json' );
	var processMessages     = require( 'text!apps/homepage/external/widgets/external/processOfMe/configuration/messages.json' );
	var profileMessages     = require( 'text!apps/homepage/external/widgets/external/yourProfile/configuration/messages.json' );

	function LoadAllWidgets () {
		var parent = [ ];

		require( 'apps/homepage/external/widgets/external/null/base' ).registerWidget( parent, function () {
			App.Homepage.Utils.loadMessages( nullMessages );
		} );
		require( 'apps/homepage/external/widgets/external/courses/base' ).registerWidget( parent, function () {
			App.Homepage.Utils.loadMessages( courseMessages );
		} );
		require( 'apps/homepage/external/widgets/external/focusObjective/base' ).registerWidget( parent, function () {
			App.Homepage.Utils.loadMessages( focusMessages );
		} );
		require( 'apps/homepage/external/widgets/external/groupActivity/base' ).registerWidget( parent, function () {
			App.Homepage.Utils.loadMessages( groupMessages );
		} );
		require( 'apps/homepage/external/widgets/external/yourProfile/base' ).registerWidget( parent, function () {
			App.Homepage.Utils.loadMessages( profileMessages );
		} );
		require( 'apps/homepage/external/widgets/external/observationsOfMe/base' ).registerWidget( parent, function () {
			App.Homepage.Utils.loadMessages( observationMessages );
		} );
		require( 'apps/homepage/external/widgets/external/processOfMe/base' ).registerWidget( parent, function () {
			App.Homepage.Utils.loadMessages( processMessages );
		} );

		return parent;
	}

	App.module( 'Homepage.Widgets', function ( Widgets ) {
		Widgets.allWidgets = LoadAllWidgets;
	} );

});
