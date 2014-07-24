define( function ( require ) {
	'use strict';

	var Backbone = require( 'backbone' );
	var InnerMessageView = require( 'apps/messages/views/InnerMessageView' );

	describe( 'InnerMessageView - Test', function () {
		var view;

		before( function () {
			var model = new Backbone.Model( {
				'CreatorFullName'   : 'Diao Channy',
				'InternalMessageId' : 65803,
				'RecipientId'       : 0,
				'Creator'           : 1010340,
				'AllRecipients'     : [ ],
				'Created'           : 'July, 01 2014 19:48:06',
				'RecipientFullName' : '',
				'Message'           : 'i like httpSession houw bout you? http://localhost:8080/dev.html#resources/videos/7512',
				'Viewed'            : 'July, 01 2014 19:48:35',
				'CreatorAvatar'     : 'g/1010340_1403636416261.jpg',
				'RecipientAvatar'   : '',
				'Trashed'           : ''
			} );
			view = new InnerMessageView( { 'model' : model } );
			view.render();

		} );

		it( 'should have property template', function () {
			view.should.have.property( 'template' );
		} );

		it( 'should have property className', function () {
			view.should.have.property( 'className' );
		} );

		it( 'should have property templateHelpers', function () {
			view.should.have.property( 'templateHelpers' );
		} );

		it( 'toggle-btn element should toggle `active` class', function () {
			view.$el.find( '.title-holder a' ).click();
			view.$el.hasClass( 'active' ).should.be.equal( true );

			view.$el.find( '.title-holder a' ).click();
			view.$el.hasClass( 'active' ).should.be.equal( false );
		} );

		it( 'should contain link to video`s page for mobile and desktop', function () {
			view.getMessageLink().link.should.equal( '#resources/videos/7512' );
		} );

		it( 'should contain message to video`s page for mobile and desktop', function () {
			view.getMessageLink().message.should.equal( 'i like httpSession houw bout you? ' );
		} );

	} );

} );
