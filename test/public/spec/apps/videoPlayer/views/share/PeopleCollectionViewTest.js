define( function ( require ) {
	'use strict';

	// test libraries
	var sinon = window.sinon;

	// dependency modules
	var PeopleCollectionView = require( 'videoPlayer/views/share/PeopleCollectionView' );

	describe( 'PeopleCollectionView', function () {

		var peopleCollectionView;

		before( function () {
			peopleCollectionView = new PeopleCollectionView();
		} );

		after( function () {
			peopleCollectionView = undefined;
		} );

		it( 'does have `.itemView`', function () {
			peopleCollectionView.should.have.property( 'itemView' );
		} );

		it( 'does have `.tagName`', function () {
			peopleCollectionView.should.have.property( 'tagName' );
		} );

		it( 'does have `.emptyView`', function () {
			peopleCollectionView.should.have.property( 'emptyView' );
		} );

	} );

} );
