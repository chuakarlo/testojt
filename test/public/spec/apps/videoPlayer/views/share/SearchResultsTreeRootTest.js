define( function ( require ) {
	'use strict';

	var sinon    = window.sinon;
	var TreeRoot = require( 'videoPlayer/views/share/SearchResultsTreeRoot' );

	describe( 'description', function () {

		var searchResultsTreeRoot;

		before( function () {
			searchResultsTreeRoot = new TreeRoot();
		} );

		after( function () {
			searchResultsTreeRoot = undefined;
		} );

		it( 'does have a `tagName`', function () {
			searchResultsTreeRoot.should.have.property( 'tagName' );
			searchResultsTreeRoot.tagName.should.eql( 'ul' );
		} );

		it( 'does have an `itemView`', function () {
			searchResultsTreeRoot.should.have.property( 'itemView' );
		} );

		it( 'does have an `emptyView`', function () {
			searchResultsTreeRoot.should.have.property( 'emptyView' );
		} );

	} );

} );
