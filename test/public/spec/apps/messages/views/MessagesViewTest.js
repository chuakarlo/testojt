define( function ( require ) {
	'use strict';

	var MessagesView = require( 'apps/messages/views/MessagesView' );

	describe( 'Notifications' , function () {

		var $el;
		var view;
		before( function () {
			view = new MessagesView();
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

	} );
} );
