define( function ( require ) {
	'use strict';

	// test libraries
	var sinon = window.sinon;

	// dependency modules
	var GroupsCollectionView = require( 'videoPlayer/views/share/GroupsCollectionView' );

	describe( 'GroupsCollectionView', function () {

		var groupsCollectionView;

		before( function () {
			groupsCollectionView = new GroupsCollectionView();
		} );

		after( function () {
			groupsCollectionView = undefined;
		} );

		it( 'does have `.itemView`', function () {
			groupsCollectionView.should.have.property( 'itemView' );
		} );

		it( 'does have `.tagName`', function () {
			groupsCollectionView.should.have.property( 'tagName' );
		} );

		it( 'does have `.emptyView`', function () {
			groupsCollectionView.should.have.property( 'emptyView' );
		} );

	} );

} );
