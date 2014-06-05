define( function ( require ) {
	'use strict';

	var App      = require( 'App' );
	var Backbone = require( 'backbone' );

	App.module( 'ContentNavigation.Entities', function ( Entities ) {

		Entities.CustomContentModel = Backbone.Model.extend ( {
			'idAttribute' : 'ContentId',
			'initialize'  : function () {
				this.set( 'VideoTypeId', 1 );
			}
		} );

		Entities.CustomContentCollection = Backbone.Collection.extend( {
			'model' : Entities.CustomContentModel
		} );

	} );
} );
