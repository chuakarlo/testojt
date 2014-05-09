define( function ( require ) {
	'use strict';

	var Marionette = require( 'marionette' );
	var Remoting   = require( 'Remoting' );
	var sinon      = window.sinon;
	var App        = require( 'App' );

	require( 'groups/Groups' );

	describe ('Groups Module', function () {

		before( function () {
			var stub = sinon.stub().returns(false);
			App.reqres.setHandler( 'pd360:available', stub );
		} );

		after( function () {
			App.module( 'Groups' ).stop();
		} );

		it( 'should create module Groups', function () {
			App.should.have.property( 'Groups' );
			App.Groups.should.be.an.instanceof( Marionette.Module );
			App.Groups.should.have.property( 'Router' );
		} );

		describe( 'Show controller', function () {

			after( function () {
				Remoting.fetch.restore();
				App.content.show.restore();
				App.Groups.Views.Layout.restore();
			} );

			it( 'should create submodule `Show`', function () {

				App.Groups.should.have.property( 'Show' );
				App.Groups.Show.should.have.property( 'Controller' );
				App.Groups.Show.Controller.should.have.property( 'showGroup' );

			} );

			it( '`showGroup` should make call for group data and display layout', function () {
				// set up fake data to return
				var fakeGroup = {
					'Avatar'      : '',
					'LicenseName' : '',
					'Misc'        : ''
				};

				var fakeUser = { 'Avatar' : '' };
				var fakeData = [ fakeGroup, [ fakeUser ], [ fakeUser ], [ fakeGroup ] ];

				var showStub     = sinon.stub( App.content, 'show' );
				var remotingStub = sinon.stub( Remoting, 'fetch' ).returns( fakeData );

				var showSpy = sinon.spy();
				var layout  = sinon.stub( App.Groups.Views, 'Layout' ).returns( {
					'bannerRegion'           : { 'show' : showSpy },
					'headerRegion'           : { 'show' : showSpy },
					'groupInfoRegion'        : { 'show' : showSpy },
					'subNavRegion'           : { 'show' : showSpy },
					'commentCreateRegion'    : { 'show' : showSpy },
					'commentsRegion'         : { 'show' : showSpy },
					'membersRegion'          : { 'show' : showSpy },
					'resourcesRegion'        : { 'show' : showSpy },
					'resourcesMembersRegion' : { 'show' : showSpy }
				} );

				// call controllers method
				App.Groups.Show.Controller.showGroup();

				// data should have been fetched
				remotingStub.should.have.callCount( 1 );

				// should have created a new layout
				layout.should.have.been.calledWithNew;

				// App should have shown layout
				showStub.should.have.callCount( 2 );

				// regions should have called show
				showSpy.should.have.callCount( 7 );
			} );

		} );

		describe( 'Edit controller', function () {

			var remotingStub;
			var navigate;

			beforeEach( function () {
				remotingStub = sinon.stub( Remoting, 'fetch' ).returns( [] );
				navigate     = sinon.stub( App, 'navigate' );
			} );

			afterEach( function () {
				Remoting.fetch.restore();
				App.navigate.restore();

				remotingStub = null;
				navigate     = null;
			} );

			it( 'should create submodule `Edit`', function () {

				App.Groups.should.have.property( 'Edit' );
				App.Groups.Edit.should.have.property( 'Controller' );
				App.Groups.Edit.Controller.should.have.property( 'leaveGroup' );
				App.Groups.Edit.Controller.should.have.property( 'joinGroup' );
				App.Groups.Edit.Controller.should.have.property( 'ignoreGroup' );
				App.Groups.Edit.Controller.should.have.property( 'acceptGroup' );

			} );

			it( '`leaveGroup` should call remoting and navigate to groups', function () {
				var expectedLicenseId = 1;
				var expectedCreatorId = 1234;

				var fakeModel = {
					'attributes' : {
						'LicenseId' : expectedLicenseId,
						'Creator'   : expectedCreatorId
					}
				};

				// call the method
				App.Groups.Edit.Controller.leaveGroup( fakeModel );

				// remoting should have been called
				remotingStub.should.have.callCount( 1 );

				// verify properties sent to Remoting
				remotingStub.should.have.been.calledWith( sinon.match( function ( request ) {
					request.should.be.an.instanceof( Array );
					request.should.have.length( 1 );

					var _request = request[ 0 ];
					_request.should.have.property( 'path' );
					_request.path.should.equal( 'com.schoolimprovement.pd360.dao.AdminService' );

					_request.should.have.property( 'method' );
					_request.method.should.equal( 'returnASeatToLicense' );

					_request.should.have.property( 'args' );
					_request.args.should.have.property( 'persId' );

					_request.args.should.have.property( 'licId' );
					_request.args.licId.should.equal( expectedLicenseId );

					_request.args.should.have.property( 'removerId' );
					_request.args.removerId.should.equal( expectedCreatorId );

					return true;
				} ) );

				// app navigate should have been called
				navigate.should.have.callCount( 1 );
				navigate.should.have.been.calledWithExactly( 'groups', { 'trigger' : true } );
			} );

			it( '`joinGroup` should call remoting and navigate to groups', function () {
				var expectedLicenseId = 1;
				var expectedCreatorId = 1234;

				var fakeModel = {
					'attributes' : {
						'LicenseId' : expectedLicenseId,
						'Creator'   : expectedCreatorId
					}
				};

				// call the method
				App.Groups.Edit.Controller.joinGroup( fakeModel );

				// remoting should have been called
				remotingStub.should.have.callCount( 1 );

				// verify properties sent to remoting
				remotingStub.should.have.been.calledWith( sinon.match( function ( request ) {
					request.should.be.an.instanceof( Array );
					request.should.have.length( 1 );

					var req = request[ 0 ];

					req.should.have.property( 'path' );
					req.path.should.equal( 'com.schoolimprovement.pd360.dao.AdminService' );

					req.should.have.property( 'method' );
					req.method.should.equal( 'takeASeatFromLicense' );

					req.should.have.property( 'args' );
					req.args.should.have.property( 'persId' );

					req.args.should.have.property( 'licId' );
					req.args.licId.should.equal( expectedLicenseId );

					req.args.should.have.property( 'creatorId' );
					req.args.creatorId.should.equal( expectedCreatorId );

					return true;
				} ) );

				// app navigate should have been called
				navigate.should.have.callCount( 1 );
				navigate.should.have.been.calledWithExactly( 'groups', { 'trigger' : true } );
			} );

			it( '`ignoreGroup` should call remoting', function () {
				var expectedLicenseId = 1;
				var expectedCreatorId = 1234;
				var expectedInviteeEmail = 'global_zeal@sinet.com';

				var fakeModel = {
					'attributes' : {
						'LicenseId'   : expectedLicenseId,
						'Creator'   : expectedCreatorId,
						'InviteeEmail': expectedInviteeEmail
					}
				};

				// call the method
				App.Groups.Edit.Controller.ignoreGroup( fakeModel );

				// remoting should have been called
				remotingStub.should.have.callCount( 1 );

				// verify properties sent to remoting
				remotingStub.should.have.been.calledWith( sinon.match( function ( request ) {
					request.should.be.an.instanceof( Array );
					request.should.have.length( 1 );

					var req = request[ 0 ];

					req.should.have.property( 'path' );
					req.path.should.equal( 'com.schoolimprovement.pd360.dao.GroupService' );

					req.should.have.property( 'method' );
					req.method.should.equal( 'deleteInviteByLicenseIdCreatorIdAndInviteeEmail' );

					req.should.have.property( 'args' );

					req.args.should.have.property( 'LicenseId' );
					req.args.LicenseId.should.equal( expectedLicenseId );

					req.args.should.have.property( 'CreatorId' );
					req.args.CreatorId.should.equal( expectedCreatorId );

					req.args.should.have.property( 'InviteeEmail' );
					req.args.InviteeEmail.should.equal( expectedInviteeEmail );

					return true;
				} ) );
			} );

			it( '`acceptGroup` should call remoting', function () {
				var expectedLicenseId = 1;
				var expectedSingleUseKey = 1234;

				var fakeModel = {
					'attributes' : {
						'LicenseId'   : expectedLicenseId,
						'SingleUseKey'   : expectedSingleUseKey
					}
				};

				// call the method
				App.Groups.Edit.Controller.acceptGroup( fakeModel );

				// remoting should have been called
				remotingStub.should.have.callCount( 1 );

				// verify properties sent to remoting
				remotingStub.should.have.been.calledWith( sinon.match( function ( request ) {
					request.should.be.an.instanceof( Array );
					request.should.have.length( 2 );

					var firstReq = request[ 0 ];
					var secondReq = request[ 1 ];
					//	checkLicenseRequest
					firstReq.should.have.property( 'path' );
					firstReq.path.should.equal( 'com.schoolimprovement.pd360.dao.AdminService' );

					firstReq.should.have.property( 'method' );
					firstReq.method.should.equal( 'checkLicenseByLicenseKey' );

					firstReq.should.have.property( 'args' );

					firstReq.args.should.have.property( 'key' );
					firstReq.args.key.should.equal( expectedSingleUseKey );
					// getLicenseKeySingleUseObjectRequest
					secondReq.should.have.property( 'path' );
					secondReq.path.should.equal( 'com.schoolimprovement.pd360.dao.core.LicenseKeySingleUseGateway' );

					secondReq.should.have.property( 'method' );
					secondReq.method.should.equal( 'getByKey' );

					secondReq.should.have.property( 'args' );

					secondReq.args.should.have.property( 'Key' );
					secondReq.args.Key.should.equal( expectedSingleUseKey );

					return true;
				} ) );
			} );

		} );

		describe( 'List controller', function () {

			var remotingStub;
			var appStub;

			beforeEach( function () {
				remotingStub = sinon.stub( Remoting, 'fetch' ).returns( [ [] ] );
				appStub      = sinon.stub( App.content, 'show' );
			} );

			afterEach( function () {
				Remoting.fetch.restore();
				App.content.show.restore();

				remotingStub = null;
				appStub      = null;
			} );

			it( 'should create submodule `List`', function () {

				App.Groups.should.have.property( 'List' );
				App.Groups.List.should.have.property( 'Controller' );
				App.Groups.List.Controller.should.have.property( 'listGroups' );

			} );

			it( '`listGroups` should call Remoting and show groups view', function () {
				// call method
				App.Groups.List.Controller.listGroups();

				// remoting should have been called
				remotingStub.should.have.callCount( 2 );

				// verify properties sent to remoting
				remotingStub.should.have.been.calledWith( sinon.match( function ( request ) {
					request.should.be.an.instanceof( Array );
					request.should.have.length( 2 );

					var firstReq = request[ 0 ];
					var secondReq = request[ 1 ];

					firstReq.should.have.property( 'path' );
					firstReq.path.should.equal( 'com.schoolimprovement.pd360.dao.GroupService' );

					firstReq.should.have.property( 'method' );
					firstReq.method.should.equal( 'getValidGroupsByPersonnelIdOrderedByRecentActivity' );

					firstReq.should.have.property( 'args' );
					firstReq.args.should.have.property( 'persId' );

					secondReq.should.have.property( 'path' );
					secondReq.path.should.equal( 'com.schoolimprovement.pd360.dao.core.ClientPersonnelGateway' );

					secondReq.should.have.property( 'method' );
					secondReq.method.should.equal( 'getById' );

					secondReq.should.have.property( 'args' );
					secondReq.args.should.have.property( 'id' );

					return true;
				} ) );

				// app.content.show should have been called
				appStub.should.have.callCount( 2 );

				// should have been called with a list view
				appStub.secondCall.should.have.been.calledWith( sinon.match( function ( view ) {
					view.should.be.an.instanceof( App.Groups.Views.GroupListLayout );
					return true;
				} ) );
			} );

		} );

	} );

} );
