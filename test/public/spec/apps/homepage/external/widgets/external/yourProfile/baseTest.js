define ( function( require ) {
	'use strict';

	var sinon           = window.sinon;
	var Remoting        = require( 'Remoting' );
	var App             = require( 'App' );
	var BaseObject      = require( 'apps/homepage/BaseObject');
	var base            = require( 'apps/homepage/external/widgets/external/yourProfile/base' );
	var itemView        = require( 'apps/homepage/external/widgets/external/yourProfile/views/WidgetItemView' );
	var CollectionItems = require( 'apps/homepage/external/widgets/external/yourProfile/collections/WidgetCollection' );


	describe( '[Widgets] User Settings : base - Test ', function () {
		var collection;

		before( function() {
			collection = new CollectionItems();
		} );
		it( 'should be an instance of BaseObject', function () {
			base.should.be.an.instanceof( BaseObject );
		} );

		it( 'should an item view of user settings WidgetItemView', function () {
			base.getExternalView.should.be.equal( itemView );
		} );

		it( 'should have property WidgetName', function () {
			base.should.have.property( 'WidgetName' );
		} );

		it( 'should have property header', function () {
			base._header().should.equal( 'User Settings' );
			base.header().should.equal( 'User Settings' );
		} );

		it( 'should have property footer', function () {
			base._footer().should.equal( 'Edit Settings' );
			base.footer().should.equal( 'Edit Settings' );
		} );

		it( 'should have property Description', function () {
			base.Description().should.not.be.empty;
		} );

		it( 'should have property imgSrc', function () {
			base.imgSrc().should.not.be.empty;
		} );

		it( 'should have property icon', function () {
			base.should.have.property( 'icon' );
		} );

		it( 'should have property em', function () {
			base.should.have.property( 'em' );
		} );

		it( 'should have property getExternalView', function () {
			base.should.have.property( 'getExternalView' );
		} );

		it( 'should have property getCollection', function () {
			base.should.have.property( '_items' );
			var options  = {};
			var callback = sinon.spy();

			var fetchOptions = {
				'success' : sinon.spy()
			};
			var sampleModel = [ {
				'id' : 1
			} ];

			var fetchStub = sinon.stub( Remoting, 'fetch' ).returns( sampleModel );

			App.when( collection.fetch( fetchOptions ) ).done( function() {
				fetchStub.callCount.should.be.equal( 1 );
				fetchOptions.success.callCount.should.be.equal( 1 );
				Remoting.fetch( 'request' ).should.be.equal( sampleModel );
			} );

			base._items( callback, options );

			Remoting.fetch.restore();
		} );

		it( 'should have property getTemplate', function () {
			base.should.have.property( 'getTemplate' );
		} );

		it( 'should have property _id', function () {
			base.should.have.property( '_id' );
		} );

		it( 'should have property EmptyMessage', function () {
			base.EmptyMessage().should.be.empty;
		} );

		it( 'should have property EmptyType', function() {
			base.should.have.property( 'EmptyType' );
			base.EmptyType().should.be.equal( 'fa-user' );
		} );

		it( 'should have property _mainUrl', function () {
			base.should.have.property( '_mainUrl' );
		} );

	} );
} );
