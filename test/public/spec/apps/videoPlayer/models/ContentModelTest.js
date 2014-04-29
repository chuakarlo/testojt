define ( function ( require ) {
	'use strict';

	var sinon        = window.sinon;
	var App          = require( 'App' );
	var Remoting     = require( 'Remoting' );
	var ContentModel = require( 'videoPlayer/models/ContentModel' );

	describe( 'ContentModel', function () {

		var contentModel, stub;

		before( function () {
			stub = sinon.stub().returns( false );
			sinon.stub( Remoting, 'fetch' );
			App.reqres.setHandler( 'pd360:available', stub );
			contentModel = new ContentModel( {
				'ContentId' : 1
			} );
		} );

		after( function () {
			App.reqres.removeHandler( 'pd360:available' );
			Remoting.fetch.restore();
		} );

		it( 'should be an instance of ContentModel' , function () {
			contentModel.should.be.an.instanceof( ContentModel );
		} );

		describe( '.getUpdateOptions', function () {

			it( 'should return object with correct properties', function () {
				var request = contentModel.getUpdateOptions();
				request.should.have.property( 'method' );
				request.should.have.property( 'args' );
			} );

		} );

	} );

} );
