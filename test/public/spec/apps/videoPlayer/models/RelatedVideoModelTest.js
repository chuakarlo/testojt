define ( function ( require ) {
	'use strict';

	var RelatedVideoModel = require( 'videoPlayer/models/RelatedVideoModel' );


	describe( 'RelatedVideosModel', function () {
		var relatedVideo;
		var testData;

		before( function () {
			relatedVideo = new RelatedVideoModel();
			testData     = {
				'url'         : '',
				'ContentName' : '',
				'duration'    : '00:00:00'
			};
			relatedVideo.set( testData );
		} );

		describe( '#relatedVideo', function () {

			it( 'is an instance', function () {
				relatedVideo.should.be.an.instanceof( RelatedVideoModel );
			} );

			it( 'has url of type String' , function () {
				relatedVideo.attributes.should.have.property( 'url' );
				relatedVideo.get( 'url' ).should.be.a( 'string' );
			} );


			it( 'has ContentName of type String' , function () {
				relatedVideo.attributes.should.have.property( 'ContentName' );
				relatedVideo.get( 'ContentName' ).should.be.a( 'string' );
			} );

			it( 'has duration with hh:mm:ss format' , function () {
				relatedVideo.attributes.should.have.property( 'duration' );
				relatedVideo.get( 'duration' ).should.be.a( 'string' );
				relatedVideo.get( 'duration' ).should.match( /^(20|21|22|23|[01]\d|\d)((:[0-5]\d){1,2})$/ ) ;
			} );

		} );

		describe( '.set', function () {
			it( 'stores test data to model', function () {
				relatedVideo.get( 'url' ).should.equal( testData.url );
				relatedVideo.get( 'ContentName' ).should.equal( testData.ContentName );
				relatedVideo.get( 'duration' ).should.equal( testData.duration );
			} );

		} );

	} );

} );
