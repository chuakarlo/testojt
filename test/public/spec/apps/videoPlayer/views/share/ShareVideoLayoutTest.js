define( function ( require ) {
	'use strict';

	// test libraries
	var sinon = window.sinon;

	// dependency modules
	var $                = require( 'jquery' );
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
		} )

		describe( 'events', function () {

			var searchStub;
			var shareVideoStub;

			before( function () {
				searchStub     = sinon.stub( shareVideoLayout, 'search' );
				shareVideoStub = sinon.stub( shareVideoLayout, 'shareVideo' );

				shareVideoLayout.render();
			} );

			after( function () {
				shareVideoLayout.search.restore();
				shareVideoLayout.shareVideo.restore();
			} );

			describe( 'when keyup in search input', function () {

				it( 'does call `.search`', function ( done ) {
					shareVideoLayout.ui.searchInput.on( 'keyup', function () {
						done();
					} );
					shareVideoLayout.ui.searchInput.trigger( 'keyup' );
				} );

			} );

			describe( 'when share video button is clicked', function () {

				it( 'does call `.shareVideo`', function ( done ) {
					shareVideoLayout.ui.shareButton.on( 'click', function () {
						done();
					} );
					shareVideoLayout.ui.shareButton.trigger( 'click' );
				} );

			} );

		} );

		describe( '`.initialize`', function () {

			it( 'does copy the passed options', function () {
				shareVideoLayout.model.should.not.be.undefined;
			} );

		} );

		describe( '`.onShow`', function () {

			var sharedVideoRegionShowStub;

			before( function () {
				sharedVideoRegionShowStub = sinon.stub( shareVideoLayout.sharedVideoRegion, 'show' );
			} );

			after( function () {
				shareVideoLayout.sharedVideoRegion.show.restore();
			} );

			it( 'does show the shared video', function () {
				shareVideoLayout.render().onShow();
				sharedVideoRegionShowStub.should.have.callCount( 1 );
			} );

		} );

		describe( '`.selectText`', function () {

			var selectTextSpy;

			before( function () {
				selectTextSpy = sinon.spy( shareVideoLayout.ui.searchInput, 'select' );
			} );

			after( function () {
				shareVideoLayout.ui.searchInput.select.restore();
			} )

			it( 'does select the search input value', function () {
				shareVideoLayout.selectText();
				selectTextSpy.should.have.callCount( 1 );
			} );

		} );

		describe( '`.search`', function () {

			var searchPeopleStub;
			var searchGroupsStub;
			var dummyEvent = {
				'preventDefault'  : function () {},
				'stopPropagation' : function () {}
			};

			beforeEach(function () {
				searchPeopleStub = sinon.stub( shareVideoLayout, 'searchPeople' );
				searchGroupsStub = sinon.stub( shareVideoLayout, 'searchGroups' );
			} );

			afterEach( function () {
				shareVideoLayout.searchPeople.restore();
				shareVideoLayout.searchGroups.restore();
			} );

			describe( 'when search input is not empty', function () {

				it( 'does search people and groups', function () {
					shareVideoLayout.ui.searchInput.val( 'test' );
					shareVideoLayout.search( dummyEvent );
				} );

			} );

		} );

		describe( '`.searchPeople`', function () {

			var callback;
			var remotingFetchStub;

			beforeEach( function () {
				callback = sinon.spy();
				remotingFetchStub = sinon.stub( Remoting, 'fetch' ).returns( $.Deferred() );
			} );

			afterEach( function () {
				Remoting.fetch.restore();
			} );

			describe( 'when no match is found', function () {

				it( 'does not return results', function () {
					shareVideoLayout.searchPeople( callback ).resolve( [ [ {} ] ] );
					callback.should.have.callCount( 1 );
				} );

			} );

			describe( 'when match is found', function () {

				it( 'does return results', function () {
					shareVideoLayout.searchPeople( callback ).resolve( [ [ {}, {} ] ] );
					callback.should.have.callCount( 1 );
				} );

			} );

			describe( 'on error', function () {

				it( 'does execute error callback', function () {
					shareVideoLayout.searchPeople( callback ).reject( 'Error' );
					callback.should.have.callCount( 1 );
				} );

			} );

		} );

		describe( '`.searchGroups`', function () {

			var callback;
			var remotingFetchStub;

			beforeEach( function () {
				callback = sinon.spy();
				remotingFetchStub = sinon.stub( Remoting, 'fetch' ).returns( $.Deferred() );
			} );

			afterEach( function () {
				Remoting.fetch.restore();
			} );

			describe( 'when no match is found', function () {

				it( 'does not return results', function () {
					shareVideoLayout.searchGroups( callback ).resolve( [ [ {} ] ] );
					callback.should.have.callCount( 1 );
				} );

			} );

			describe( 'when match is found', function () {

				it( 'does return results', function () {
					shareVideoLayout.searchGroups( callback ).resolve( [ [ {}, {} ] ] );
					callback.should.have.callCount( 1 );
				} );

			} );

			describe( 'on error', function () {

				it( 'does execute error callback', function () {
					shareVideoLayout.searchGroups( callback ).reject( 'Error' );
					callback.should.have.callCount( 1 );
				} );

			} );

		} );

		describe( '`.showSearchResults`', function () {

			var searchResultsRegionShowSpy;

			before( function () {
				searchResultsRegionShowSpy = sinon.spy( shareVideoLayout.searchResultsRegion, 'show' );
			} );

			after( function () {
				shareVideoLayout.searchResultsRegion.show.restore();
			} );

			it( 'does show search results', function () {
				shareVideoLayout.showSearchResults();
				searchResultsRegionShowSpy.should.have.callCount( 1 );
			} );

		} );

		describe( '`.selectItem`', function () {

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

		describe( '`.hideSearchResults`', function () {

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

		describe( '`.setShareBtnState`', function () {

			before( function () {
				shareVideoLayout.render();
			} );

			describe( 'when no selected items', function () {

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
					shareVideoLayout.ui.shareButton.is( '[disabled]' ).should.be.false;;
				} );

			} );

		} );

	} );

} );
