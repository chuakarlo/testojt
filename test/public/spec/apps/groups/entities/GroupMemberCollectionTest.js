define( function ( require ) {
	'use strict';

	var $        = require( 'jquery' );
	var Backbone = require( 'backbone' );
	var sinon    = window.sinon;
	var App      = require( 'App' );

	require( 'groups/entities/GroupMemberCollection' );

	describe( 'GroupMemberCollection', function () {
		var members;
		var stub;

		before( function () {
			stub = sinon.stub().returns( false );
			App.reqres.setHandler( 'pd360:available', stub );
		} );

		describe( 'Missing group ID', function () {

			it( 'should throw an error if you did not provide a group id', function () {
				( function () { new App.Entities.GroupMemberCollection(); } ).should.throw(/groupId/);
			} );
		} );

		describe( 'With group ID', function () {

			before( function () {
				members = new App.Entities.GroupMemberCollection( [ ], {
					'groupId' : 123,
					'limit' : 10
				} );
			} );

			it( 'should be an instance of Backbone.CFCollection', function () {
				members.should.be.instanceof( Backbone.CFCollection );
			} );

			it( 'should set the group id and a default file type', function () {
				members.groupId.should.equal( 123 );
			} );

			describe( '.getReadOptions (collection.fetch)', function () {
				var ajaxStub;

				before( function () {
					ajaxStub = sinon.stub( $, 'ajax' );
					ajaxStub.onFirstCall().yieldsTo('success', 'fakeSignature');
				} );

				after( function () {
					$.ajax.restore();
				} );

				it( 'should send the proper arguments when fetching the members', function () {
					members.fetch();
					var call = ajaxStub.getCall( 1 );
					var callData = JSON.parse( call[ 'args' ][ 0 ][ 'data' ]);

					callData.path.should.contain( 'GroupService' );
					callData.method.should.equal( 'getUsersInGroup' );
					callData.args.should.eql( {
						'licId'   : 123,
						'maxRows' : 10
					} );

				} );

			} );

		} );

	} );

} );
