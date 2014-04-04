define( function ( require ) {
	'use strict';

	var expect = window.chai.expect;

	var SelectedItemsCollectionView = require( 'videoPlayer/views/share/SelectedItemsCollectionView' );
	var SelectedItemsCollection     = require( 'videoPlayer/collections/SelectedItemsCollection' );

	describe( 'SelectedItemsCollectionView CompositeView', function () {

		before( function () {
			this.dummyEmails = new SelectedItemsCollection();

			this.dummyEmails.reset( [ {
				'id'           : 1,
				'name'         : 'Teacher One',
				'emailAddress' : 't1@one.com'
			}, {
				'id'           : 2,
				'name'         : 'Teacher Two',
				'emailAddress' : 't2@one.com'
			}, {
				'id'           : 3,
				'name'         : 'Teacher Three',
				'emailAddress' : 't3@one.com'
			} ] );

			this.view = new SelectedItemsCollectionView( {
				'collection' : this.dummyEmails
			} );

			this.theView = this.view.render();

		} );

		after( function () {
			this.view = null;
		} );

		it( 'should have an `itemView` property', function () {
			this.view.should.have.property( 'itemView' );
		} );

		/**
		 * Verify that the view is an instance of SelectedItemsCollectionView
		 */
		describe( 'Instantiation', function () {
			it( 'should be an instance of SelectedItemsCollectionView Collectionview', function () {
				this.view.should.be.an.instanceof( SelectedItemsCollectionView );
			} );
		} );

		/**
		 * Verify that the emails is stored in the collection
		 */
		describe( 'Emails that are stored in the collection', function () {
			/**
			 * Verify that the collection is an object
			 */
			it( 'should be an object', function () {
				expect( this.view.collection ).to.be.an( 'object' );
			} );

			/**
			 * Verify that the collection has 3 values
			 */
			it( 'should have a length of 3', function () {
				expect( this.view.collection.length ).to.be.equal( 3 );
			} );

			/**
			 * Verify that the collection is equal to the value set.
			 */
			it( 'should be equal to the data being passed', function () {
				expect( this.theView.collection ).to.equal( this.dummyEmails );
			} );
		} );
	} );
} );
