define( function ( require ) {
	'use strict';

	var sinon    = window.sinon;
	var App      = require( 'App' );
	var Backbone = require( 'backbone' );
	var TreeView = require( 'videoPlayer/views/share/SearchResultsTreeView' );

	describe( 'SearchResultsTreeView', function () {

		var searchResultsTreeView;
		var model = new Backbone.Model.extend( {
			'nodes' : [ ]
		} );

		before( function () {
			searchResultsTreeView = new TreeView( {
				'model' : model
			} );
		} );

		after( function () {
			searchResultsTreeView = undefined;
		} );

		it( 'does have a `template`', function () {
			searchResultsTreeView.should.have.property( 'template' );
		} );

		it( 'does have a `tagName`', function () {
			searchResultsTreeView.should.have.property( 'tagName' );
			searchResultsTreeView.tagName.should.eql( 'li' );
		} );

		it( 'does have a `ui`', function () {
			searchResultsTreeView.should.have.property( 'ui' );
		} );

		it( 'does have `events`', function () {
			searchResultsTreeView.should.have.property( 'events' );
		} );

		// These don't have any assertions?
		describe.skip( '.selectItem', function () {

			var evt = {
				'stopPropagation' : function () {},
				'preventDefault'  : function () {}
			};

			it( 'does fire an event', function ( done ) {
				App.vent.on( 'videoPlayer:share:item:selected', function () {
					done();
				} );

				searchResultsTreeView.selectItem( evt );
			} );

		} );

		describe.skip( '._triggerClickBody', function () {

			it( 'does fire an event', function ( done ) {
				App.vent.on( 'videoPlayer:click:body', function () {
					done();
				} );

				searchResultsTreeView._triggerClickBody( { } );
			} );

		} );

	} );

} );
