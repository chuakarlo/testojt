define( function ( require ) {
	'use strict';

	var VideoResourceModel = require( 'videoPlayer/models/VideoResourceModel' );

	describe( 'VideoResourceModel', function () {
		var videoResource;
		var testData;

		before( function () {

			videoResource = new VideoResourceModel();

			testData = {
				'type'     : 'guidebook',
				'title'    : 'Relationships and Support',
				'duration' : '2 min'
			};

		} );

		it( 'should be an instance of VideoResourceModel', function () {
			videoResource.should.be.an.instanceof( VideoResourceModel );
		} );

		it( 'should initialize with a given data', function () {

			testData = {
				'type'     : 'audio',
				'title'    : 'Support and Relations',
				'duration' : '5 min'
			};

			var newVideoResource = new VideoResourceModel( testData );

			newVideoResource.get( 'type' ).should.equal( testData.type );
			newVideoResource.get( 'title' ).should.equal( testData.title );
			newVideoResource.get( 'duration' ).should.equal( testData.duration );

		} );

		describe( '.save', function () {
			// code
			it( 'should save data when called', function () {

				videoResource.set( testData );

				videoResource.get( 'type' ).should.equal( testData.type );
				videoResource.get( 'title' ).should.equal( testData.title );
				videoResource.get( 'duration' ).should.equal( testData.duration );

			} );

		} );

	} );

} );
