define( function ( require ) {
	'use strict';

	var sinon    = window.sinon;
	var App      = require( 'App' );
	var Backbone = require( 'backbone' );

	require( 'videoPlayer/entities/SearchResults' );

	describe( 'VideoPlayer Entities', function () {

		it( 'is attached to `App.VideoPlayer`', function () {
			App.should.have.property( 'VideoPlayer' );
			App.VideoPlayer.should.have.property( 'Entities' );
			App.VideoPlayer.Entities.should.have.property( 'TreeNodeModel' );
			App.VideoPlayer.Entities.should.have.property( 'TreeNodeCollection' );
		} );

		describe( 'TreeNodeModel Entity', function () {

			var nodes = { 'nodes' : [ { }, { } ] };

			var treeNode = new App.VideoPlayer.Entities.TreeNodeModel( nodes );

			it( 'does get all nodes and create a collection', function () {
				treeNode.nodes.should.be.an.instanceof( Backbone.CFCollection );
			} );
		} );

		describe( 'TreeNodeCollection Entity', function () {

			var treeNodes = new App.VideoPlayer.Entities.TreeNodeCollection();

			it( 'does have a model', function () {
				treeNodes.should.have.property( 'model' );
			} );

		} );

	} );

} );
