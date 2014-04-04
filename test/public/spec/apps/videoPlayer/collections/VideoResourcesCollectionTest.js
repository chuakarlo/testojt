define( function ( require ) {
	'use strict';

	var $         = require( 'jquery' );
	var sinon     = window.sinon;
	var Remoting  = require( 'Remoting' );

	var VideoResourcesCollection = require( 'videoPlayer/collections/VideoResourcesCollection' );

	describe( 'VideoResourcesCollection', function () {
		var collection;

		before( function () {
			collection = new VideoResourcesCollection();
		} );

		describe( 'when fetching', function () {

			before( function () {
				sinon.stub( Remoting, 'fetch' ).returns( $.Deferred() );
			} );

			after( function () {
				Remoting.fetch.restore();
			} );

			it( 'should call Remoting.fetch once', function () {
				Remoting.fetch.should.have.callCount( 0 );

				var request = {
					'args' : {}
				};

				collection.fetch( request );
				Remoting.fetch.should.have.callCount( 1 );
			} );

		} );

		describe( '.resetCollection', function () {

			it( 'should update collection on reset', function () {
				var testData = [ {
					'GuidebookFileName' : 'Sample.pdf',
					'AudioFileName'     : 'Sample.mp3',
					'TransciptFileName' : 'Sample2.pdf'
				} ];

				collection.resetCollection( testData );
				collection.length.should.be.equal( 3 ); // magic number 3 :)
			} );

		} );

		describe( '.buildModels', function () {
			it( 'should build the model properly' );
		} );

	} );
} );
