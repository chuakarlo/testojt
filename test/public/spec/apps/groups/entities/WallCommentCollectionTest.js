define( function ( require ) {
	'use strict';

	var $        = require( 'jquery' );
	var Backbone = require( 'backbone' );
	var sinon    = window.sinon;
	var App      = require( 'App' );

	require( 'groups/entities/WallCommentCollection' );

	var fakeData = require( './CommentData' );

	describe( 'WallCommentCollection', function () {

		var comments;
		var stub;

		before( function () {
			stub = sinon.stub().returns( false );
			App.reqres.setHandler( 'pd360:available', stub );
		} );

		describe( 'Missing group ID', function () {

			it( 'should throw an error if you did not provide a group id', function () {
				( function () {
					new App.Entities.WallCommentCollection();
				} ).should.throw(/groupId/);
			} );
		} );

		describe( 'With group ID', function () {

			before( function () {
				comments = new App.Entities.WallCommentCollection( [ ], {
					'groupId' : 123
				} );
			} );

			it( 'should be an instance of Backbone.CFCollection', function () {
				comments.should.be.instanceof( Backbone.CFCollection );
			} );

			it( 'should create a query model to keep track of the infinite scrolling', function () {
				comments.wallQueryModel.should.be.instanceof( Backbone.Model );
			} );

			it( 'should set the maxResults attribute to false', function () {
				comments.maxResults.should.equal( false );
			} );

			it( 'should have default values and the group id in the query model', function () {
				comments.wallQueryModel.toJSON().should.eql( {
					'licId'     : 123,
					'startRow'  : 0,
					'numRows'   : 15,
					'totalRows' : 80,
					'msgFlag'   : 1,
					'newsFlag'  : 1
				} );
			} );

		} );

		describe( '.getReadOptions (model.fetch)', function () {
			var ajaxStub;

			before( function () {
				comments = new App.Entities.WallCommentCollection( [ ], {
					'groupId' : 123
				} );
				ajaxStub = sinon.stub( $, 'ajax' );
				ajaxStub.onFirstCall().yieldsTo('success', 'fakeSignature');
			} );

			after( function () {
				$.ajax.restore();
			} );

			it( 'should pass in the right arguments when fetch the comments', function () {
				comments.fetch();
				var call = ajaxStub.getCall( 1 );
				var callData = JSON.parse( call.args[ 0 ].data);

				callData.path.should.contain( 'groups.GroupMessagesGateway' );
				callData.method.should.equal( 'getGroupWall' );
				callData.args.should.eql( comments.wallQueryModel.toJSON() );
			} );

		} );

		describe( '.comparator', function () {
			var ajaxStub;

			before( function () {
				comments = new App.Entities.WallCommentCollection( [ ], {
					'groupId' : 123
				} );
				ajaxStub = sinon.stub( $, 'ajax' );
				ajaxStub.onFirstCall().yieldsTo('success', 'fakeSignature');
				ajaxStub.onSecondCall().yieldsTo( 'success', fakeData );
				comments.fetch();
			} );

			after( function () {
				$.ajax.restore();
			} );

			it( 'should sort them by the "Created" attribute', function () {

				comments.first().get( 'Created' ).should.equal( 'May, 16 2014 09:15:12' );
				comments.last().get( 'Created' ).should.equal( 'May, 06 2014 19:46:42' );

			} );

		} );

		describe( '.parse', function () {
			var ajaxStub;

			beforeEach( function () {
				comments = new App.Entities.WallCommentCollection( [ ], {
					'groupId' : 123
				} );
				ajaxStub = sinon.stub( $, 'ajax' );
				ajaxStub.onFirstCall().yieldsTo('success', 'fakeSignature');
				// fakeData has 7 comments
				ajaxStub.onSecondCall().yieldsTo( 'success', fakeData );

				comments.fetch();
			} );

			afterEach( function () {
				$.ajax.restore();
			} );

			it( 'should set the maxResults to true as there is less results than our max', function () {
				comments.maxResults.should.equal( true );
			} );

			it( 'should set the maxResults to true when there are more models than our totalRows', function () {
				// set the maxResults back since we only have 7 mondels. Also
				// update the query model to expect less models
				comments.maxResults = false;
				comments.wallQueryModel.set( {
					'totalRows' : 2,
					'numRows'   : 2
				} );

				ajaxStub.onCall( 2 ).yieldsTo('success', 'fakeSignature');
				// fakeData has 7 comments
				ajaxStub.onCall( 3 ).yieldsTo( 'success', fakeData );

				comments.fetch();

				comments.maxResults.should.equal( true );

			} );
			it( 'should parse the children and remove comments that are replies', function () {
				// MessageId !== 1 means it's a reply
				comments.models.length.should.equal( 4 );
				comments.where( { 'Message' : 'test reply' } ).should.eql( [ ] );
			} );

			it( 'should set the replies to a reply attribute on the models', function () {
				var replies1 = comments.models[ 0 ].get( 'replies' );
				var replies2 = comments.models[ 1 ].get( 'replies' );
				replies1.length.should.equal( 2 );

				replies2.length.should.equal( 1 );
			} );

		} );

		describe( '.getComputedPosition', function () {
			var ajaxStub;

			before( function () {
				comments = new App.Entities.WallCommentCollection( [ ], {
					'groupId' : 123
				} );
				ajaxStub = sinon.stub( $, 'ajax' );
				ajaxStub.onFirstCall().yieldsTo('success', 'fakeSignature');
				// fakeData has 7 comments
				ajaxStub.onSecondCall().yieldsTo( 'success', fakeData );

				comments.fetch();
			} );

			after( function () {
				$.ajax.restore();
			} );

			it( 'should return the expected index on the server when passed a model', function () {
				// This needs to take into account the position of each models replies
				var comment1 = comments.models[ 0 ];
				var comment2 = comments.models[ 1 ];
				var comment3 = comments.models[ 2 ];

				comments.getComputedPosition( comment1 );
				comments.computedPosition.should.equal( 0 );

				comments.getComputedPosition( comment2 );
				comments.computedPosition.should.equal( 3 );

				comments.getComputedPosition( comment3 );
				comments.computedPosition.should.equal( 5 );
			} );

		} );

		describe( '.updateStartRow', function () {
			var ajaxStub;

			before( function () {
				comments = new App.Entities.WallCommentCollection( [ ], {
					'groupId' : 123
				} );
				ajaxStub = sinon.stub( $, 'ajax' );
				ajaxStub.onFirstCall().yieldsTo('success', 'fakeSignature');
				// fakeData has 7 comments
				ajaxStub.onSecondCall().yieldsTo( 'success', fakeData );

				comments.fetch();
			} );

			after( function () {
				$.ajax.restore();
			} );

			it( 'should update the start row based on the number of results', function () {
				comments.updateStartRow();
				comments.wallQueryModel.get( 'startRow' ).should.equal( 7 );
			} );

		} );

		describe( '.newCommentFetch', function () {
			var ajaxStub;

			beforeEach( function () {
				comments = new App.Entities.WallCommentCollection( [ ], {
					'groupId' : 123
				} );
				ajaxStub = sinon.stub( $, 'ajax' );
				ajaxStub.onFirstCall().yieldsTo( 'success', 'fakeSignature' );
				// fakeData has 7 comments
				ajaxStub.onSecondCall().yieldsTo( 'success', fakeData );

				comments.fetch();

				ajaxStub.onCall( 2 ).yieldsTo( 'success', 'fakeSignature' );
			} );

			afterEach( function () {
				$.ajax.restore();
			} );

			it( 'should update the queryModel with the provided arguments', function () {

				comments.newCommentFetch( {
					'startRow' : 10,
					'numRows'  : 1
				} );

				var call = ajaxStub.getCall( 3 );
				var callData = JSON.parse( call.args[ 0 ].data);

				callData.args.numRows.should.equal( 1 );
				callData.args.startRow.should.equal( 10 );

			} );

			it( 'should revert the queryModel attributes once its done fetching', function () {
				ajaxStub.onCall( 3 ).yieldsTo( 'success', '' );
				comments.newCommentFetch( {
					'startRow' : 9,
					'numRows'  : 2
				} );

				comments.wallQueryModel.get( 'startRow' ).should.equal( 0 );
				comments.wallQueryModel.get( 'numRows' ).should.equal( 15 );
			} );

			it( 'should call success callback funciton if available on success', function () {
				ajaxStub.onCall( 3 ).yieldsTo( 'success', '' );

				var successSpy = sinon.spy();
				var errorSpy = sinon.spy();

				comments.newCommentFetch( {
					'startRow'  : 9,
					'numRows'   : 2,
					'successCb' : successSpy,
					'errorCb'   : errorSpy
				} );

				successSpy.callCount.should.equal( 1 );
				errorSpy.callCount.should.equal( 0 );

			} );

			it( 'should call error callback function if available on error', function () {
				ajaxStub.onCall( 3 ).yieldsTo( 'error', '' );

				var successSpy = sinon.spy();
				var errorSpy = sinon.spy();

				comments.newCommentFetch( {
					'startRow'  : 9,
					'numRows'   : 2,
					'successCb' : successSpy,
					'errorCb'   : errorSpy
				} );

				successSpy.callCount.should.equal( 0 );
				errorSpy.callCount.should.equal( 1 );

			} );

		} );
	} );

} );
