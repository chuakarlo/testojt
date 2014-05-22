define( function ( require ) {
	'use strict';

	var $        = require( 'jquery' );
	var _        = require( 'underscore' );
	var Backbone = require( 'backbone' );
	var sinon    = window.sinon;
	var App      = require( 'App' );

	require( 'groups/entities/GroupModel' );

	describe( 'GroupModel', function () {
		var group;
		var stub;

		before( function () {
			// Stub Flash available call
			stub = sinon.stub().returns( false );
			App.reqres.setHandler( 'pd360:available', stub );

			group = new App.Entities.GroupModel( {
				'LicenseId' : 123
			} );
		} );

		after( function () {
			App.reqres.removeHandler( 'pd360:available' );
			stub = null;
		} );

		it( 'should extend from Backbone.CFModel', function () {
			group.should.be.an.instanceof( Backbone.CFModel );
		} );

		it( 'should have the correct path defined for the ajax request', function () {
			group.path.should.equal( 'GroupService' );
		} );

		it( 'should set the license id', function ( ) {
			group.get( 'LicenseId' ).should.equal( 123 );
		} );

		it( 'should set isMember to false by default' , function ( ) {
			group.isMember.should.equal( false );
		} );

		describe( '.getReadOptions', function () {

			it( 'should return the return the correct method and args', function () {
				var data = {
					'method' : 'getGroupByLicenseId',
					'args'   : {
						'licId' : 123
					}
				};
				var options = group.getReadOptions();
				options.should.eql( data );
			} );
		} );

		describe( '.getCreateOptions', function () {

			it( 'should return the correct method and args to create a group', function () {
				var options = group.getCreateOptions();

				options.path.should.equal( 'LicensesGateway' );
				options.objectPath.should.equal( 'Licenses' );
				options.method.should.equal( 'save' );
				options.args.should.have.keys( _.keys( group.defaults ) );
			} );
		} );

		describe( '.userIsGroupMember', function ( ) {
			var ajaxStub;

			beforeEach( function () {
				ajaxStub = sinon.stub( $, 'ajax' );
				ajaxStub.onFirstCall().yieldsTo( 'success', 'fakeSignature' );
			} );

			afterEach( function () {
				$.ajax.restore();
			} );

			it( 'should make a request with valid data', function () {

				ajaxStub.onSecondCall().yieldsTo(
					'success',
					true
				);

				group.userIsGroupMember( 9 );

				var call = ajaxStub.getCall( 1 );

				var callData = JSON.parse( call.args[ 0 ].data );

				callData.path.should.equal( 'GroupService' );
				callData.method.should.equal( 'userIsGroupMember' );
				callData.args.should.eql( {
					'licId'  : 123,
					'persId' : 9
				});

			} );

			it( 'should update the isMember attribute', function () {
				group.isMember.should.equal( true );
			} );

		} );

		describe( '.userIsCreator', function () {

			it( 'should return true if you are the group creator', function () {
				group.set( 'Creator', 9 );
				group.userIsCreator( 9 ).should.equal( true );
			} );

			it( 'should return false if you are not the group creator', function () {
				group.set( 'Creator', 10 );
				group.userIsCreator( 9 ).should.equal( false );
			} );

		} );

		describe( '.userIsAdmin', function () {

			var ajaxStub;

			before( function () {
				ajaxStub = sinon.stub( $, 'ajax' );
				ajaxStub.onFirstCall().yieldsTo('success', 'fakeSignature');
			} );

			after( function () {
				$.ajax.restore();
			} );

			it( 'should make a request to the proper url with proper args', function () {

				group.userIsAdmin( 9 );

				var call = ajaxStub.getCall( 1 );

				var callData = JSON.parse( call.args[ 0 ].data );

				callData.path.should.equal( 'GroupService' );
				callData.method.should.equal( 'userIsGroupAdmin' );
				callData.args.should.eql( {
					'licId'  : 123,
					'persId' : 9
				});

			} );

		} );

		describe( '.getMembers', function () {
			var ajaxStub;

			beforeEach( function () {
				ajaxStub = sinon.stub( $, 'ajax' );
				ajaxStub.onFirstCall().yieldsTo( 'success', 'fakeSignature' );
			} );

			afterEach( function () {
				$.ajax.restore();
			} );

			it( 'should return a deferred which is resolved with the GroupMemberCollection', function () {

				ajaxStub.onSecondCall().yieldsTo(
					'success',
					[ { 'FirstName' : 'foo' },{ 'FirstName' : 'bar' } ]
				);

				var def = group.getMembers();
				var t = typeof def.then;
				t.should.equal( 'function' );

				App.when( def ).done( function ( collection ) {
					collection.should.be.instanceof( App.Entities.GroupMemberCollection );
					collection.length.should.equal( 2 );
				} );

			} );

		} );

		describe( '.getLastUpdate', function () {
			var ajaxStub;

			before( function () {
				ajaxStub = sinon.stub( $, 'ajax' );
				ajaxStub.onFirstCall().yieldsTo('success', 'fakeSignature');
			} );

			after( function () {
				$.ajax.restore();
			} );

			it( 'should make a request to the proper url with proper args', function () {

				group.getLastUpdate();

				var call = ajaxStub.getCall( 1 );

				var callData = JSON.parse( call.args[ 0 ].data );

				callData.path.should.equal( 'GroupService' );
				callData.method.should.equal( 'getMostRecentActivityDateForGroup' );
				callData.args.should.eql( {
					'licId' : 123
				});

			} );
			it( 'should make a request to the proper url with the proper arguments', function () {
				group.getLastUpdate();
			} );

		} );

		describe( '.getResources', function () {

			var ajaxStub;

			beforeEach( function () {
				ajaxStub = sinon.stub( $, 'ajax' );
				ajaxStub.onFirstCall().yieldsTo( 'success', 'fakeSignature' );
			} );

			afterEach( function () {
				$.ajax.restore();
			} );

			it( 'should return a deferred object', function () {
				var d = group.getResources( 'blah' );
				var t = typeof d.then;
				t.should.equal( 'function' );
			} );

			it( 'should resolve the deferred with a GroupResourcesCollection instance', function () {

				// second
				ajaxStub.onSecondCall().yieldsTo(
					'success',
					[ { 'resource' : 'r1' },{ 'resource' : 'r2' } ]
				);

				var d = group.getResources();

				App.when( d ).done( function ( collection ) {
					collection.should.be.instanceof( App.Entities.GroupResourcesCollection );
					collection.length.should.equal( 2 );
				} );
			} );

			describe( '.getLeaderResources and .getMemberResources', function () {
				var spy;
				before( function () {
					spy = sinon.spy( group, 'getResources' );
				} );

				after( function () {
					group.getResources.restore();
				} );

				it( 'should proxy to getResources with the proper arguments', function () {
					group.getLeaderResources();
					spy.should.be.calledWith( 'leader' );

					group.getMemberResources();
					spy.should.be.calledWith( 'member' );
				} );
			} );
		} );

		describe( '.getLinks' , function () {
			var ajaxStub;

			beforeEach( function () {
				ajaxStub = sinon.stub( $, 'ajax' );
				ajaxStub.onFirstCall().yieldsTo( 'success', 'fakeSignature' );
			} );

			afterEach( function () {
				$.ajax.restore();
			} );

			it( 'should return a deferred object', function () {
				var d = group.getLinks( 'leader' );
				var t = typeof d.then;
				t.should.equal( 'function' );
			} );

			it( 'should resolve the deferred with a GroupLinkCollection instance', function () {

				// second
				ajaxStub.onSecondCall().yieldsTo(
					'success',
					[ { 'resource' : 'r1' },{ 'resource' : 'r2' } ]
				);

				var d = group.getLinks( 'leader' );

				App.when( d ).done( function ( collection ) {
					collection.should.be.instanceof( App.Entities.GroupLinkCollection );
					collection.length.should.equal( 2 );
				} );
			} );

			describe( '.getLeaderLinks and .getMemberLinks', function () {
				var spy;
				before( function () {
					spy = sinon.spy( group, 'getLinks' );
				} );

				after( function () {
					group.getLinks.restore();
				} );

				it( 'should proxy to getLinks with the proper arguments', function () {
					group.getLeaderLinks();
					spy.should.be.calledWith( 'leader' );

					group.getMemberLinks();
					spy.should.be.calledWith( 'member' );
				} );
			} );

		} );
	} );
} );
