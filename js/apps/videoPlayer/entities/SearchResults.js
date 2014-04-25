define( function ( require ) {
	'use strict';

	var App      = require( 'App' );
	var Backbone = require( 'backbone' );

	App.module( 'VideoPlayer.Entities', function ( Entities ) {

		Entities.TreeNodeModel = Backbone.CFModel.extend( {

			'initialize' : function () {
				var nodes = this.get( 'nodes' );

				if ( nodes ) {
					this.nodes = new Entities.TreeNodeCollection( nodes );
					this.unset( 'nodes' );
				}
			}

		} );

		Entities.TreeNodeCollection = Backbone.CFCollection.extend( {

			'model' : Entities.TreeNodeModel

		} );

	} );

} );
