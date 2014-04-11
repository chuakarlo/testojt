define ( function ( require ) {
	'use strict';

	var $     = require( 'jquery' );
	var sinon = window.sinon;
	var App   = require( 'App' );

	var ContentModel = require( 'videoPlayer/models/ContentModel' );

	describe( 'ContentModel', function () {

		var contentModel, stub;

		before( function () {
			stub = sinon.stub().returns( false );
			App.reqres.setHandler( 'pd360:available', stub );
			contentModel = new ContentModel();
		} );

		after( function () {
			App.reqres.removeHandler( 'pd360:available' );
		} );

		it( 'should be an instance of ContentModel' , function () {
			contentModel.should.be.an.instanceof( ContentModel );
		} );

		describe( 'ContentModel `fetch` method', function () {

			after( function () {
				$.ajax.restore();
			} );

			it( 'should do an ajax request when called', function () {
				var spy     = sinon.stub( $, 'ajax' );
				var request = {
					'method' : 'getAbbrevWithImageURL',
					'args'   : {
						'contentId' : 7652
					}
				};

				spy.should.have.callCount( 0 );
				contentModel.fetch( request );
				spy.should.have.been.called;
			} );

		} );

	} );

} );
