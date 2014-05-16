define( function ( require ) {
	'use strict';

	var $        = require( 'jquery' );
	var Backbone = require( 'backbone' );
	var sinon    = window.sinon;
	var App      = require( 'App' );

	require( 'groups/entities/GroupResourcesCollection' );

	describe( 'GroupResourcesCollection', function () {
		var resources;
		var stub;

		before( function () {
			stub = sinon.stub().returns( false );
			App.reqres.setHandler( 'pd360:available', stub );
		} );

		describe( 'Missing group ID', function () {

			it( 'should throw an error if you did not provide a group id', function () {
				( function () { new App.Entities.GroupResourcesCollection(); } ).should.throw(/groupId/);
			} );
		} );

		describe( 'With group ID', function () {

			before( function () {
				resources = new App.Entities.GroupResourcesCollection( [ ], {
					'groupId' : 123
				} );
			} );

			it( 'should be an instance of Backbone.CFCollection', function () {
				resources.should.be.instanceof( Backbone.CFCollection );
			} );

			it( 'should set the group id and a default file type', function () {
				resources.groupId.should.equal( 123 );
				resources.fileType.should.equal( 'leader' );
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

				it( 'should send the proper arguments when fetching the resources', function () {
					resources.fetch();
					var call = ajaxStub.getCall( 1 );
					var callData = JSON.parse( call[ 'args' ][ 0 ][ 'data' ]);

					callData.path.should.contain( 'CommunityService' );
					callData.method.should.equal( 'getFileUploadsByTypeAndLocationAndFileType' );
					callData.args.should.eql( {
						'locationTypeId' : 5,
						'locationId'     : 123,
						'fileTypeId'     : 9,
						'startRow'       : 0,
						'maxRows'        : 500
					} );

				} );

			} );

		} );

		describe( 'With fileType', function () {
			var ajaxStub;

			before( function () {
				resources = new App.Entities.GroupResourcesCollection( [ ], {
					'groupId'  : 123,
					'fileType' : 'member'
				} );
				ajaxStub = sinon.stub( $, 'ajax' );
				ajaxStub.onFirstCall().yieldsTo('success', 'fakeSignature');
			} );

			after( function() {
				$.ajax.restore();
			} );

			it( 'set the fileType attribute', function () {
				resources.fileType.should.equal( 'member' );
			} );

			it( 'send the proper file type to the server when fetching', function () {

				resources.fetch();
				var call = ajaxStub.getCall( 1 );
				var callData = JSON.parse( call[ 'args' ][ 0 ][ 'data' ]);

				callData.args.fileTypeId.should.equal( 11 );
			} );

		} );
	} );

} );
