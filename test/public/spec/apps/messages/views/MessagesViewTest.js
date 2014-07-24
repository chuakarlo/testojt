define( function ( require ) {
	'use strict';

	var App          = require( 'App' );
	var MessagesView = require( 'apps/messages/views/MessagesView' );
	var EmptyView    = require( 'apps/messages/views/EmptyMessageView' );
	var dummyData    = [
		{
			'Subject'           : '',
			'CreatorFullName'   : 'David Starks',
			'InternalMessageId' : 65835,
			'RecipientId'       : 0,
			'Creator'           : 695655,
			'AllRecipients'     : [],
			'Created'           : 'July, 14 2014 00:14:54',
			'RecipientFullName' : '',
			'Message'           : ' http:\/\/cfapi.dev.pd360.com\/#resources\/videos\/7903',
			'Viewed'            : '',
			'CreatorAvatar'     : '695655_1397231091060.jpg',
			'RecipientAvatar'   : '',
			'Trashed'           : ''
		},
		{
			'Subject'           : '',
			'CreatorFullName'   : 'Test Foo!',
			'InternalMessageId' : 65855,
			'RecipientId'       : 0,
			'Creator'           : 13778,
			'AllRecipients'     : [],
			'Created'           : 'July, 23 2014 23:11:58',
			'RecipientFullName' : '',
			'Message'           : ' http:\/\/localhost:8080\/dev.html#resources\/videos\/7901',
			'Viewed'            : '',
			'CreatorAvatar'     : 'y\/13778_1405646916591.png',
			'RecipientAvatar'   : '',
			'Trashed'           : ''
		},
		{
			'Subject'           : '',
			'CreatorFullName'   : 'Test Foo!',
			'InternalMessageId' : 65850,
			'RecipientId'       : 0,
			'Creator'           : 13778,
			'AllRecipients'     : [],
			'Created'           : 'July, 22 2014 01:24:21',
			'RecipientFullName' : '',
			'Message'           : 'hi! http:\/\/localhost:8080\/dev.html#resources\/videos\/7949',
			'Viewed'            : '',
			'CreatorAvatar'     : 'y\/13778_1405646916591.png',
			'RecipientAvatar'   : '',
			'Trashed'           : ''
		},
		{
			'Subject'           : '',
			'CreatorFullName'   : 'Test Foo!',
			'InternalMessageId' : 65854,
			'RecipientId'       : 0,
			'Creator'           : 13778,
			'AllRecipients'     : [],
			'Created'           : 'July, 23 2014 23:11:04',
			'RecipientFullName' : '',
			'Message'           : 'Try this video! its good!  http:\/\/localhost:8080\/dev.html#resources\/videos\/7902',
			'Viewed'            : '',
			'CreatorAvatar'     : 'y\/13778_1405646916591.png',
			'RecipientAvatar'   : '',
			'Trashed'           : ''
		}
	];

	describe( 'Notifications' , function () {

		var $el;
		var view;
		var collection;

		before( function () {
			collection = new App.Entities.Notifications( dummyData );
			view       = new MessagesView( { 'collection' : collection } );
			view.render();
			$el = view.$el;
		} );

		it( 'should have a Notifications heading', function () {
			$el.find( '.page-header' ).text().should.contain( 'Notifications' );
		} );

		it( 'should have sidebar as Sort By', function () {
			$el.find( '.sidebar .filter' ).text().should.contain( 'Sort By' );
		} );

		it( 'should have Date and Sender ui attribute for Sort By', function () {
			view.ui.date.hasClass( 'date' ).should.equal( true );
			view.ui.sender.hasClass( 'sender' ).should.equal( true );
		} );

		it( 'should have a Select dropdown', function () {
			$el.find( '.dropdown' ).text().should.contain( 'Select' );
		} );

		it( 'should have All, Read, Unread and None ui attribute for Filter', function () {
			view.ui.all.hasClass( 'all' ).should.equal( true );
			view.ui.read.hasClass( 'read' ).should.equal( true );
			view.ui.unread.hasClass( 'unread' ).should.equal( true );
			view.ui.none.hasClass( 'none' ).should.equal( true );
		} );

		it( 'should have a Delete button', function () {
			$el.find( '.delete-message' ).text().should.contain( 'Delete' );
		} );

		it( 'content should be displayed in accordion', function () {
			( typeof $el.find( '.accordion' ) ).should.not.equal( undefined );
		} );

		it( 'should have an emptyView', function () {
			( new view.emptyView() ).should.be.instanceOf( EmptyView );
		} );

		describe( 'Sorting', function () {

			it( 'should sort by Date descending by default', function () {
				view.collection.models[ 0 ].get( 'InternalMessageId' ).should.be.equal( dummyData[ 1 ].InternalMessageId );
				view.collection.models[ 1 ].get( 'InternalMessageId' ).should.be.equal( dummyData[ 3 ].InternalMessageId );
				view.collection.models[ 2 ].get( 'InternalMessageId' ).should.be.equal( dummyData[ 2 ].InternalMessageId );
				view.collection.models[ 3 ].get( 'InternalMessageId' ).should.be.equal( dummyData[ 0 ].InternalMessageId );
			} );

			it( 'should select Sender filter when clicked', function () {
				view.ui.sender.click();
				view.ui.sender.hasClass( 'selected' ).should.be.equal( true );
			} );

			it( 'should sort by Sender when Sender is selected', function () {
				view.collection.models[ 0 ].get( 'CreatorFullName' ).should.be.equal( dummyData[ 0 ].CreatorFullName );
				view.collection.models[ 1 ].get( 'CreatorFullName' ).should.be.equal( dummyData[ 3 ].CreatorFullName );
				view.collection.models[ 2 ].get( 'CreatorFullName' ).should.be.equal( dummyData[ 2 ].CreatorFullName );
				view.collection.models[ 3 ].get( 'CreatorFullName' ).should.be.equal( dummyData[ 1 ].CreatorFullName );
			} );

			it( 'should select Date filter when clicked', function () {
				view.ui.date.click();
				view.ui.date.hasClass( 'selected' ).should.be.equal( true );
			} );

			it( 'should sort by Date when Date is selected', function () {
				view.collection.models[ 0 ].get( 'InternalMessageId' ).should.be.equal( dummyData[ 1 ].InternalMessageId );
				view.collection.models[ 1 ].get( 'InternalMessageId' ).should.be.equal( dummyData[ 3 ].InternalMessageId );
				view.collection.models[ 2 ].get( 'InternalMessageId' ).should.be.equal( dummyData[ 2 ].InternalMessageId );
				view.collection.models[ 3 ].get( 'InternalMessageId' ).should.be.equal( dummyData[ 0 ].InternalMessageId );
			} );

		} );

	} );
} );
