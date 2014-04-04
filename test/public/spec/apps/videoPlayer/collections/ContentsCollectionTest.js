define( function ( require ) {
	'use strict';

	// test libraries
	var $            = require( 'jquery' );
	var sinon        = window.sinon;
	var Remoting     = require( 'Remoting' );

	var ContentModel           = require( 'videoPlayer/models/ContentModel' );
	var UserContentsCollection = require( 'videoPlayer/collections/ContentsCollection' );

	describe( 'UserContentsCollection', function () {

		var userContentsCollection;

		before( function () {
			userContentsCollection = new UserContentsCollection();
		} );

		describe( '.initialize', function () {

			it( 'does have `fetchRequest` object', function () {
				userContentsCollection.fetchRequest.should.not.be.undefined;
			} );

			it( 'does have `queueRequest` object', function () {
				userContentsCollection.queueRequest.should.not.be.undefined;
			} );

		} );

		describe( '`.contentRequest`', function () {

			var options = {
				'success' : function () {},
				'error'   : function () {},
				'always'  : function () {}
			};

			before( function () {
				sinon.stub( Remoting, 'fetch' ).returns( $.Deferred() );
			} );

			after( function () {
				Remoting.fetch.restore();
			} );

			it( 'does fetch data', function () {
				userContentsCollection.contentRequest( options );
				Remoting.fetch.should.have.callCount( 1 );
			} );

			describe( 'when options has method specified', function () {

				before( function () {
					sinon.stub( userContentsCollection, '_prepareRequest' );
				} );

				after( function () {
					userContentsCollection._prepareRequest.restore();
				} );

				it( 'does call prepare content request', function () {
					userContentsCollection.contentRequest( { 'method' : 'create' } );
					userContentsCollection._prepareRequest.should.have.callCount( 1 );
				} );

			} );

			describe( 'when options has no method specified', function () {

				before( function () {
					sinon.stub( userContentsCollection, '_prepareRequest' );
				} );

				after( function () {
					userContentsCollection._prepareRequest.restore();
				} );

				it( 'does not call prepare content request', function () {
					userContentsCollection.contentRequest( {} );
					userContentsCollection._prepareRequest.should.have.callCount( 0 );
				} );

			} );

		} );

		describe( '.search', function () {

			var searchResult;

			before( function () {
				userContentsCollection.reset( { 'ContentId' : 12345 } );
			} );

			describe( 'when the model is in the collection', function () {

				it( 'does returns true', function () {
					searchResult = userContentsCollection.search( 'ContentId', 12345 );
					searchResult.should.be.true;
				} );

			} );

			describe( 'when the model is not in the collection', function () {

				it( 'does returns true', function () {
					searchResult = userContentsCollection.search( 'ContentId', 54321 );
					searchResult.should.be.false;
				} );

			} );

		} );

		describe( '._prepareRequest', function () {

			var contentModel = new ContentModel ( {
				'ContentId'      : 12345,
				'Created' : 'August, 09 2011 21:02:32'
			} );

			var options = {
				'method' : 'create',
				'model'  : contentModel
			};

			before( function () {
				userContentsCollection = new UserContentsCollection();
				userContentsCollection._prepareRequest( options );
			} );

			it( 'does set the queueRequest `method`', function () {
				userContentsCollection.queueRequest.method.should.eql( options.method );
			} );

			it( 'does clear the queueRequest `signature`', function () {
				userContentsCollection.queueRequest.signature.should.eql( '' );
			} );

			it( 'does set the queueRequest `ContentId` args', function () {
				userContentsCollection.queueRequest.args.ContentId.should.eql( contentModel.id );
			} );

			it( 'does set the queueRequest `Created` args', function () {
				userContentsCollection.queueRequest.args.Created.should.eql( contentModel.get( 'Created' ) );
			} );

		} );

	} );

} );
