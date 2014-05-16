define( function ( require ) {
	'use strict';

	var $        = require( 'jquery' );
	var Backbone = require( 'backbone' );
	var sinon    = window.sinon;
	var App      = require( 'App' );

	require( 'groups/entities/WallCommentModel' );

	var fakeData = {
		'MessageThreadId' : 1,
		'MessageId'       : 2,
		'LicenseId'       : 3,
		'Message'         : 'foo',
		'Creator'         : 123,
		'Created'         : '',
		'CreatorAvatar'   : 'default.png',
		'CreatorFullName' : 'Juan Pablo',
		'Remover'         : '',
		'Removed'         : ''
	};

	describe( 'WallCommentModel', function () {
		var comment;

		before( function () {
			comment = new App.Entities.WallCommentModel();
			var stub = sinon.stub().returns(false);
			App.reqres.setHandler( 'pd360:available', stub );
		} );

		it( 'should be an instance of Backbone.CFModel', function () {
			comment.should.be.instanceof( Backbone.CFModel );
		} );

		describe( ' non-reply comment', function () {

			it( 'should not be a reply by default', function () {
				comment.reply.should.be.false;
			} );

			describe( '.getCreateOptions (model.save)', function () {
				var ajaxStub;

				before( function () {
					ajaxStub = sinon.stub( $, 'ajax' );
					ajaxStub.onFirstCall().yieldsTo('success', 'fakeSignature');
				} );

				after( function () {
					$.ajax.restore();
				} );

				it( 'should pass in the right arguments when saving a comment', function () {
					comment.save( fakeData );

					var call = ajaxStub.getCall( 1 );

					var callData = JSON.parse( call[ 'args' ][ 0 ][ 'data' ]);

					callData.path.should.contain( 'groups.GroupMessagesGateway' );
					callData.method.should.equal( 'createNewMessage' );
					callData.objectPath.should.contain( 'groups.GroupMessages' );
					callData.args.should.eql( fakeData );

				} );

			} );

		} );

		describe( 'reply comment', function () {

			before( function () {
				comment = new App.Entities.WallCommentModel(null, {
					'reply' : true
				} );
			} );

			it( 'should allow the reply to be passed in on initialize in the options dict', function () {
				comment.reply.should.be.true;
			} );

			describe( '.getCreateOptions (model.save)', function () {
				var ajaxStub;

				before( function () {
					ajaxStub = sinon.stub( $, 'ajax' );
					ajaxStub.onFirstCall().yieldsTo('success', 'fakeSignature');
				} );

				after( function () {
					$.ajax.restore();
				} );

				it( 'should pass in the right arguments when saving a comment reply', function () {
					comment.save( fakeData );

					var call = ajaxStub.getCall( 1 );

					var callData = JSON.parse( call[ 'args' ][ 0 ][ 'data' ]);
					callData.method.should.equal( 'respondToMessage' );

				} );

			} );

		} );

		describe( 'getDeleteOptions (model.destroy)', function () {
			var ajaxStub;

			before( function () {
				ajaxStub = sinon.stub( $, 'ajax' );
				ajaxStub.onFirstCall().yieldsTo( 'success', 'fakeSignature' );
			} );

			after(  function () {
				$.ajax.restore();
			} );

			it( 'should pass the right arguments when deleting a comment', function () {

				// Need to pretend this model is already created on the server
				sinon.stub( comment, 'isNew').returns( false );

				comment.destroy();

				var call = ajaxStub.getCall( 1 );

				var callData = JSON.parse( call[ 'args' ][ 0 ][ 'data' ]);

				callData.method.should.equal( 'deleteByObj' );
				callData.objectPath.should.contain( 'groups.GroupMessages' );
				callData.args.should.eql( fakeData );
				callData.args.should.not.have.keys([ 'id', 'replies' ]);
			} );
		} );

	} );

} );
