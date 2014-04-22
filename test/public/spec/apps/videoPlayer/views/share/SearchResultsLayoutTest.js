define( function ( require ) {
	'use strict';

	// test libraries
	var sinon = window.sinon;

	// dependency modules
	var Vent      = require( 'Vent' );
	var SearchResultsLayout  = require( 'videoPlayer/views/share/SearchResultsLayout' );
	var PeopleCollectionView = require( 'videoPlayer/views/share/PeopleCollectionView' );
	var GroupsCollectionView = require( 'videoPlayer/views/share/GroupsCollectionView' );

	describe( 'SearchResultsLayout', function () {

		var searchResultsLayout;

		before( function () {
			searchResultsLayout = new SearchResultsLayout( {
				'peopleCollectionView' : new PeopleCollectionView(),
				'groupsCollectionView' : new GroupsCollectionView()
			} );
		} );

		after( function () {
			searchResultsLayout = undefined;
		} );

		it( 'does have a `.template`', function () {
			searchResultsLayout.should.have.property( 'template' );
		} );

		it( 'does have a `.tagName`', function () {
			searchResultsLayout.should.have.property( 'tagName' );
			searchResultsLayout.tagName.should.eql( 'ul' );
		} );

		it( 'does have a `.region`', function () {
			searchResultsLayout.should.have.property( 'regions' );
			searchResultsLayout.peopleResultsRegion.should.not.be.undefined;
			searchResultsLayout.groupsResultsRegion.should.not.be.undefined;
		} );

		describe( '`.onShow`', function () {

			var peopleResultsRegionShowStub;
			var groupsResultsRegionShowStub;
			var _triggerClickBodySpy;

			beforeEach( function () {
				peopleResultsRegionShowStub = sinon.stub( searchResultsLayout.peopleResultsRegion, 'show' );
				groupsResultsRegionShowStub = sinon.stub( searchResultsLayout.groupsResultsRegion, 'show' );
				_triggerClickBodySpy        = sinon.spy(searchResultsLayout, '_triggerClickBody');

				searchResultsLayout.render().onShow();
			} );

			afterEach( function () {
				searchResultsLayout.peopleResultsRegion.show.restore();
				searchResultsLayout.groupsResultsRegion.show.restore();
				searchResultsLayout._triggerClickBody.restore();
			} );

			it( 'does show people results', function () {
				peopleResultsRegionShowStub.should.have.been.called;
			} );

			it( 'does show group results', function () {
				groupsResultsRegionShowStub.should.have.been.called;
			} );

			it( 'does bind click event on body', function () {
				$( 'body' ).trigger( 'click' );
				_triggerClickBodySpy.should.have.callCount( 1 );
			} );

		} );

		describe( '`.onClose`', function () {
			var _triggerClickBodySpy;

			before( function () {
				_triggerClickBodySpy = sinon.spy( searchResultsLayout, '_triggerClickBody' );
				searchResultsLayout.render().onClose();
			} );

			it( 'does unbind click event on body', function () {
				$( 'body' ).trigger( 'click' );
				_triggerClickBodySpy.should.have.callCount( 0 );
			} );

		} );

		describe( '`._triggerClickBody`', function () {
			var dummyEvent = {};

			it( 'does trigger an event', function ( done ) {
				Vent.on( 'videoPlayer:click:body', function () {
					done();
				} );
				searchResultsLayout._triggerClickBody( dummyEvent );
			} );

		} );

	} );

} );
