define( function ( require ) {
	'use strict';

	var sinon = window.sinon;

	// dependency modules
	var App              = require( 'App' );
	var Remoting         = require( 'Remoting' );
	var ShareVideoLayout = require( 'videoPlayer/views/share/ShareVideoLayout' );
	var ContentModel     = require( 'videoPlayer/models/ContentModel' );
	var PersonModel      = require( 'videoPlayer/models/PersonModel' );

	describe( 'ShareVideoLayout Layout', function () {

		var shareVideoLayout;
		var contentModel;

		before( function () {
			contentModel     = new ContentModel();
			shareVideoLayout = new ShareVideoLayout( { 'model' : contentModel } );
		} );

		after( function () {
			shareVideoLayout = undefined;
		} );

		it( 'does have a `template`', function () {
			shareVideoLayout.should.have.property( 'template' );
		} );

		it( 'does have `regions`', function () {
			shareVideoLayout.should.have.property( 'regions' );
		} );

		it( 'does have a `className`', function () {
			shareVideoLayout.should.have.property( 'className' );
		} );

		it( 'does have `ui`', function () {
			shareVideoLayout.should.have.property( 'ui' );
		} );

		it( 'does have `events`', function () {
			shareVideoLayout.should.have.property( 'events' );
		} );

		describe( '.initialize', function () {

			it( 'does copy the passed options', function () {
				shareVideoLayout.model.should.not.be.undefined;
			} );

		} );

		describe( '.onShow', function () {

			var sharedVideoRegionShowStub;

			before( function () {
				sharedVideoRegionShowStub = sinon.stub( shareVideoLayout.sharedVideoRegion, 'show' );
			} );

			after( function () {
				shareVideoLayout.sharedVideoRegion.show.restore();
			} );

			it( 'does show the shared video', function () {
				sharedVideoRegionShowStub.should.have.callCount( 0 );
				shareVideoLayout.render().onShow();
				sharedVideoRegionShowStub.should.have.callCount( 1 );
			} );

		} );

		describe( '.selectText', function () {

			var selectTextSpy;

			before( function () {
				selectTextSpy = sinon.spy( shareVideoLayout.ui.searchInput, 'select' );
			} );

			after( function () {
				shareVideoLayout.ui.searchInput.select.restore();
			} );

			it( 'does select the search input value', function () {
				shareVideoLayout.selectText();
				selectTextSpy.should.have.callCount( 1 );
			} );

		} );

		describe( '.search', function () {

			before( function () {
				var stub = sinon.stub().returns( false );
				App.reqres.setHandler( 'pd360:available', stub );
			} );

			after( function () {
				App.reqres.removeHandler( 'pd360:available' );
				Remoting.fetch.restore();
			} );

			it( 'does reset people and groups collection', function ( done ) {
				var fakeData = [ [], [] ];
				var remotingFetchStub = sinon.stub( Remoting, 'fetch' ).returns( fakeData );

				shareVideoLayout.ui.searchInput.val( 'test' );
				shareVideoLayout.search();

				// Wait for debounce to finish
				setTimeout( function () {
					remotingFetchStub.should.have.callCount( 1 );
					done();
				}, 500 );
			} );

		} );

		describe( '.showSearchResults', function () {

			it( 'does show search results', function () {
				shareVideoLayout.showSearchResults( [], [] );
				shareVideoLayout.peopleCollection.length.should.eql( 0 );
				shareVideoLayout.groupsCollection.length.should.eql( 0 );
			} );

		} );

		describe( '.selectItem', function () {

			var itemView;
			var hideSearchResultsSpy;

			before( function () {
				itemView = {
					'model' : new PersonModel( {
						'FirstName' : 'John',
						'LastName'  : 'Doe'
					} )
				};
				hideSearchResultsSpy = sinon.spy( shareVideoLayout, 'hideSearchResults' );
				shareVideoLayout.selectedItems.reset();
				shareVideoLayout.selectItem( itemView );
			} );

			after( function () {
				shareVideoLayout.hideSearchResults.restore();
			} );

			it( 'does add the model the selected items collection', function () {
				shareVideoLayout.selectedItems.should.have.length( 1 );
			} );

			it( 'does fill the search field with the name', function () {
				shareVideoLayout.ui.searchInput.val().should.eql( 'John Doe' );
			} );

			it( 'does hide the search results', function () {
				hideSearchResultsSpy.should.have.callCount( 1 );
			} );

			it( 'blur the search input', function () {
				shareVideoLayout.ui.searchInput.is( ':focus' ).should.be.false;
			} );

		} );

		describe( '.hideSearchResults', function () {

			var dummyEvent;
			var searchResultsRegionCloseSpy;

			beforeEach( function () {
				dummyEvent = {
					'target' : '<input class="search-input" type="text">'
				};
				searchResultsRegionCloseSpy = sinon.spy( shareVideoLayout.searchResultsRegion, 'close' );
			} );

			afterEach( function () {
				shareVideoLayout.searchResultsRegion.close.restore();
			} );

			describe( 'when search input is clicked', function () {

				it( 'does not hide the results', function () {
					shareVideoLayout.hideSearchResults( dummyEvent );
					searchResultsRegionCloseSpy.should.have.callCount( 0 );
				} );

			} );

			describe('when no event is passed', function () {

				it( 'does hide the search results', function () {
					shareVideoLayout.hideSearchResults();
					searchResultsRegionCloseSpy.should.have.callCount( 1 );
				} );

			} );

		} );

		describe( '.setShareBtnState', function () {

			before( function () {
				shareVideoLayout.render();
			} );

			describe( 'when no item selected', function () {

				before( function () {
					shareVideoLayout.selectedItems.reset();
					shareVideoLayout.setShareBtnState();
				} );

				it( 'does disable the share button', function () {
					shareVideoLayout.ui.shareButton.attr( 'disabled' ).should.eql( 'disabled' );
				} );

			} );

			describe( 'when an item is selected', function () {

				before( function () {
					shareVideoLayout.selectedItems.reset( [ { 'FirstName' : 'John' } ] );
					shareVideoLayout.setShareBtnState();
				} );

				it( 'does disable the share button', function () {
					shareVideoLayout.ui.shareButton.is( '[disabled]' ).should.be.false;
				} );

			} );

		} );

	} );

} );
