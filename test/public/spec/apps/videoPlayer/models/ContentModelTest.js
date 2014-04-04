define ( function ( require ) {
	'use strict';

	var $     = require( 'jquery' );
	var sinon = window.sinon;

	var ContentModel = require( 'videoPlayer/models/ContentModel' );

	describe( 'ContentModel', function () {
		var contentModel;

		before( function () {
			contentModel = new ContentModel();
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
